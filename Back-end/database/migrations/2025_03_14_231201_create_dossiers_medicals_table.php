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
            $table->string('matricule')->unique();
            $table->enum('aptitudeDeTravail', ['apte', 'inapteTemporaire', 'inapteDefinitif']);
            $table->text('notes')->nullable();
            $table->timestamps();
        
            $table->foreign('matricule')->references('matricule')->on('employes')->onDelete('cascade');
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('dossiers_medicals'); 
    }
};