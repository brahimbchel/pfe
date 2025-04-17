<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests\StoreAdministrateurRequest;
use App\Models\Administrateur;
use App\Models\Utilisateur;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AdministrateurController extends Controller
{

    //-----------AFFICHAGE DE TOUT LES ADMINS ----------------------------------------------

    public function index(): JsonResponse
    {
        $administrateurs = Administrateur::with('utilisateur')->get();

        $formattedAdministrateurs = $administrateurs->map(function ($administrateur) {
            return [
                'nom' => $administrateur->utilisateur->nom,
                'prenom' => $administrateur->utilisateur->prenom,
                'email' => $administrateur->utilisateur->email,
                'numTelephone' => $administrateur->utilisateur->numTelephone,
                'statut' => $administrateur->utilisateur->statut
            ];
        });

        return response()->json($formattedAdministrateurs, 200);
    }

    //-----------AJOUT D'UN ADMINS ---------------------------------------------------------
    public function store(Request $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {


        // Si masculin, forcer nomConjoint à null
        if ($request->sexe === 'masculin') {
                $request->merge(['nomConjoint' => null]);
        }

        // Si féminin, vérifier que nomConjoint est présent
        if ($request->sexe === 'féminin' && !$request->nomConjoint) {
                return response()->json(['error' => 'Le champ nom de conjoint est requis pour les employées féminines.'], 422);
        }

            $utilisateur = Utilisateur::create(array_merge($request->only([
                'nom', 'prenom', 'nomConjoint', 'email', 'numTelephone', 
                'dateNaissance', 'lieuNaissance', 
                'wilayaNaissance', 'adresse','wilaya', 'sexe', 
                'nationalite','statut'
            ]), ['motDePasse' => bcrypt($request->motDePasse)]));

            $administrateur = Administrateur::create([
                'utilisateur_id' => $utilisateur->id,
            ]);

            return response()->json(['message' => 'Administrateur créé avec succès'], 201);
        });
    }

    //-----------VOIR INFOS D'UN ADMIN-------------------------------------------------------
    public function show($id): JsonResponse
    {
        $administrateur = Administrateur::with('utilisateur')->findOrFail($id);

        return response()->json([
            'id' => $administrateur->id,
            'nom' => $administrateur->utilisateur->nom,
            'prenom' => $administrateur->utilisateur->prenom,
            'nomConjoint' => $administrateur->utilisateur->nomConjoint,
            'email' => $administrateur->utilisateur->email,
            'numTelephone' => $administrateur->utilisateur->numTelephone,
            'dateNaissance' => $administrateur->utilisateur->dateNaissance,
            'lieuNaissance' => $administrateur->utilisateur->lieuNaissance,
            'wilayaNaissance' => $administrateur->utilisateur->wilayaNaissance,
            'adresse' => $administrateur->utilisateur->adresse,
            'wilaya' => $administrateur->utilisateur->wilaya,
            'sexe' => $administrateur->utilisateur->sexe,
            'nationalite' => $administrateur->utilisateur->nationalite,
            'statut' => $administrateur->utilisateur->statut,
            'created_at' => $administrateur->created_at,
            'updated_at' => $administrateur->updated_at,
        ], 200);
    }

    //-----------MODIFICATION D'UN ADMIN -----------------------------------------------------
    public function update(Request $request, $id): JsonResponse
    {
        $administrateur = Administrateur::with('utilisateur')->findOrFail($id);

            // Si masculin, forcer nomConjoint à null
            if ($request->sexe === 'masculin') {
             $request->merge(['nomConjoint' => null]);
            }
            // Si féminin, vérifier que nomConjoint est présent
            if ($request->sexe === 'féminin' && !$request->nomConjoint) {
            return response()->json(['error' => 'Le champ nom de conjoint est requis pour les employées féminines.'], 422);
            }
            
        $administrateur->utilisateur->update($request->only([
            'nom', 'nomConjoint', 'prenom', 'email', 'numTelephone', 
            'dateNaissance', 'lieuNaissance', 'wilayaNaissance',
            'adresse','wilaya','statut',
            'sexe', 'nationalite'
        ]));

        return response()->json(['message' => 'Administrateur mis à jour avec succès'], 200);
    }

    //-----------BLOCKAGE D'UN ADMIN -----------------------------------------------------
    public function block($id): JsonResponse
    {
        $administrateur = Administrateur::with('utilisateur')->findOrFail($id);
    
        // Vérifier si l'administrateur est déjà bloqué
        if ($administrateur->utilisateur->blocked_at !== null) {
            return response()->json(['error' => 'Cet administrateur est déjà bloqué.'], 422);
        }
    
        // Bloquer l'administrateur
        $administrateur->utilisateur->update([
            'blocked_at' => now(),
            'statut' => 'bloqué',
        ]);
    
        return response()->json(['message' => 'Administrateur bloqué avec succès.'], 200);
    }
    
    public function unblock($id): JsonResponse
    {
        $administrateur = Administrateur::with('utilisateur')->findOrFail($id);
    
        // Vérifier si l'administrateur est bloqué
        if ($administrateur->utilisateur->blocked_at === null) {
            return response()->json(['error' => 'Cet administrateur n\'est pas bloqué.'], 422);
        }
    
        // Débloquer l'administrateur
        $administrateur->utilisateur->update([
            'blocked_at' => null,
            'statut' => 'actif',
        ]);
    
        return response()->json(['message' => 'Administrateur débloqué avec succès.'], 200);
    }
}