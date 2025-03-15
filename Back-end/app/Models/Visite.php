<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visite extends Model
{
    use HasFactory;

    protected $fillable = [
        'dateVisite',
        'MedecinId',
        'EmployeId',
        'type',
        'cms_id',
        'conclusionMedicale',
    ];

    public function medecin()
    {
        return $this->belongsTo(Medecin::class, 'MedecinId');
    }

    public function employe()
    {
        return $this->belongsTo(Employe::class, 'EmployeId');
    }

    public function cms()
    {
        return $this->belongsTo(Cms::class);
    }
}