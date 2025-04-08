<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrientationsTable extends Migration
{
    public function up()
    {
        Schema::create('orientations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('medecin_id')->constrained('medecins'); 
            $table->foreignId('employe_id')->constrained('employes');
            $table->foreignId('specialite_id')->constrained('type_specialites'); 
            
            $table->text('motif');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orientations');
    }
}