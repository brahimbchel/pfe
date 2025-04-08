<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('utilisateurs', function (Blueprint $table) {
        $table->id(); 
        $table->string('nom');
        $table->string('prenom');
        $table->string('email')->unique();
        $table->string('numTelephone')->unique();
        $table->string('motDePasse');
        $table->date('dateNaissance');
        $table->string('lieuNaissance');
        $table->string('wilayaNaissance');
        $table->string('adresse');
        $table->string('sexe');
        $table->string('nationalite');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};
