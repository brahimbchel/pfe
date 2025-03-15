<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeSpecialite extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomTypeSpecialite',
    ];

    public function medecins()
    {
        return $this->hasMany(Medecin::class);
    }
}