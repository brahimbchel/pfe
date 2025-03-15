<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVisitesTable extends Migration
{
    public function up()
    {
        Schema::create('visites', function (Blueprint $table) {
            $table->id('idVisite');
            $table->dateTime('dateVisite');
            $table->unsignedBigInteger('MedecinId');
            $table->unsignedBigInteger('EmployeId');
            $table->enum('type', ['Admission', 'Periodique', 'Spontane', 'Reprise', 'Controle', 'AccidentDeTravail', 'ContreVisite', 'Reintegration']);
            $table->unsignedBigInteger('cms_id');
            $table->text('conclusionMedicale');
            $table->timestamps();

            $table->foreign('MedecinId')->references('id')->on('medecins');
            $table->foreign('EmployeId')->references('id')->on('employes');
            $table->foreign('cms_id')->references('id')->on('cms');
        });
    }

    public function down()
    {
        Schema::dropIfExists('visites');
    }
}
