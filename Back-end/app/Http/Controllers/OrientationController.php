<?php

namespace App\Http\Controllers;

use App\Models\Orientation;
use App\Models\Notification;
use App\Models\Medecin;
use App\Models\Employe;
use App\Models\typeSpecialite;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrientationNotification;

class OrientationController extends Controller
{

    public function store(Request $request): JsonResponse
    {
        
        // Validation des données
        $validatedData = $request->validate([
            'medecin_id' => 'required|exists:medecins,id',
            'employe_id' => 'required|exists:employes,id',
            'specialite_id' => 'required|exists:type_specialites,id',
            'motif' => 'required|string|max:255',
        ]);
    
        // Récupération des entités
        $medecin = Medecin::find($validatedData['medecin_id']);
        $employe = Employe::find($validatedData['employe_id']);
        $specialite = TypeSpecialite::find($validatedData['specialite_id']);
    
        // Création de l'orientation
        $orientation = Orientation::create($validatedData);

        // Envoi de l'email à l'employé
        Mail::to($employe->email)->send(new OrientationNotification($employe, $medecin, $specialite->NomSpecialite, $validatedData['motif']));
    
        return response()->json(['message' => 'Orientation ajouté et une notification est bien envoyée.'], 201);
    }

    public function index()
    {
        $orientations = Orientation::with('employe', 'medecin', 'TypeSpecialite')->orderBy('created_at', 'desc')->get();

        return response()->json($orientations->map(function ($orientation) {
            return [
                'id' => $orientation->id,
                'employe_nom' => $orientation->employe->utilisateur->nom,
                'employe_prenom' => $orientation->employe->utilisateur->prenom,
                'medecin_nom' => $orientation->medecin->utilisateur->nom,
                'medecin_prenom' => $orientation->medecin->utilisateur->prenom,
                'specialite' => $orientation->typeSpecialite->NomSpecialite,
                'created_at' => $orientation->created_at,
            ];
        }));
    }

    public function show($id)
    {
        $orientation = Orientation::with('employe.utilisateur', 'medecin.utilisateur', 'typeSpecialite')->findOrFail($id);
    
        return response()->json([
        
            'id' => $orientation->id,
            'nom' => $orientation->employe->utilisateur->nom,
            'prenom' => $orientation->employe->utilisateur->prenom,
            'email' => $orientation->employe->utilisateur->email,
            'numTelephone' => $orientation->employe->utilisateur->numTelephone,
            'matricule' => $orientation->employe->matricule,
            'adresse' => $orientation->employe->utilisateur->adresse,
            'wilaya' => $orientation->employe->utilisateur->wilaya,
            'poste' => $orientation->employe->poste,
            'departement' => $orientation->employe->departement,
            'statut' => $orientation->employe->utilisateur->statut,
            'nom_medecin' => $orientation->medecin->utilisateur->nom,
            'nomConjoint_medecin' => $orientation->medecin->utilisateur->nomConjoint,
            'prenom_medecin' => $orientation->medecin->utilisateur->prenom,
            'email_medecin' => $orientation->medecin->utilisateur->email,
            'numTelephone_medecin' => $orientation->medecin->utilisateur->numTelephone,
            'specialite_medecin' => $orientation->medecin->TypeSpecialite->NomSpecialite,
            'adresseService' => $orientation->medecin->adresseService,
            'specialite' => $orientation->typeSpecialite->NomSpecialite,
            'motif d\orientation' => $orientation->motif
            ],
  
        );
    }

    public function update(Request $request, $id)
    {
        
        // Validation des données (ajustez les règles selon vos besoins)
        $validatedData = $request->validate([
            'medecin_id' => 'exists:medecins,id',
            'employe_id' => 'exists:employes,id',
            'motif' => 'string|max:255',
            'specialite_id' => 'exists:type_specialites,id',
        ]);
    
        $orientation = Orientation::findOrFail($id);
        $orientation->update($validatedData);
    
        return response()->json([
            'message' => 'Orientation mise à jour.',
        ]);
    }
    
}