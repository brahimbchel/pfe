<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use App\Models\Medecin;
use App\Models\TypeSpecialite;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class MedecinController extends Controller
{
    //------------AFFICHAGE DE TOUS LES MEDECINS -----------------------------------------

    public function index(): JsonResponse
    {
        $medecins = Medecin::with('utilisateur')->get();

        $formattedMedecins = $medecins->map(function ($medecin) {
            return [
            'id' => $medecin->id,
            'nom' => $medecin->utilisateur->nom,
            'prenom' => $medecin->utilisateur->prenom,
            'specialite' => $medecin->TypeSpecialite->NomSpecialite,
            'adresseService' => $medecin->adresseService,
            'statut' => $medecin->utilisateur->statut
            ];
        });

        return response()->json($formattedMedecins, 200);
    }

    //-----------AJOUT D'UN MEDECIN -----------------------------------------------------

    public function store(Request $request)
    {
        
        // Si masculin, forcer nomConjoint à null
        if ($request->sexe === 'masculin') {
            $request->merge(['nomConjoint' => null]);
        }
        
        // Si féminin, vérifier que nomConjoint est présent
        if ($request->sexe === 'féminin' && !$request->nomConjoint) {
            return response()->json(['error' => 'Le champ nom de conjoint est requis pour les employées féminines.'], 422);
        }
        
        try {
            $typeSpecialite = TypeSpecialite::where('NomSpecialite', $request->typeSpecialite)->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Type de spécialité non trouvé.'], 404);
        }
            // Créer l'utilisateur avant de créer le médecin
            $utilisateur = Utilisateur::create(array_merge($request->only([
                'nom', 'prenom', 'nomConjoint', 'email', 'numTelephone', 
                'dateNaissance', 'lieuNaissance', 
                'wilayaNaissance', 'adresse','wilaya', 'sexe', 
                'nationalite','statut'
            ]), ['motDePasse' => bcrypt($request->motDePasse)]));

            $medecin = Medecin::create([
                'utilisateur_id' => $utilisateur->id,
                'typeSpecialite_id' => $typeSpecialite->id,
                'adresseService' => $request->adresseService,
            ]);
        
            return response()->json(['message' => 'Le medecin est créé avec succès'], 201);
    }

    //-----------VOIR UN MEDECIN --------------------------------------------------------

    public function show($id): JsonResponse
    {
        $medecin = Medecin::with('utilisateur')->findOrFail($id);

        return response()->json([
            'id' => $medecin->id,
            'nom' => $medecin->utilisateur->nom,
            'nomConjoint' => $medecin->utilisateur->nomConjoint,
            'prenom' => $medecin->utilisateur->prenom,
            'email' => $medecin->utilisateur->email,
            'numTelephone' => $medecin->utilisateur->numTelephone,
            'dateNaissance' => $medecin->utilisateur->dateNaissance,
            'lieuNaissance' => $medecin->utilisateur->lieuNaissance,
            'wilayaNaissance' => $medecin->utilisateur->wilayaNaissance,
            'adresse' => $medecin->utilisateur->adresse,
            'wilaya' => $medecin->utilisateur->wilaya,
            'sexe' => $medecin->utilisateur->sexe,
            'nationalite' => $medecin->utilisateur->nationalite,
            'statut' => $medecin->utilisateur->statut,
            'specialite' => $medecin->TypeSpecialite->NomSpecialite,
            'adresse' => $medecin->utilisateur->adresse,
            'adresseService' => $medecin->adresseService,
            'created_at' => $medecin->created_at,
            'updated_at' => $medecin->updated_at,
        ], 200);
    }

    //-----------MODIFICATION D'UN MEDECIN -----------------------------------------------

    public function update(Request $request, $id): JsonResponse
    {
        $medecin = Medecin::with('utilisateur')->findOrFail($id);

        // Si masculin, forcer nomConjoint à null
        if ($request->sexe === 'masculin') {
            $request->merge(['nomConjoint' => null]);
        }
        
        // Si féminin, vérifier que nomConjoint est présent
        if ($request->sexe === 'féminin' && !$request->nomConjoint) {
            return response()->json(['error' => 'Le champ nom de conjoint est requis pour les employées féminines.'], 422);
        }
        
        try {
            $typeSpecialite = TypeSpecialite::where('NomSpecialite', $request->typeSpecialite)->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Type de spécialité non trouvé.'], 404);
        }

        $medecin->utilisateur->update($request->only([
            'nom', 'nomConjoint', 'prenom', 'email', 'numTelephone',
            'dateNaissance', 'lieuNaissance', 'wilayaNaissance',
            'adresse','wilaya','statut',
            'sexe', 'nationalite'
        ]));

        $medecin->update([
            'adresseService' => $request->adresseService,
            'typeSpecialite_id' => $typeSpecialite->id
        ]);

        return response()->json(['message' => 'Médecin mis à jour'], 200);
    }

        //-----------BLOCGE D'UN ADMIN -----------------------------------------------------

    public function block($id): JsonResponse
    {
            $medecin = Medecin::with('utilisateur')->findOrFail($id);
        
            // Vérifier si le médecin est déjà bloqué
            if ($medecin->utilisateur->blocked_at !== null) {
                return response()->json(['error' => 'Ce médecin est déjà bloqué.'], 422);
            }
        
            // Bloquer le médecin
            $medecin->utilisateur->update([
                'blocked_at' => now(),
                'statut' => 'bloqué',
            ]);
        
            return response()->json(['message' => 'Médecin bloqué avec succès.'], 200);
    }
    
    public function unblock($id): JsonResponse
    {
            $medecin = Medecin::with('utilisateur')->findOrFail($id);
        
            // Vérifier si le médecin est bloqué
            if ($medecin->utilisateur->blocked_at === null) {
                return response()->json(['error' => 'Ce médecin n\'est pas bloqué.'], 422);
            }
        
            // Débloquer le médecin
            $medecin->utilisateur->update([
                'blocked_at' => null,
                'statut' => 'actif',
            ]);
        
            return response()->json(['message' => 'Médecin débloqué avec succès.'], 200);
    }
}
