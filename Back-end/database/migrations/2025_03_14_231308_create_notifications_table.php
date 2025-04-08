<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('notifications', function (Blueprint $table) {
        $table->id('idNotification');
        $table->unsignedBigInteger('idDestinataire');
        $table->unsignedBigInteger('idAuteur'); 
        $table->string('sujet');
        $table->text('message');
        $table->dateTime('dateNotification');
        $table->timestamps();

        $table->foreign('idDestinataire')->references('id')->on('utilisateurs')->onDelete('cascade');
        $table->foreign('idAuteur')->references('id')->on('administrateurs')->onDelete('cascade'); 
    });
}
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
