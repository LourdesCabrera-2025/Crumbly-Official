<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EntregaPedido
 * 
 * @property int $id_entrega
 * @property int|null $id_pedido
 * @property int|null $id_direccion
 * @property Carbon|null $fecha_entrega
 * 
 * @property Pedido|null $pedido
 * @property Direccion|null $direccion
 *
 * @package App\Models
 */
class EntregaPedido extends Model
{
	protected $table = 'entrega_pedido';
	protected $primaryKey = 'id_entrega';
	public $timestamps = false;

	protected $casts = [
		'id_pedido' => 'int',
		'id_direccion' => 'int',
		'fecha_entrega' => 'datetime'
	];

	protected $fillable = [
		'id_pedido',
		'id_direccion',
		'fecha_entrega'
	];

	public function pedido()
	{
		return $this->belongsTo(Pedido::class, 'id_pedido');
	}

	public function direccion()
	{
		return $this->belongsTo(Direccion::class, 'id_direccion');
	}
}
