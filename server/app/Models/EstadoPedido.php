<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EstadoPedido
 * 
 * @property int $id_estado_pedido
 * @property string $nombre_estado
 * 
 * @property Collection|Pedido[] $pedidos
 *
 * @package App\Models
 */
class EstadoPedido extends Model
{
	protected $table = 'estado_pedido';
	protected $primaryKey = 'id_estado_pedido';
	public $timestamps = false;

	protected $fillable = [
		'nombre_estado'
	];

	public function pedidos()
	{
		return $this->hasMany(Pedido::class, 'id_estado_pedido');
	}
}
