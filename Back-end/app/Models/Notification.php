<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'idDestinataire',
        'idAuteur',
        'sujet',
        'message',
        'dateNotification',
    ];

    public function destinataire()
    {
        return $this->belongsTo(Employe::class, 'idDestinataire');
    }

    public function auteur()
    {
        return $this->belongsTo(Administrateur::class, 'idAuteur');
    }
}