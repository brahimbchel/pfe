<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orientation extends Model
{
    use HasFactory;

    protected $fillable = ['medecin_id', 'employe_id', 'specialite_id', 'motif'];

    public function medecin()
    {
        return $this->belongsTo(medecin::class, 'medecin_id');
    }

    public function employe()
    {
        return $this->belongsTo(employe::class, 'employe_id');
    }

    public function TypeSpecialite()
    {
        return $this->belongsTo(TypeSpecialite::class, 'specialite_id');
    }
}