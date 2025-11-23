<?php

namespace App\Http\Controllers;

use App\Models\TipoUsuario;
use Illuminate\Http\Request;

class TipoUsuarios extends Controller
{

    public function index()
    {
        return response()->json(
            TipoUsuario::all()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tipo_usuario' => 'required|string|max:50'
        ]);

        $nivel = TipoUsuario::create($validated);
        return response()->json($nivel, 201);
    }

    public function show($id_tipo_usuario)
    {
        $tipo_usuario = TipoUsuario::findOrFail($id_tipo_usuario);
        return response()->json($tipo_usuario);
    }

    public function update(Request $request, $id_tipo_usuario)
    {
        $tipo_usuario = TipoUsuario::findOrFail($id_tipo_usuario);

        $validated = $request->validate([
            'tipo_usuario' => 'sometimes|string|max:50',
        ]);

        $tipo_usuario->update($validated);

        return response()->json($tipo_usuario);
    }

    public function destroy($id_tipo_usuario)
    {
        
        $tipo_usuario = TipoUsuario::findOrFail($id_tipo_usuario);
        $tipo_usuario->delete();

        return response()->json(['message' => 'Nivel de Usuario Eliminado']);
    }
}
