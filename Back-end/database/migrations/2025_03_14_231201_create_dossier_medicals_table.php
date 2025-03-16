<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('dossiers_medicals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employe_id')->unique(); // Assure que chaque employé a un seul dossier
            $table->enum('aptitudeDeTravail', ['apte', 'inapteTemporaire', 'inapteDefinitif']);
            $table->text('description')->nullable();
            $table->timestamps();
        
            $table->foreign('employe_id')->references('id')->on('employes')->onDelete('cascade');
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('dossiers_medicals'); // Supprimez la table si elle existe
    }
};