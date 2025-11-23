<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Categorium
 * 
 * @property int $id_categoria
 * @property string $nombre_categoria
 * @property string $descripcion
 * 
 * @property Collection|Producto[] $productos
 *
 * @package App\Models
 */
class Categoria extends Model
{
	protected $table = 'categoria';
	protected $primaryKey = 'id_categoria';
	public $timestamps = false;

	protected $fillable = [
		'nombre_categoria',
		'descripcion'
	];

	public function productos()
	{
		return $this->hasMany(Producto::class, 'id_categoria');
	}
}
