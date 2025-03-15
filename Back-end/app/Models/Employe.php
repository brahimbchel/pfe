<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employe extends Utilisateur
{
    use HasFactory;

    protected $fillable = [
        'matricule',
        'fonction',
        'poste',
        'departement',
        'situationFamille',
        'groupeSanguin',
        'rh',
        'formationScolaire',
        'formationProfessionnelle',
        'qualificationProfessionnelle',
        'numSecuSocial',
        'statutEmploye',
    ];

    public function dossierMedical()
    {
        return $this->hasOne(DossierMedical::class);
    }

    public function visites()
    {
        return $this->hasMany(Visite::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}