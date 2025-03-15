<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'EmployeId',
        'nomDocument',
        'LienScanne',
        'typeDocument_id',
    ];

    public function employe()
    {
        return $this->belongsTo(Employe::class, 'EmployeId');
    }

    public function typeDocument()
    {
        return $this->belongsTo(TypeDocument::class, 'typeDocument_id');
    }
}