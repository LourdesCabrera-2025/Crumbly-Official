<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DetallePedido;
use App\Models\Producto;

class DetallePedidoController extends Controller
{
    public function index()
    {
        $detalles = DetallePedido::all();
        return response()->json($detalles, 200);
    }

    public function show($id)
    {
        $detalle = DetallePedido::find($id);
        if (!$detalle) {
            return response()->json(['message' => 'Detalle de pedido no encontrado'], 404);
        }
        return response()->json($detalle, 200);
    }

    /**
     * El subtotal se calcula automáticamente en el backend usando el precio real del producto
     */
    public function store(Request $request)
    {
        $producto = Producto::find($request->id_producto);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $subtotal = $producto->precio * $request->cantidad;

        $detalle = DetallePedido::create([
            'id_pedido' => $request->id_pedido,
            'id_producto' => $request->id_producto,
            'cantidad' => $request->cantidad,
            'subtotal' => $subtotal
        ]);

        return response()->json($detalle, 201);
    }

    /**
     * Al actualizar, el subtotal se recalcula automáticamente si cambió la cantidad o el producto
     */
    public function update(Request $request, $id)
    {
        $detalle = DetallePedido::find($id);
        if (!$detalle) {
            return response()->json(['message' => 'Detalle de pedido no encontrado'], 404);
        }

        $id_producto = $request->id_producto ?? $detalle->id_producto;
        $cantidad = $request->cantidad ?? $detalle->cantidad;

        $producto = Producto::find($id_producto);
        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $subtotal = $producto->precio * $cantidad;

        $detalle->update([
            'id_pedido' => $request->id_pedido ?? $detalle->id_pedido,
            'id_producto' => $id_producto,
            'cantidad' => $cantidad,
            'subtotal' => $subtotal
        ]);

        return response()->json($detalle, 200);
    }

    public function destroy($id)
    {
        $detalle = DetallePedido::find($id);
        if (!$detalle) {
            return response()->json(['message' => 'Detalle de pedido no encontrado'], 404);
        }
        $detalle->delete();
        return response()->json(['message' => 'Detalle de pedido eliminado correctamente'], 200);
    }
}
