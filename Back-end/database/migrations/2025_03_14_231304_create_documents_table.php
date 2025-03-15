<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentsTable extends Migration
{
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id('idDocument'); 
            $table->unsignedBigInteger('EmployeId'); 
            $table->string('nomDocument');
            $table->string('LienScanne');
    
            $table->unsignedBigInteger('typeDocument_id'); 
            $table->timestamps();

            $table->foreign('EmployeId')->references('id')->on('employes')->onDelete('cascade');
            $table->foreign('typeDocument_id')->references('id')->on('type_documents')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('documents');
    }
}