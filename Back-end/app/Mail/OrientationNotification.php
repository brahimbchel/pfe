<?php
namespace App\Mail;

use App\Models\Medecin;
use App\Models\Employe;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrientationNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $employe;
    public $medecin;
    public $motif;
    public $specialite;

    public function __construct(Employe $employe, Medecin $medecin, string $specialite, string $motif)
    {
        $this->employe = $employe;
        $this->medecin = $medecin;
        $this->motif = $motif;
        $this->specialite = $specialite;
    }

    public function build()
{
    return $this->subject('Nouvelle Orientation')
                ->to($this->employe->utilisateur->email)
                ->view('emails.orientation_notification');
}

}