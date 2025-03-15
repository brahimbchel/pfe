<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DossierMedical extends Model
{
    use HasFactory;

    protected $fillable = [
        'employe_id',
        'nom',
        'description',
    ];

    public function employe()
    {
        return $this->belongsTo(Employe::class);
    }
}