<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'numTelephone',
        'motDePasse',
        'dateNaissance',
        'lieuNaissance',
        'wilayaNaissance',
        'adresse',
        'sexe',
        'nationalite',
    ];

    public function role()
    {
        return $this->morphTo();
    }
}