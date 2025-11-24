<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UsuarioFirebase;
use Illuminate\Http\Request;

class UsuariosFirebase extends Controller
{
    /**
     * Descripción: 
     */
    public function index()
    {
        return response()->json(
            UsuarioFirebase::with(['cliente', 'tipo_usuario'])->get()
        );
    }

    public function show($id_usuario_firebase) 
    {
        $usuarioFirebase = UsuarioFirebase::with(['cliente', 'id_tipo_usuario'])
        ->findOrFail($id_usuario_firebase);
        return response()->json($usuarioFirebase);
    }

   /**
    * Descripción: 
    */
    public function searchByDisplayName($display_name)
    {
        $usuarioFirebase = UsuarioFirebase::where('display_name', 'LIKE', "%$display_name%")
        ->get();
        return response()->json($usuarioFirebase);
    }
}
