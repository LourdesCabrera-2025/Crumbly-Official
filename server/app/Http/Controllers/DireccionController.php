<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Direccion;

class DireccionController extends Controller
{
    public function index()
    {
        $direcciones = Direccion::all();
        return response()->json($direcciones, 200);
    }

    public function show($id)
    {
        $direccion = Direccion::find($id);
        if (!$direccion) {
            return response()->json(['message' => 'Dirección no encontrada'], 404);
        }
        return response()->json($direccion, 200);
    }

    public function store(Request $request)
    {
        $direccion = Direccion::create($request->all());
        return response()->json($direccion, 201);
    }

    public function update(Request $request, $id)
    {
        $direccion = Direccion::find($id);
        if (!$direccion) {
            return response()->json(['message' => 'Dirección no encontrada'], 404);
        }
        $direccion->update($request->all());
        return response()->json($direccion, 200);
    }

    public function destroy($id)
    {
        $direccion = Direccion::find($id);
        if (!$direccion) {
            return response()->json(['message' => 'Dirección no encontrada'], 404);
        }
        $direccion->delete();
        return response()->json(['message' => 'Dirección eliminada correctamente'], 200);
    }
}
