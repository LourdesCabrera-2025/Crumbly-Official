<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EstadoProducto;
use Illuminate\Http\Request;

class EstadoProductoController extends Controller
{
    public function index()
    {
        return response()->json(
            EstadoProducto::all()
        );
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_estado' => 'required|string|max:50'
        ]);

        $estado = EstadoProducto::create($validated);
        return response()->json($estado, 201);
    }


    public function show($id_estado)
    {
        $estado = EstadoProducto::findOrFail($id_estado);
        return response()->json($estado);
    }


    public function update(Request $request, $id_estado)
    {
        $estado = EstadoProducto::findOrFail($id_estado);
        $validated = $request->validate([
            'nombre_estado' => 'sometimes|string|max:50'
        ]);
        $estado->update($validated);
        return response()->json($estado);
    }

    public function searchByName($nombre_estado) 
    {
        $estado = EstadoProducto::where('nombre_estado', 'LIKE' , "%$nombre_estado%")
        ->get();

        return response()->json($estado);
    }


    public function destroy($id_estado)
    {
        $estado = EstadoProducto::findOrFail($id_estado);
        $estado->delete();

        return response()->json(['message' => 'Estado desactivado correctamente']);
    }
}
