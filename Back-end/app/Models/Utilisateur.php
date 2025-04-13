<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\WilayaEnum;


class Utilisateur extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'nomConjoint',
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

     // Méthode pour valider la wilaya
     public function setWilayaNaissanceAttribute($value)
     {
         if (!in_array($value, WilayaEnum::getAllWilayas())) {
             throw new \InvalidArgumentException("La wilaya spécifiée n'est pas valide.");
         }
         $this->attributes['wilayaNaissance'] = $value;
     }
}