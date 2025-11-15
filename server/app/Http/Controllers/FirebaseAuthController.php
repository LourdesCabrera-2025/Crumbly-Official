<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UsuarioFirebase;
use Illuminate\Support\Facades\Log;

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
            $firebaseUser = $auth->getUser($uid);

            // Buscar o crear usuario en DB
            $user = UsuarioFirebase::firstOrCreate(
                ['uid_firebase' => $uid],
                [
                    'correo' => $firebaseUser->email,
                    'id_tipo_usuario' => 2,
                ]
            );

            // Retornar exito 
            return response()->json([
                'success' => true,
                'user' => [
                    'id' => $user->id_usuario_firebase,
                    'uid_firebase' => $user->uid_firebase,
                    'email' => $user->correo,
                    'id_tipo_usuario' => $user->id_tipo_usuario,
                    'firebase_user' => [
                        'name' => $firebaseUser->displayName,
                        'email_verified' => $firebaseUser->emailVerified,
                        'photo_url' => $firebaseUser->photoUrl,
                    ]
                ],
                'message' => 'Login successful'
            ]);

        } catch (\Throwable $e) {
            Log::error('Firebase login error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 401);
        }
    }
}