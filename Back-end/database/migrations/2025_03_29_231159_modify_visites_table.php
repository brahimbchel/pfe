<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('visites', function (Blueprint $table) {
            // Ajouter les nouvelles colonnes
            $table->string('type');
            $table->text('prescriptions')->nullable();
            $table->text('observations')->nullable();

            // Supprimer la colonne conclusionMedicale
            $table->dropColumn('conclusionMedicale');
        });
    }

    public function down()
    {
        Schema::table('visites', function (Blueprint $table) {
            // Supprimer les nouvelles colonnes
            $table->dropColumn(['prescriptions', 'observations']);

            // Rétablir la colonne conclusionMedicale
            $table->string('conclusionMedicale')->nullable(); // ou le type approprié
        });
    }

};
