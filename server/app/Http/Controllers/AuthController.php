<?php

namespace App\Http\Controllers;

use App\Models\UsuarioFirebase;
use App\Models\Cliente;
use App\Services\FirebaseService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    protected FirebaseService $firebase;

    public function __construct(FirebaseService $firebase)
    {
        $this->firebase = $firebase;
    }

    public function loginWithGoogle(Request $request)
    {
        try {
            // Validar request
            $data = $request->validate([
                'firebase_uid'   => 'required|string',
                'display_name'   => 'nullable|string',
                'email'          => 'required|email',
                'photo_url'      => 'nullable|url',
                'email_verified' => 'nullable|boolean',
            ]);

            $data['provider'] = 'google';

            // Separar nombre y apellido del display_name
            $displayName = $data['display_name'] ?? '';
            $nombre = 'Desconocido';
            $apellido = '';
            if (!empty($displayName)) {
                $cleanName = preg_replace('/[^A-Za-z0-9 ]/', '', str_replace('_', ' ', $displayName));
                $parts = explode(' ', $cleanName, 2);
                $nombre = $parts[0] ?? 'Desconocido';
                $apellido = $parts[1] ?? '';
            }

            // Buscar cliente existente
            $cliente = Cliente::where('email', $data['email'])->first();

            if (!$cliente) {
                // Crear cliente (trigger genera id_cliente)
                Cliente::create([
                    'nombre' => $nombre,
                    'apellido' => $apellido,
                    'email' => $data['email'],
                ]);

                // Recuperar el cliente recién creado
                $cliente = Cliente::where('email', $data['email'])->first();
            }

            // Crear o actualizar usuario Firebase
            $usuario = UsuarioFirebase::updateOrCreate(
                ['firebase_uid' => $data['firebase_uid']],
                [
                    'display_name'    => $data['display_name'],
                    'email'           => $data['email'],
                    'photo_url'       => $data['photo_url'] ?? null,
                    'provider'        => $data['provider'],
                    'email_verified'  => $data['email_verified'] ?? 1,
                    'id_tipo_usuario' => 2, // Cliente
                    'id_cliente'      => $cliente->id_cliente,
                ]
            );

            // Generar token JWT
            $token = JWTAuth::fromUser($usuario);

            return response()->json([
                'usuario' => $usuario,
                'token'   => $token,
            ]);
        } catch (\Throwable $e) {
            // Registrar error en logs
            Log::error('Error loginWithGoogle: '.$e->getMessage());

            // Solo enviar mensaje amigable al frontend
            return response()->json([
                'error' => 'No se pudo iniciar sesión. Por favor, intenta de nuevo.'
            ], 500);
        }
    }
}
