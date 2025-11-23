<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TipoUsuario
 * 
 * @property int $id_tipo_usuario
 * @property string $tipo_usuario
 * 
 * @property Collection|UsuarioFirebase[] $usuario_firebases
 * @property Collection|UsuarioLocal[] $usuario_locals
 *
 * @package App\Models
 */
class TipoUsuario extends Model
{
	protected $table = 'tipo_usuario';
	protected $primaryKey = 'id_tipo_usuario';
	public $timestamps = false;

	protected $fillable = [
		'tipo_usuario'
	];

	public function usuario_firebases()
	{
		return $this->hasMany(UsuarioFirebase::class, 'id_tipo_usuario');
	}

	public function usuario_locals()
	{
		return $this->hasMany(UsuarioLocal::class, 'id_tipo_usuario');
	}
}
