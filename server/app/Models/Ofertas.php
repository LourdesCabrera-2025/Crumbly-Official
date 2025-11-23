<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Ofertum
 * 
 * @property int $id_oferta
 * @property string|null $id_producto
 * @property float|null $descuento
 * @property Carbon|null $fecha_inicio
 * @property Carbon|null $fecha_fin
 * 
 * @property Producto|null $producto
 *
 * @package App\Models
 */
class Ofertas extends Model
{
	protected $table = 'oferta';
	protected $primaryKey = 'id_oferta';
	public $timestamps = false;

	protected $casts = [
		'descuento' => 'float',
		'fecha_inicio' => 'datetime',
		'fecha_fin' => 'datetime'
	];

	protected $fillable = [
		'id_producto',
		'descuento',
		'fecha_inicio',
		'fecha_fin'
	];

	public function producto()
	{
		return $this->belongsTo(Producto::class, 'id_producto');
	}
}
