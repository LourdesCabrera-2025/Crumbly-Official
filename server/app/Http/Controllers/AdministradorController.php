<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Administrador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdministradorController extends Controller
{

    public function index()
    {
        $administrador = Administrador::with('usuario_local', 'productos', 'log_acciones')->get();
        return response()->json($administrador);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:60', 
            'apellido' => 'required|string|max:60',
            'telefono' => ['required','regex:/^[267][0-9]{7}$/'],
            'image_admin' => 'nullable|string|max:255',
            'id_usuario_local'=>'nullable|exists:usuario_local, id_usuario_local',
        ]);

        $administrador = Administrador::create($validated);
        return response()->json($administrador,201);
        
    }

    
    public function show(Administrador $administrador)
    {
        $user = Auth::user();

        /**
         *  Validación para que los administradores estandar solo puedan ver su propio perfil
         */

        if($user->tipo_usuario->tipo_usuario !== 'root' && $user->id_admin!== $administrador->id_admin) {
            return response()->json(['message' => 'No tienes permisos'], 403);
        }

        return response()->json(['message' => 'No tienes  permisos'], 403);
    }

    public function update(Request $request, Administrador $administrador)
    {
        $user = Auth::user();

        if($user->tipo_usuario->tipo_usuario !== 'root' && $user->id_admin !== $administrador->id_admin) {
            return response()->json(['message' => 'No tienes permisos'], 404);
                    $validated = $request->validate([
            'nombre' => 'sometimes|string|max:60',
            'apellido' => 'sometimes|string|max:60',
            'telefono' => ['sometimes', 'regex:/^[267][0-9]{7}$/'],
            'image_admin' => 'nullable|string|max:255',
            'id_usuario_local' => 'nullable|exists:usuario_local,id_usuario_local',
        ]);

        $administrador->update($validated);
        return response()->json($administrador);
        }
    }


    public function destroy(Administrador $administrador)
    {
        $administrador->delete();
        return response()->json(['message' => 'Administrador eliminado correctamente']);
    }
}
