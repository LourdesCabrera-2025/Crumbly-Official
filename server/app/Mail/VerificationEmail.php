<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\UsuarioLocal;

class VerificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $usuario;
    public $verificationToken;

    /**
     * Crear una nueva instancia del Mailable.
     */
    public function __construct(UsuarioLocal $usuario)
    {
        $this->usuario = $usuario;
        $this->verificationToken = $usuario->token;
    }

    /**
     * Construir el mensaje de correo.
     */
    public function build()
    {
        return $this->subject('Verifica tu correo electrónico')
                    ->view('emails.verify') // Blade que vamos a crear
                    ->with([
                        'username' => $this->usuario->username,
                        'token' => $this->verificationToken,
                        'email' => $this->usuario->email
                    ]);
    }
}
