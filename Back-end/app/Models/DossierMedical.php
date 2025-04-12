<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DossierMedical extends Model
{
    use HasFactory;

    protected $table = 'dossiers_medicals';
    protected $fillable = [
        'matricule',
        'aptitudeDeTravail',
    ];

    public function employe()
    {
        return $this->belongsTo(Employe::class, 'matricule', 'matricule');
    }
}