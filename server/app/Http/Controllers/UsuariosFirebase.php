<?php

namespace App\Http\Controllers;

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

    /**
     * Descripción: 
     */
    public function destroy($id_usuario_firebase)
    {
        $usuarioFirebase = UsuarioFirebase::findOrFail($id_usuario_firebase);
        $usuarioFirebase->delete();
        return response()->json([
            'message' => 'Usuario Firebase eliminado correctamente',
            'id_eliminado' => $id_usuario_firebase,
        ]);
    }
}
