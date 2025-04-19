<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medecin extends Utilisateur
{
    use HasFactory;

    protected $fillable = [
        'typeSpecialite_id',
        'utilisateur_id',
        'adresseService'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'utilisateur_id');
    }
    
    public function typeSpecialite()
    {
        return $this->belongsTo(TypeSpecialite::class, 'typeSpecialite_id');
    }

    public function disponibilites()
    {
        return $this->hasMany(MedecinDisponibilite::class);
    }
}