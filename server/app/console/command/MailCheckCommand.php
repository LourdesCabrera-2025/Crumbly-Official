<?php

namespace app\console\command;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationEmail;
use App\Models\UsuarioLocal;
use Illuminate\Support\Str;

class MailCheckCommand extends Command
{
    /**
     * El nombre y la firma del comando.
     * @var string
     */
    protected $signature = 'mail:check {email} {id_usuario?}';

    /**
     * La descripción del comando en la consola.
     * @var string
     */
    protected $description = 'Fuerza el envío de VerificationEmail para probar la conexión con Brevo.';

    /**
     * Ejecuta el comando de consola.
     */
    public function handle()
    {
        // 1. Obtener argumentos
        $email_destino = $this->argument('email');
        $id_de_prueba = $this->argument('id_usuario') ?? 1; // Por defecto usa el ID 1

        $this->info("--- Iniciando prueba de conexión SMTP a través de Brevo ---");
        $this->info("Destino: $email_destino");
        $this->info("Usando ID de usuario: $id_de_prueba (o simulado)");

        // 2. Simular/Cargar el Usuario
        $usuario = UsuarioLocal::find($id_de_prueba);

        if (!$usuario) {
            $this->warn("Usuario con ID $id_de_prueba no encontrado. Creando un usuario simulado...");
            $usuario = new UsuarioLocal([
                'username' => 'SimulatedTest', 
                'email' => $email_destino, 
                'id_usuario_local' => 0, 
                'token' => Str::random(64)
            ]);
        } else {
            $this->line("Usando datos del usuario: {$usuario->username} ({$usuario->email})");
            // Aseguramos que el token exista si el Mailable lo necesita
            if (empty($usuario->token)) {
                 $usuario->token = Str::random(64);
            }
        }

        // 3. Ejecutar Envío
        try {
            Mail::to($email_destino)->send(new VerificationEmail($usuario));
            
            $this->info("\n✅ ÉXITO ✅");
            $this->info("El correo fue enviado a Brevo con éxito.");
            $this->info("Por favor, revisa la bandeja de entrada y spam de: $email_destino");
            
        } catch (\Exception $e) {
            
            $this->error("\n❌ ERROR CRÍTICO ❌");
            $this->error("La conexión con el servidor SMTP (Brevo) FALLÓ.");
            $this->comment("Mensaje de Brevo/Transporte: " . $e->getMessage());
            $this->comment("Revisa tus credenciales MAIL_USERNAME y MAIL_PASSWORD.");
            
            // Opcional: Para una depuración más profunda
            // $this->error("Línea: " . $e->getLine() . " en " . $e->getFile());
        }

        return Command::SUCCESS;
    }
}