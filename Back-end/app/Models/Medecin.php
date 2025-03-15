<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medecin extends Utilisateur
{
    use HasFactory;

    protected $fillable = [
        'typeSpecialite_id',
        'adresseService',
    ];

    public function typeSpecialite()
    {
        return $this->belongsTo(TypeSpecialite::class);
    }

    public function disponibilites()
    {
        return $this->hasMany(MedecinDisponibilite::class);
    }
}