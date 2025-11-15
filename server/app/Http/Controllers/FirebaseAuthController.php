<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UsuarioFirebase;

class FirebaseAuthController extends Controller
{
    public function login(Request $request)
    {
        $idToken = $request->token;
        $auth = app('firebase.auth');

        try {
            // Validar token
            $verifiedIdToken = $auth->verifyIdToken($idToken);
            $uid = $verifiedIdToken->claims()->get('sub');

            // Buscar usuario en DB
            $user = UsuarioFirebase::where('uid_firebase', $uid)->first();

            // Si no existe, crear usuario
            if (!$user) {
                $firebaseUser = $auth->getUser($uid);

                $user = UsuarioFirebase::create([
                    'uid_firebase' => $uid,
                    'correo' => $firebaseUser->email,
                    'id_tipo_usuario' => 2,
                ]);
            }

            // Crear token
            $token = $user->createToken('api')->plainTextToken;

            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 401);
        }
    }
}
