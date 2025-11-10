<?php
namespace App\Http\Controllers;

use App\Models\PagoPedido;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class PagoPedidoController extends Controller
{
    // Mostrar todos los pagos registrados con paginacion
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 10);

            $pagos = PagoPedido::with(['pedido', 'metodoPago'])
                ->orderByDesc('created_at')
                ->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $pagos->items(),
                'pagination' => [
                    'current_page' => $pagos->currentPage(),
                    'last_page' => $pagos->lastPage(),
                    'per_page' => $pagos->perPage(),
                    'total' => $pagos->total(),
                ]
            ], Response::HTTP_OK);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los pagos',
                'error' => config('app.debug') ? $e->getMessage() : 'Error interno del servidor'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Registrar pago
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'pedido_id' => 'required|exists:pedidos,id',
                'metodo_pago_id' => 'required|exists:metodo_pagos,id',
                'monto' => 'required|numeric|min:0.01',
                'referencia' => 'nullable|string|max:255',
            ]);

            // verifica que el pedido existe y esta activo
            $pedido = Pedido::findOrFail($validated['pedido_id']);
            
            // Validar que el monto no exceda el total
            $totalPagado = PagoPedido::where('pedido_id', $validated['pedido_id'])
                ->where('anulado', false)
                ->sum('monto');
                
            $totalPendiente = $pedido->total - $totalPagado;
            
            if ($validated['monto'] > $totalPendiente) {
                return response()->json([
                    'success' => false,
                    'message' => 'El monto excede el total pendiente del pedido',
                    'total_pendiente' => $totalPendiente
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $pago = PagoPedido::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Pago registrado correctamente',
                'data' => $pago->load(['pedido', 'metodoPago'])
            ], Response::HTTP_CREATED);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
            
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado'
            ], Response::HTTP_NOT_FOUND);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al registrar el pago',
                'error' => config('app.debug') ? $e->getMessage() : 'Error interno del servidor'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Mostrar un pago por id
    public function show(int $id)
    {
        try {
            $pago = PagoPedido::with(['pedido', 'metodoPago'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $pago
            ], Response::HTTP_OK);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pago no encontrado'
            ], Response::HTTP_NOT_FOUND);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el pago',
                'error' => config('app.debug') ? $e->getMessage() : 'Error interno del servidor'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Obtener los pagos de un pedido
    public function getByPedido(int $pedidoId)
    {
        try {
            // Verificar que el pedido existe primero
            Pedido::findOrFail($pedidoId);

            $pagos = PagoPedido::where('pedido_id', $pedidoId)
                ->with('metodoPago')
                ->orderByDesc('created_at')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $pagos
            ], Response::HTTP_OK);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado'
            ], Response::HTTP_NOT_FOUND);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los pagos del pedido',
                'error' => config('app.debug') ? $e->getMessage() : 'Error interno del servidor'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Anular un pago (No lo elimina de la DB)
    public function anular(int $id)
    {
        try {
            $pago = PagoPedido::findOrFail($id);

            if ($pago->anulado) {
                return response()->json([
                    'success' => false,
                    'message' => 'El pago ya está anulado'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Validar que el pago no sea muy antiguo 
            $diasDesdePago = $pago->created_at->diffInDays(now());
            $dias = 30; //Número de dias permitido
            if ($diasDesdePago > $dias) { 
                return response()->json([
                    'success' => false,
                    'message' => "No se puede anular un pago con más de  días de antigüedad"
                ], Response::HTTP_BAD_REQUEST);
            }

            $pago->update([
                'anulado' => true,
                'fecha_anulacion' => now() // Agregar este campo si no existe
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pago anulado exitosamente',
                'data' => $pago->fresh(['pedido', 'metodoPago'])
            ], Response::HTTP_OK);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Pago no encontrado'
            ], Response::HTTP_NOT_FOUND);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al anular el pago',
                'error' => config('app.debug') ? $e->getMessage() : 'Error interno del servidor'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}