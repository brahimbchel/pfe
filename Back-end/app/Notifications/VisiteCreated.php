<?php

namespace App\Notifications;

use App\Models\Employe;
use App\Models\Visite;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VisiteCreated extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public $visite,public $employe)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('Nouvelle visite planifiée')
        ->greeting('Bonjour ' . $this->employe->utilisateur->prenom . ',')
        ->line('Votre visite médicale a été planifiée pour vous.')
        ->line('📅 Date de la visite : ' . $this->visite->dateVisite)
        ->line('👨‍⚕️ Médecin : ' . $this->visite->medecin->utilisateur->nom . ' ' . $this->visite->medecin->utilisateur->prenom)
        ->line('🏥 a : ' . $this->visite->cms->nomCMS)
        ->line('📌 Type : ' . $this->visite->type)
        ->line('Merci de votre attention.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
