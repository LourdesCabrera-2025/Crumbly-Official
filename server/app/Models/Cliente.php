<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Cliente
 * 
 * @property string $id_cliente
 * @property string $nombre
 * @property string $apellido
 * @property string $email
 * @property string|null $image_cliente
 * @property int|null $id_metodo
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property MetodoPago|null $metodo_pago
 * @property Collection|Direccion[] $direccions
 * @property Collection|Pedido[] $pedidos
 * @property Collection|UsuarioFirebase[] $usuario_firebases
 * @property Collection|UsuarioLocal[] $usuario_locals
 * @property Collection|Valoracion[] $valoracions
 *
 * @package App\Models
 */
class Cliente extends Model
{
	protected $table = 'cliente';
	protected $primaryKey = 'id_cliente';
	public $incrementing = false;

	protected $casts = [
		'id_metodo' => 'int'
	];

	protected $fillable = [
		'nombre',
		'apellido',
		'email',
		'image_cliente',
		'id_metodo'
	];

	public function metodo_pago()
	{
		return $this->belongsTo(MetodoPago::class, 'id_metodo');
	}

	public function direccions()
	{
		return $this->hasMany(Direccion::class, 'id_cliente');
	}

	public function pedidos()
	{
		return $this->hasMany(Pedido::class, 'id_cliente');
	}

	public function usuario_firebases()
	{
		return $this->hasMany(UsuarioFirebase::class, 'id_cliente');
	}

	public function usuario_locals()
	{
		return $this->hasMany(UsuarioLocal::class, 'id_cliente');
	}

	public function valoracions()
	{
		return $this->hasMany(Valoracion::class, 'id_cliente');
	}
}
