<?php

namespace App\Console\Commands;

use App\Notifications\VisiteCallBack;
use Illuminate\Console\Command;
use App\Models\Visite;
use Carbon\Carbon;
class CallBackVisiteCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'visite:rappel';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'envoi rappele 1jr avant le jour j ';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $demain = Carbon::tomorrow()->format('Y-m-d');

        $visites = Visite::with('employe')->whereDate('dateVisite', $demain)->get();

        foreach ($visites as $visite) {
            $visite->employe?->notify(new VisiteCallBack($visite->dateVisite));
        }

        $this->info('Rappels envoyés avec succès.');
    }
}
