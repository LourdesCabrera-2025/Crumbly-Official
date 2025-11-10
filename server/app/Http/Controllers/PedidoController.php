<?php
namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    //Lista todos los pedidos
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $query = Pedido::with(['cliente', 'estadoPedido', 'detallesPedido.producto'])
            ->orderByDesc('fecha_pedido');

        // Filtros
        if ($request->has('id_cliente')) {
            $query->where('id_cliente', $request->id_cliente); //Por cliente
        }

        if ($request->has('id_estado_pedido')) {
            $query->where('id_estado_pedido', $request->id_estado_pedido); //Por estado
        }

        $pedidos = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $pedidos->items(),
            'pagination' => [
                'current_page' => $pedidos->currentPage(),
                'last_page' => $pedidos->lastPage(),
                'per_page' => $pedidos->perPage(),
                'total' => $pedidos->total(),
            ]
        ], Response::HTTP_OK);
    }

    //Crear un nuevo pedido con sus detalles

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_cliente' => 'required|integer|exists:Cliente,id_cliente',
            'total' => 'required|numeric|min:0',
            'id_estado_pedido' => 'required|integer|exists:Estado_Pedido,id_estado_pedido',
            'detalles' => 'required|array|min:1',
            'detalles.*.id_producto' => 'required|integer|exists:Producto,id_producto',
            'detalles.*.cantidad' => 'required|integer|min:1',
            'detalles.*.subtotal' => 'required|numeric|min:0'
        ]);

        DB::beginTransaction();
        try {
            $pedido = Pedido::create([
                'id_cliente' => $validated['id_cliente'],
                'total' => $validated['total'],
                'id_estado_pedido' => $validated['id_estado_pedido'],
                'fecha_pedido' => now()
            ]);

            $pedido->detallesPedido()->createMany($validated['detalles']);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pedido creado exitosamente',
                'data' => $pedido->load(['cliente', 'estadoPedido', 'detallesPedido.producto'])
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error al crear el pedido',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    //Mostrar un pedido por ID
    public function show(string $id)
    {
        try {
            $pedido = Pedido::with([
                'cliente',
                'estadoPedido',
                'detallesPedido.producto',
                'pagos.metodoPago',
                'entrega.direccion'
            ])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $pedido
            ], Response::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado'
            ], Response::HTTP_NOT_FOUND);
        }
    }

    //Actualizar un pedido existente
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'id_estado_pedido' => 'sometimes|integer|exists:Estado_Pedido,id_estado_pedido',
            'total' => 'sometimes|numeric|min:0'
        ]);

        try {
            $pedido = Pedido::findOrFail($id);
            $pedido->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Pedido actualizado exitosamente',
                'data' => $pedido->load(['cliente', 'estadoPedido'])
            ], Response::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado'
            ], Response::HTTP_NOT_FOUND);
        }
    }

    //Eliminar un pedido y sus dependencias
    public function destroy(string $id)
    {
        try {
            $pedido = Pedido::with(['detallesPedido', 'pagos', 'entrega'])->findOrFail($id);

            // Eliminar dependencias antes de borrar el pedido
            $pedido->detallesPedido()->delete();
            $pedido->pagos()->delete();
            $pedido->entrega()?->delete();

            $pedido->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pedido eliminado exitosamente'
            ], Response::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado'
            ], Response::HTTP_NOT_FOUND);
        }
    }

    //Obtener pedidos de un cliente
    public function getByCliente(Request $request, string $idCliente)
{
    $perPage = $request->input('per_page', 10);

    try {
        // Verificar si el cliente existe
        $clienteExiste = \App\Models\Cliente::where('id_cliente', $idCliente)->exists();

        if (!$clienteExiste) {
            return response()->json([
                'success' => false,
                'message' => 'Cliente no encontrado'
            ], Response::HTTP_NOT_FOUND);
        }

        // Obtener los pedidos del cliente
        $pedidos = Pedido::with(['estadoPedido', 'detallesPedido.producto'])
            ->where('id_cliente', $idCliente)
            ->orderByDesc('fecha_pedido')
            ->paginate($perPage);

        // Si el cliente existe pero no tiene pedidos
        if ($pedidos->isEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'El cliente no tiene pedidos registrados',
                'data' => [],
                'pagination' => [
                    'current_page' => 1,
                    'last_page' => 1,
                    'per_page' => $perPage,
                    'total' => 0,
                ]
            ], Response::HTTP_OK);
        }

        // Si tiene pedidos
        return response()->json([
            'success' => true,
            'data' => $pedidos->items(),
            'pagination' => [
                'current_page' => $pedidos->currentPage(),
                'last_page' => $pedidos->lastPage(),
                'per_page' => $pedidos->perPage(),
                'total' => $pedidos->total(),
            ]
        ], Response::HTTP_OK);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error al obtener los pedidos del cliente',
            'error' => $e->getMessage()
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

}
