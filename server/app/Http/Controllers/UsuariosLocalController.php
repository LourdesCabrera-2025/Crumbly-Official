<?php

namespace App\Http\Controllers;

use App\Models\UsuarioLocal;
use App\Models\Administrador; 
use App\Models\Cliente; 
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;

class UsuariosLocalController extends Controller
{
   public function store(Request $request)
{
    $ADMIN_ROLE_ID = 1; 
    $CLIENTE_ROLE_ID = 2;

    $request->validate([
        'username'          => 'required|string|max:255|unique:usuario_local,username',
        'email'             => 'required|string|email|max:255|unique:usuario_local,email',
        'password'          => 'required|string|min:6',
        'id_tipo_usuario'   => 'required|integer|exists:tipo_usuario,id_tipo_usuario',
        'nombre'            => 'required|string|max:255',
        'apellido'          => 'required|string|max:255',
        'telefono'          => 'nullable|string|max:20', 
    ]);

    return DB::transaction(function () use ($request, $ADMIN_ROLE_ID, $CLIENTE_ROLE_ID) {

        $id_admin = null;
        $id_cliente = null;
        $usuario = null;

        // Generar token de verificación
        $verification_token = Str::random(10);

        if ($request->id_tipo_usuario == $ADMIN_ROLE_ID) {
            // 1️⃣ Crear UsuarioLocal primero (id_admin null temporal)
            $usuario = UsuarioLocal::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'id_tipo_usuario' => $request->id_tipo_usuario,
                'id_cliente' => null,
                'id_admin' => null,
                'token' => $verification_token,
                'email_verified_at' => null,
            ]);

            // 2️⃣ Crear Administrador asociado
            $administrador = Administrador::create([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'telefono' => $request->telefono,
                'image_admin' => null,
            ]);

            // 3️⃣ Actualizar UsuarioLocal con id_admin
            $usuario->id_admin = $administrador->id_admin;
            $usuario->save();

        } elseif ($request->id_tipo_usuario == $CLIENTE_ROLE_ID) {
            // Cliente
            $cliente = Cliente::create([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'email' => $request->email,
                'image_cliente' => null,
            ]);
            $id_cliente = $cliente->id_cliente;

            $usuario = UsuarioLocal::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'id_tipo_usuario' => $request->id_tipo_usuario,
                'id_cliente' => $id_cliente,
                'id_admin' => null,
                'token' => $verification_token,
                'email_verified_at' => null,
            ]);

            // Si quieres, puedes guardar id_usuario_local en cliente si lo necesitas
            // $cliente->id_usuario_local = $usuario->id_usuario_local;
            // $cliente->save();

        } else {
            return response()->json([
                'message' => 'Tipo de usuario no soportado para el registro directo.',
            ], 400); 
        }

        // Enviar correo de verificación
        try {
            Mail::to($usuario->email)->send(new VerificationEmail($usuario));
        } catch (\Exception $mailEx) {
            \Log::error("Error al enviar correo de verificación: " . $mailEx->getMessage());
        }

        return response()->json([
            'message' => 'Usuario registrado exitosamente. Revisa tu correo para validar la cuenta.',
            'usuario' => $usuario->only(['id_usuario_local','username','email','id_tipo_usuario']),
        ], 201);
    });
}


    /**
     * Verifica el correo electrónico usando el token enviado.
     * La ruta debe ser /verify-email/{token}
     */
    public function verify(Request $request, $token)
    {
        // 1. Buscar al usuario por el token y asegurar que no esté verificado
        $user = UsuarioLocal::where('token', $token)
                            ->whereNull('email_verified_at')
                            ->first();

        if (!$user) {
            return response()->json(['message' => 'Token de verificación inválido o expirado.'], 403);
        }

        // 2. Marcar como verificado y resetear el token (evita re-uso)
        $user->email_verified_at = Carbon::now();
        $user->token = null; // Limpiamos el token después de usarlo
        $user->save();

        // 3. Respuesta de éxito
        return response()->json(['message' => 'Correo electrónico verificado exitosamente. Ahora puedes iniciar sesión.'], 200);

        // Si usas una interfaz web, redirigirías al login:
        // return redirect()->route('login')->with('success', 'Correo verificado. ¡Inicia sesión!');
    }

public function verifyLogin(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'token' => 'required|string',
    ]);

    $user = UsuarioLocal::where('email', $request->email)
                        ->where('token', $request->token)
                        ->first();

    if (!$user) {
        return response()->json(['message' => 'Token inválido o expirado'], 401);
    }

    // Marcar usuario como verificado
    $user->email_verified_at = now();
    $user->token = null; // Limpiar token usado
    $user->save();

    // Generar token de acceso Sanctum
    $accessToken = $user->createToken('authToken')->plainTextToken;

    return response()->json([
        'access_token' => $accessToken,
        'token_type' => 'Bearer',
        'user' => $user
    ]);
}



    public function resendVerification(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:usuario_local,email'
        ]);

        $user = UsuarioLocal::where('email', $request->email)->firstOrFail();

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Este correo ya está verificado.'], 409);
        }

        // --- CAMBIO CLAVE 2: Re-generar un nuevo token para reenviar ---
        $user->token = Str::random(64);
        $user->save();
        // ----------------------------------------------------------------

        try {
            Mail::to($user->email)->send(new VerificationEmail($user));
        } catch (\Exception $mailEx) {
            \Log::error("Error al reenviar correo de verificación: " . $mailEx->getMessage());
        }

        return response()->json([
            'message' => 'Se ha enviado un nuevo correo de verificación.'
        ]);
    }

    public function index()
    {
        $usuarios = UsuarioLocal::with(['tipo_usuario', 'cliente', 'admin'])->get();
        return response()->json($usuarios);
    }

    public function show($id_usuario_local)
    {
        $usuario = UsuarioLocal::with(['cliente', 'admin', 'tipo_usuario'])
            ->findOrFail($id_usuario_local);
        return response()->json($usuario);
    }

    public function update(Request $request, $id_usuario_local)
    {
        $usuario = UsuarioLocal::with(['cliente', 'admin'])->findOrFail($id_usuario_local);

        $request->validate([
            'nombre'          => 'sometimes|string|max:255',
            'apellido'        => 'sometimes|string|max:255',
            'email'           => 'sometimes|email|unique:usuario_local,email,' . $id_usuario_local . ',id_usuario_local',
            'password'        => 'sometimes|string|min:6',
            'image_cliente'   => 'sometimes|image|max:2048',
            'image_admin'     => 'sometimes|image|max:2048'
        ]);

        DB::transaction(function() use ($request, $usuario) {

            if ($usuario->cliente) {
                $cliente = $usuario->cliente;
                if ($request->filled('nombre'))    $cliente->nombre = $request->nombre;
                if ($request->filled('apellido'))  $cliente->apellido = $request->apellido;
                if ($request->filled('email') && $cliente->email !== $request->email) $cliente->email = $request->email;
                if ($request->hasFile('image_cliente')) $cliente->image_cliente = $request->file('image_cliente')->store('clientes', 'public');
                $cliente->save();
            }

            if ($usuario->admin) {
                $admin = $usuario->admin;
                if ($request->filled('nombre'))    $admin->nombre = $request->nombre;
                if ($request->filled('apellido'))  $admin->apellido = $request->apellido;
                if ($request->hasFile('image_admin')) $admin->image_admin = $request->file('image_admin')->store('admins', 'public');
                $admin->save();
            }

            if ($request->filled('email')) $usuario->email = $request->email;
            if ($request->filled('password')) $usuario->password = Hash::make($request->password);
            
            // Si el email es actualizado, el usuario debe verificarlo de nuevo
            if ($usuario->isDirty('email')) {
                $usuario->email_verified_at = null; 
                $usuario->token = Str::random(64); // Generar nuevo token para la re-verificación
                // Nota: Podrías reenviar el correo aquí si el email cambia.
            }

            $usuario->save();
        });

        return response()->json([
            'message' => 'Usuario local actualizado correctamente.',
            'usuario' => $usuario->load(['cliente', 'admin', 'tipo_usuario'])
        ]);
    }

    public function destroy($id_usuario_local)
    {
        $usuario = UsuarioLocal::with(['cliente', 'admin'])->findOrFail($id_usuario_local);

        DB::transaction(function() use ($usuario) {
            if ($usuario->cliente) $usuario->cliente->delete();
            if ($usuario->admin) $usuario->admin->delete();
            $usuario->delete();
        });

        return response()->json([
            'message'      => 'Usuario local eliminado correctamente.',
            'id_eliminado' => $id_usuario_local,
        ]);
    }
}