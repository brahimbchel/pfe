<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrateur extends utilisateur
{
    use HasFactory;

    protected $fillable = [
        'utilisateur_id',
    ];
}
