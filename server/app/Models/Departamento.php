<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Departamento
 * 
 * @property int $id_departamento
 * @property string $nombre_departamento
 * 
 * @property Collection|Direccion[] $direccions
 * @property Collection|Municipio[] $municipios
 *
 * @package App\Models
 */
class Departamento extends Model
{
	protected $table = 'departamento';
	protected $primaryKey = 'id_departamento';
	public $timestamps = false;

	protected $fillable = [
		'nombre_departamento'
	];

	public function direccions()
	{
		return $this->hasMany(Direccion::class, 'id_departamento');
	}

	public function municipios()
	{
		return $this->hasMany(Municipio::class, 'id_departamento');
	}
}
