<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRoot
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user || !isset($user->tipo_usuario) || $user->tipo_usuario->tipo_usuario !== 'root') {
            return response()->json([
                'message' => 'No tienes acceso para modificar un administrador'
            ], 403); 
        }

        return $next($request);
    }
}
