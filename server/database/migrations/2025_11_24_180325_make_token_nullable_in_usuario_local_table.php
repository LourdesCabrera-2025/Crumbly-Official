<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('usuario_local', function (Blueprint $table) {
            // Aseguramos que la columna 'token' (de tipo string de 64 caracteres) pueda ser nula.
            // Nota: El método change() requiere que la librería 'doctrine/dbal' esté instalada.
            $table->string('token', 10)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

    }
};
