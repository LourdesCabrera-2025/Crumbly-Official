<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Municipio
 * 
 * @property int $id_municipio
 * @property string $nombre_municipio
 * @property int|null $id_departamento
 * 
 * @property Departamento|null $departamento
 *
 * @package App\Models
 */
class Municipio extends Model
{
	protected $table = 'municipio';
	protected $primaryKey = 'id_municipio';
	public $timestamps = false;

	protected $casts = [
		'id_departamento' => 'int'
	];

	protected $fillable = [
		'nombre_municipio',
		'id_departamento'
	];

	public function departamento()
	{
		return $this->belongsTo(Departamento::class, 'id_departamento');
	}
}
