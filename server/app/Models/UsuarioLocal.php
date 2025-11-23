<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class UsuarioLocal
 * 
 * @property int $id_usuario_local
 * @property string $username
 * @property string $email
 * @property string $password
 * @property string|null $token
 * @property int|null $id_tipo_usuario
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string|null $id_cliente
 * 
 * @property Cliente|null $cliente
 * @property TipoUsuario|null $tipo_usuario
 * @property Collection|Administrador[] $administradors
 *
 * @package App\Models
 */
class UsuarioLocal extends Model
{
	protected $table = 'usuario_local';
	protected $primaryKey = 'id_usuario_local';

	protected $casts = [
		'id_tipo_usuario' => 'int'
	];

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
		'id_cliente'
	];

	public function cliente()
	{
		return $this->belongsTo(Cliente::class, 'id_cliente');
	}

	public function tipo_usuario()
	{
		return $this->belongsTo(TipoUsuario::class, 'id_tipo_usuario');
	}

	public function administradors()
	{
		return $this->hasMany(Administrador::class, 'id_usuario_local');
	}
}
