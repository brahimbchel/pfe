<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('administrateurs', function (Blueprint $table) {
        $table->id(); 
        $table->unsignedBigInteger('utilisateur_id');
        $table->timestamps();
        
        $table->foreign('utilisateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
    });
}
    public function down(): void
    {
        Schema::dropIfExists('administrateurs');
    }
};
