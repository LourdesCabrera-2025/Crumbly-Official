<?php

namespace App\Http\Controllers;

use App\Models\UsuarioLocal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException; 
use Illuminate\Support\Facades\Auth;

class AuthControllerLocal extends Controller
{
     public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:usuario_local,email',
            'password' => 'required|string|min:6'
        ]);

        $user = UsuarioLocal::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        // Verificación de email
        if (!$user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Correo no verificado', 'needsVerification' => true], 403);
        }

        // Crear token de Sanctum
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->only(['id_usuario_local', 'username', 'email'])
        ]);
    }

    /**
     * Cierra la sesión del usuario (revoca el token actual).
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // El usuario autenticado mediante Sanctum revoca el token actual
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada exitosamente.'], 200);
    }

    /**
     * Obtiene los datos del usuario autenticado actualmente.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        // Carga al usuario con sus relaciones
        $user = $request->user()->load(['tipo_usuario', 'cliente', 'admin']);
        return response()->json($user);
    }
}