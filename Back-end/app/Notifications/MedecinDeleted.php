<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MedecinDeleted extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public $medecin)
    {
        $this->medecin = $medecin ;
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
        ->subject('compte bloque ')
        ->greeting('Bonjour ' . $notifiable->prenom . ' !')
        ->line('Votre compte en tant que medecin a été bloqué .')
        ->action('Voir les détails', url('/employes'))
        ->salutation('Cordialement,');
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
