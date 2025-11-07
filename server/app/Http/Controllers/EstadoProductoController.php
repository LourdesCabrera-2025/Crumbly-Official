<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EstadoProducto;

class EstadoProductoController extends Controller
{
    public function index()
    {
        $estados = EstadoProducto::all();
        return response()->json($estados, 200);
    }

    public function show($id)
    {
        $estado = EstadoProducto::find($id);
        if (!$estado) {
            return response()->json(['message' => 'Estado de producto no encontrado'], 404);
        }
        return response()->json($estado, 200);
    }

    public function store(Request $request)
    {
        $estado = EstadoProducto::create($request->all());
        return response()->json($estado, 201);
    }

    public function update(Request $request, $id)
    {
        $estado = EstadoProducto::find($id);
        if (!$estado) {
            return response()->json(['message' => 'Estado de producto no encontrado'], 404);
        }
        $estado->update($request->all());
        return response()->json($estado, 200);
    }

    public function destroy($id)
    {
        $estado = EstadoProducto::find($id);
        if (!$estado) {
            return response()->json(['message' => 'Estado de producto no encontrado'], 404);
        }
        $estado->delete();
        return response()->json(['message' => 'Estado de producto eliminado correctamente'], 200);
    }
}
