<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Kreait\Firebase\Auth;

class FirebaseEnsureValidUser
{
    public function handle(Request $request, Closure $next): Response
    {
        $idToken = $request->bearerToken();

        if (!$idToken) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        }

        try {
            /** @var Auth $auth */
            $auth = app('firebase.auth');
            $verifiedIdToken = $auth->verifyIdToken($idToken);

            // Guardamos el UID del usuario para uso posterior
            $request->merge([
                'firebase_uid' => $verifiedIdToken->claims()->get('sub')
            ]);

        } catch (\Throwable $e) {
            return response()->json(['error' => 'Token inválido', 'details' => $e->getMessage()], 401);
        }

        return $next($request);
    }
}

