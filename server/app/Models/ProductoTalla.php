<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProductoTalla
 * 
 * @property int $id_producto_talla
 * @property string $id_producto
 * @property string $talla
 * @property string $personas
 * @property int|null $stock
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Producto $producto
 *
 * @package App\Models
 */
class ProductoTalla extends Model
{
	protected $table = 'producto_talla';
	protected $primaryKey = 'id_producto_talla';

	protected $casts = [
		'stock' => 'int'
	];

	protected $fillable = [
		'id_producto',
		'talla',
		'personas',
		'stock'
	];

	public function producto()
	{
		return $this->belongsTo(Producto::class, 'id_producto');
	}
}
