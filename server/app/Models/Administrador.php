<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Administrador
 * 
 * @property string $id_admin
 * @property string $nombre
 * @property string $apellido
 * @property string $telefono
 * @property string|null $image_admin
 * @property int|null $id_usuario_local
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property UsuarioLocal|null $usuario_local
 * @property Collection|LogAccione[] $log_acciones
 * @property Collection|Producto[] $productos
 *
 * @package App\Models
 */
class Administrador extends Model
{
	protected $table = 'administrador';
	protected $primaryKey = 'id_admin';
	public $incrementing = false;

	protected $casts = [
		'id_usuario_local' => 'int'
	];

	protected $fillable = [
		'nombre',
		'apellido',
		'telefono',
		'image_admin',
		'id_usuario_local'
	];

	public function usuario_local()
	{
		return $this->belongsTo(UsuarioLocal::class, 'id_usuario_local');
	}

	public function log_acciones()
	{
		return $this->hasMany(LogAccione::class, 'id_admin');
	}

	public function productos()
	{
		return $this->hasMany(Producto::class, 'id_admin');
	}
}
