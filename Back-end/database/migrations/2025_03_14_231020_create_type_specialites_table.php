<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('type_specialites', function (Blueprint $table) {
            $table->id();
            $table->string('nomTypeSpecialite');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('type_specialites');
    }
};
