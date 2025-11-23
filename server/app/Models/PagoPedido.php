<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PagoPedido
 * 
 * @property int $id_pago
 * @property int|null $id_pedido
 * @property int|null $id_metodo
 * @property float|null $monto
 * @property Carbon|null $fecha_pago
 * 
 * @property Pedido|null $pedido
 * @property MetodoPago|null $metodo_pago
 *
 * @package App\Models
 */
class PagoPedido extends Model
{
	protected $table = 'pago_pedido';
	protected $primaryKey = 'id_pago';
	public $timestamps = false;

	protected $casts = [
		'id_pedido' => 'int',
		'id_metodo' => 'int',
		'monto' => 'float',
		'fecha_pago' => 'datetime'
	];

	protected $fillable = [
		'id_pedido',
		'id_metodo',
		'monto',
		'fecha_pago'
	];

	public function pedido()
	{
		return $this->belongsTo(Pedido::class, 'id_pedido');
	}

	public function metodo_pago()
	{
		return $this->belongsTo(MetodoPago::class, 'id_metodo');
	}
}
