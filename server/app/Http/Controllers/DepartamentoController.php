<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Departamento;
use Illuminate\Http\Request;

class DepartamentoController extends Controller
{

    public function index()
    {
        return response()->json(Departamento::all());
    }


    public function store(Request $request)
    {
        $validate = $request->validate([
            'nombre_departamento' => 'requires|string|max:80'
        ]);

        $departamento = Departamento::create($validate);
        return response()->json($departamento,201);
    }


    public function show($id_departamento)
    {
        $departamento = Departamento::findOrFile($id_departamento);
        return response()->json($departamento);
    }

    public function searchByName($nombre_departamento) {
        $departamento = Departamento::where('nombre_departamento', 'LIKE', "%$nombre_departamento%")
        ->get();
        return response()->json($departamento);
    } 


    public function update(Request $request,  $id_departamento)
    {
        $departamento = Departamento::findOrFail($id_departamento);
        $validate = $request->validate([
            'nombre_departamento' => 'sometimes|requires|max:80'
        ]);
        $departamento->update($validate);
        return response()->json($departamento);
    }


    public function destroy($id_departamento)
    {
        $departamento = Departamento::findOrFail($id_departamento);
        $departamento->delete();
        return response()->json(['message' => 'Departamento eliminado correrctamente']);
    }
}
