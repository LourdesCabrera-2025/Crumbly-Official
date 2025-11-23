<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Pedido
 * 
 * @property int $id_pedido
 * @property string|null $id_cliente
 * @property Carbon|null $fecha_pedido
 * @property float|null $total
 * @property int|null $id_estado_pedido
 * 
 * @property Cliente|null $cliente
 * @property EstadoPedido|null $estado_pedido
 * @property Collection|DetallePedido[] $detalle_pedidos
 * @property Collection|EntregaPedido[] $entrega_pedidos
 * @property Collection|PagoPedido[] $pago_pedidos
 *
 * @package App\Models
 */
class Pedido extends Model
{
	protected $table = 'pedido';
	protected $primaryKey = 'id_pedido';
	public $timestamps = false;

	protected $casts = [
		'fecha_pedido' => 'datetime',
		'total' => 'float',
		'id_estado_pedido' => 'int'
	];

	protected $fillable = [
		'id_cliente',
		'fecha_pedido',
		'total',
		'id_estado_pedido'
	];

	public function cliente()
	{
		return $this->belongsTo(Cliente::class, 'id_cliente');
	}

	public function estado_pedido()
	{
		return $this->belongsTo(EstadoPedido::class, 'id_estado_pedido');
	}

	public function detalle_pedidos()
	{
		return $this->hasMany(DetallePedido::class, 'id_pedido');
	}

	public function entrega_pedidos()
	{
		return $this->hasMany(EntregaPedido::class, 'id_pedido');
	}

	public function pago_pedidos()
	{
		return $this->hasMany(PagoPedido::class, 'id_pedido');
	}
}
