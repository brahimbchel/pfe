<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployesTable extends Migration
{
    public function up()
{
    Schema::create('employes', function (Blueprint $table) {
        $table->id(); 
        $table->unsignedBigInteger('utilisateur_id');
        $table->string('matricule')->unique();
        $table->string('numSecuSocial');
        $table->string('departement');
        $table->string('poste');
        $table->enum('groupeSanguin', ['A', 'B', 'AB', 'O']);
        $table->enum('rh', ['+','-']);
        $table->enum('situationFamille', ['Célibataire', 'Marié(e)', 'Séparé(e)', 'Veuf(ve)', 'Divorcé(e)']);
        $table->enum('serviceNational', ['Accompli', 'Dispensé', 'Inapte']);
        $table->timestamps();
        
        $table->foreign('utilisateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
    });
}


    public function down()
    {
        Schema::dropIfExists('employes');
    }
}
