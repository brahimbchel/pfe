<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFormationFieldsToEmployesTable extends Migration
{
    public function up()
    {
        Schema::table('employes', function (Blueprint $table) {
            $table->string('formationScolaire')->nullable()->after('situationFamille');
            $table->string('formationProfessionnelle')->nullable()->after('formationScolaire');
            $table->string('qualificationProfessionnelle')->nullable()->after('formationProfessionnelle');
        });
    }

    public function down()
    {
        Schema::table('employes', function (Blueprint $table) {
            $table->dropColumn(['formationScolaire', 'formationProfessionnelle', 'qualificationProfessionnelle']);
        });
    }
}