<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{

    public function index()
    {
        return response()->json(
            Categoria::all()
        );
    }


    public function store(Request $request)
    {
        $validated =$request->validate([
            'nombre_categoria' => 'required|string|max:100',
            'descripcion' => 'required|string|max:255'
        ]);

        $categoria = Categoria::create($validated);
        return response()->json($categoria, 201);
    }

    public function show($id_categoria)
    {
        $categoria = Categoria::findOrFail($id_categoria);
        return response()->json($categoria);
    }

    public function update(Request $request,  $id_categoria)
    {
        $categoria = Categoria::findOrFail($id_categoria);
        $validated = $request->validate([
            'nombre_categoria' => 'sometimes|string|max:100',
            'descripcion' => 'sometimes|string|max:255'
        ]);
        $categoria->update($validated);
        return response()->json($categoria);
    }


    public function searchByName($nombre_categoria) 
    {
        $categoria = Categoria::where('nombre_categoria', 'LIKE', "%$nombre_categoria%")
        ->get();
        return response()->json($categoria);
    }


    public function destroy($id_categoria)
    {
        $categoria = Categoria::findOrFail($id_categoria);
        $categoria->delete();

        return response()->json(['message' => 'Categoria eliminada correctament']);
    }
}
