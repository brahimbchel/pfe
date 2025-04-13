<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('medecins', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('utilisateur_id');
            $table->unsignedBigInteger('typeSpecialite_id');
            $table->string('adresseService');
            $table->timestamps();
            
            $table->foreign('utilisateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
            $table->foreign('typeSpecialite_id')->references('id')->on('type_specialites')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medecin_disponibilite');
        Schema::dropIfExists('medecins'); 
    }
};