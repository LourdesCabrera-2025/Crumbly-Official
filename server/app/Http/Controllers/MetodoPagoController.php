<?php

namespace App\Http\Controllers;

use App\Models\MetodoPago;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MetodoPagoController extends Controller
{
    public function index()
    {
        try {
            // Obtiene todos los metodos de pago
            $metodos = MetodoPago::all();

            // Devuelve la lista en formato JSON
            return response()->json([
                'success' => true,
                'data' => $metodos
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            // Captura cualquier error inesperado
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener los métodos de pago',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    // Muestra un metodo de pago específico por su ID.
    public function show(string $id)
    {
        try {
            // Busca el metodo de pago por su ID
            $metodo = MetodoPago::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $metodo
            ], Response::HTTP_OK);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Si el ID no existe
            return response()->json([
                'success' => false,
                'message' => 'Método de pago no encontrado'
            ], Response::HTTP_NOT_FOUND);

        } catch (\Exception $e) {
            // Si ocurre otro tipo de error
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el método de pago',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
