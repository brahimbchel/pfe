<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeSpecialite extends Model
{
    use HasFactory;

    protected $fillable = [
        'NomSpecialite',
    ];

    public function medecins()
    {
        return $this->hasMany(Medecin::class);
    }
}