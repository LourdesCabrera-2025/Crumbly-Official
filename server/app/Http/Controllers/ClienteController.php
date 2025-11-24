<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\UsuarioLocal;
use Illuminate\Http\Request;
use App\Services\ImageKitService;
use Illuminate\Support\Facades\Auth;

class ClienteController extends Controller
{

public function index()
{
    return response()->json(
        Cliente::with([
            'usuario_firebases',
            'usuario_locals',
            'metodo_pago'
        ])->get()
    );
}

    public function show($id_cliente)
    {
        $user = Auth::user();


        if (!in_array($user->tipo_usuario->tipo_usuario, ['root', 'admin'])) {
            return response()->json(['message' => 'No tienes permisos'], 403);
        }

        $cliente = Cliente::with([
            'usuario_firebases',
            'usuario_locals',
            'metodo_pago'
        ])->findOrFail($id_cliente);

        return response()->json($cliente);
    }


public function update(Request $request, $id_usuario_local, ImageKitService $imageKit)
{
    $usuario = UsuarioLocal::with('cliente')->findOrFail($id_usuario_local);

    $request->validate([
        'image_cliente' => 'sometimes|image|max:4096', // aceptamos imágenes
    ]);

    if ($usuario->cliente) {
        $cliente = $usuario->cliente;

        if ($request->hasFile('image_cliente')) {
            // Subir a ImageKit
            $url = $imageKit->upload($request->file('image_cliente'), 'clientes');

            if ($url) {
                $cliente->image_cliente = $url;
            }
        }

        $cliente->save();
    }

    return response()->json([
        'message' => 'Usuario local actualizado correctamente.',
        'usuario' => $usuario
    ]);
}
    public function destroyAccount()
    {
        $user = Auth::user();
        $cliente = $user->cliente;

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        if ($user instanceof \App\Models\UsuarioLocal) {
            $user->delete();
        } elseif ($user instanceof \App\Models\UsuarioFirebase) {
            $user->delete();
        }


        if ($cliente->usuario_locals()->count() === 0 && $cliente->usuario_firebases()->count() === 0) {
            $cliente->delete();
        }

        return response()->json([
            'message' => 'Cuenta eliminada correctamente',
            'id_cliente_eliminado' => $cliente->id_cliente
        ]);
    }
}
