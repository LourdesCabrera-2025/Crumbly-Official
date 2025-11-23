<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Valoracion
 * 
 * @property int $id_valoracion
 * @property string|null $id_cliente
 * @property string|null $id_producto
 * @property int|null $puntuacion
 * @property string|null $comentario
 * @property Carbon|null $fecha
 * 
 * @property Cliente|null $cliente
 * @property Producto|null $producto
 *
 * @package App\Models
 */
class Valoracion extends Model
{
	protected $table = 'valoracion';
	protected $primaryKey = 'id_valoracion';
	public $timestamps = false;

	protected $casts = [
		'puntuacion' => 'int',
		'fecha' => 'datetime'
	];

	protected $fillable = [
		'id_cliente',
		'id_producto',
		'puntuacion',
		'comentario',
		'fecha'
	];

	public function cliente()
	{
		return $this->belongsTo(Cliente::class, 'id_cliente');
	}

	public function producto()
	{
		return $this->belongsTo(Producto::class, 'id_producto');
	}
}
