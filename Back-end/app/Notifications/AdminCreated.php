<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminCreated extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public string $email, public ?string $password = null)
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
        ->subject('Creation de compte')
        ->greeting('Bonjour ' . $notifiable->prenom . ' !')
        ->line('Votre compte en tant que admin a été créé avec succès.')
        ->line('Email : ' . $this->email)
        ->when($this->password, function ($message) {
            $message->line('Mot de passe : ' . $this->password);
        })
        ->action('Se connecter', url('/login'))
        ->salutation('Cordialement');
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
