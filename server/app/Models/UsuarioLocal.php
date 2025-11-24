<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;;

class UsuarioLocal extends Model implements MustVerifyEmail
{
	 use HasApiTokens, MustVerifyEmailTrait; 

    protected $table = 'usuario_local';
    
    protected $primaryKey = 'id_usuario_local';

    protected $hidden = [
        'password',
        'token'
    ];

    protected $fillable = [
        'username',
        'email',
        'password',
        'token',
        'id_tipo_usuario',
        'id_cliente',
        'id_admin'
    ];

    protected $casts = [
        'id_tipo_usuario' => 'integer',
		'email_verified_at' => 'datetime',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class, 'id_cliente', 'id_cliente');
    }

    public function tipo_usuario(): BelongsTo
    {
        return $this->belongsTo(TipoUsuario::class, 'id_tipo_usuario');
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Administrador::class, 'id_admin', 'id_admin');
    }
}