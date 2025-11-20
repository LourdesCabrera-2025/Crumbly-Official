<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::all();
        return response()->json($clientes, 200);
    }
    
    public function show($id)
    {
        $cliente = Cliente::find($id);
        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }
        return response()->json($cliente, 200);
    }
    
    /**
    * NOTA: El id_cliente se genera automáticamente por trigger en la BD (formato: CLI####YYYY)
    * No es necesario enviarlo en el request
    */
    
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'correo' => 'required|email|max:100|unique:Cliente,correo',
            'ciudad' => 'nullable|string|max:100',
            'cp' => 'nullable|string|max:10'
        ]);
        
        $cliente = Cliente::create($request->all());
        return response()->json($cliente, 201);
    }
    
    public function update(Request $request, $id)
    {
        $cliente = Cliente::find($id);
        if (!$cliente) {
            return response()->json(['message' => 'Cliente no
            encontrado'], 404);
        }
        $request->validate([
            'nombre' => 'required|string|max:100',
            'correo' => 'required|email|max:100|unique:Cliente,correo,' . $id . ',id_cliente',
            'ciudad' => 'nullable|string|max:100',
            'cp' => 'nullable|string|max:10'    
        ]);
        
        $cliente->update($request->all());
        return response()->json($cliente, 200);
    }
    
    public function destroy($id)
    {
        $cliente = Cliente::find($id);
        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }  
        $cliente->delete();
        return response()->json(['message' => 'Cliente eliminado correctamente'], 200);
    }
}
