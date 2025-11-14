<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Valoracion;
use App\Models\Cliente;
use App\Models\Producto;

class ValoracionController extends Controller
{
    public function index()
    {
        $valoraciones = Valoracion::all();
        if($valoraciones->isEmpty()) {
            return response()->json([
                'success' => false, 
                'message' => 'No hay valoraciones registradas'], 404);
        }
        return response()->json([
            'success' => true, 
            'data' => $valoraciones], 200);
    }

    public function show($id)
    {
        $valoracion = Valoraciones::find($id);
        if(!$valoracion) {
            return response()->json([
                'success' => false, 
                'message' => 'Valoración no encontrada'], 404);
        }
        return response()->json([
            'success' => true, 
            'data' => $valoracion], 200);
    }

    public function store(Request $request)
    {
        $cliente = Cliente::find($request->id_cliente);
        //No ingresar si el cliente no existe
        if(!$cliente) {
            return response()->json([
                'success' => false, 'message' => 'Cliente no encontrado'], 404);
        }
        $producto = Producto::find($request->id_producto);
        //No ingresar si el producto no existe
        if(!$producto) {
            return response()->json([
                'success' => false, 'message' => 'Producto no encontrado'], 404);
        }

        $valoracion = Valoracion::create([
            'id_cliente' => $request->id_cliente, 
            'id_producto' => $request->id_producto, 
            'puntuacion' => $request->puntuacion, 
            'comentario' => $request->comentario, 
            'fecha' => $request->fecha
        ]);
        return response()->json([
            'success' => true, 
            'message' => 'Valoración ingresada exitosamente', 
            'data' => $valoracion], 201);
    }

    public function update(Request $request)
    {
        $cliente = Cliente::find($request->id_cliente);
        //No actualizar si el cliente no existe
        if(!$cliente) {
            return response()->json([
                'success' => false, 'message' => 'Cliente no encontrado'], 404);
        }
        $producto = Producto::find($request->id_producto);
        //No actualizar si el producto no existe
        if(!$producto) {
            return response()->json([
                'success' => false, 'message' => 'Producto no encontrado'], 404);
        }

        $valoracion = Valoracion::update([
            'id_cliente' => $request->id_cliente, 
            'id_producto' => $request->id_producto, 
            'puntuacion' => $request->puntuacion, 
            'comentario' => $request->comentario, 
            'fecha' => $request->fecha
        ]);
        return response()->json([
            'success' => true, 
            'message' => 'Valoración actualizada exitosamente', 
            'data' => $valoracion], 200);
    }

    public function destroy($id)
    {
        $valoracion = Valoracion::find($id);
        if(!$valoracion) {
            return response()->json([
                'success' => false, 
                'message' => 'Valoración no encontrada'], 404);
        }
        $valoracion->delete();
        return response()->json([
            'success' => true, 
            'message' => 'Valoración eliminada exitosamente'], 200);
    }
}