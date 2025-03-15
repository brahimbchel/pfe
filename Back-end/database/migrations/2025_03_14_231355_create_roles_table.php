<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('roles', function (Blueprint $table) {
        $table->id(); 
        $table->string('nomRole');
        $table->timestamps();
    });

    Schema::create('role_permission', function (Blueprint $table) {
        $table->unsignedBigInteger('role_id');
        $table->unsignedBigInteger('permission_id');
        
        $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade'); 
        $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade'); 
    });
}
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
