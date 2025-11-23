<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MetodoPago
 * 
 * @property int $id_metodo
 * @property string $nombre
 * 
 * @property Collection|Cliente[] $clientes
 * @property Collection|PagoPedido[] $pago_pedidos
 *
 * @package App\Models
 */
class MetodoPago extends Model
{
	protected $table = 'metodo_pago';
	protected $primaryKey = 'id_metodo';
	public $timestamps = false;

	protected $fillable = [
		'nombre'
	];

	public function clientes()
	{
		return $this->hasMany(Cliente::class, 'id_metodo');
	}

	public function pago_pedidos()
	{
		return $this->hasMany(PagoPedido::class, 'id_metodo');
	}
}
