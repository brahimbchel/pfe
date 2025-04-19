<?php

namespace App\Http\Controllers;
use App\Models\Employe;
use Illuminate\Http\Request;
use App\Models\Administrateur; 
class NotificationController extends Controller
{
    public function index($employeId)
{
    // Récupérer les notifications pour un employé donné
    $employe = Employe::find($employeId);

    if (!$employe) {
        return response()->json(['message' => 'Employé non trouvé'], 404);
    }

    $notifications = $employe->notifications;

    return response()->json($notifications);
}

}
