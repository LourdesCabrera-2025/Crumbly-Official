<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class DetallePedido
 * 
 * @property int $id_detalle
 * @property int|null $id_pedido
 * @property string|null $id_producto
 * @property int $cantidad
 * @property float|null $subtotal
 * 
 * @property Pedido|null $pedido
 * @property Producto|null $producto
 *
 * @package App\Models
 */
class DetallePedido extends Model
{
	protected $table = 'detalle_pedido';
	protected $primaryKey = 'id_detalle';
	public $timestamps = false;

	protected $casts = [
		'id_pedido' => 'int',
		'cantidad' => 'int',
		'subtotal' => 'float'
	];

	protected $fillable = [
		'id_pedido',
		'id_producto',
		'cantidad',
		'subtotal'
	];

	public function pedido()
	{
		return $this->belongsTo(Pedido::class, 'id_pedido');
	}

	public function producto()
	{
		return $this->belongsTo(Producto::class, 'id_producto');
	}
}
