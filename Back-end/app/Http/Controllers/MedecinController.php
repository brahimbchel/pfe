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
            'nomConjoint' => $medecin->utilisateur->nomConjoint,
            'prenom' => $medecin->utilisateur->prenom,
            'email' => $medecin->utilisateur->email,
            'numTelephone' => $medecin->utilisateur->numTelephone,
            'dateNaissance' => $medecin->utilisateur->dateNaissance,
            'lieuNaissance' => $medecin->utilisateur->lieuNaissance,
            'wilayaNaissance' => $medecin->utilisateur->wilayaNaissance,
            'sexe' => $medecin->utilisateur->sexe,
            'nationalite' => $medecin->utilisateur->nationalite,
            'specialite' => $medecin->TypeSpecialite->NomSpecialite,
            'adresse' => $medecin->utilisateur->adresse,
            'wilaya' => $medecin->utilisateur->wilayaNaissance,
            'adresseService' => $medecin->adresseService,
            'created_at' => $medecin->created_at,
            'updated_at' => $medecin->updated_at,
            ];
        });

        return response()->json($formattedMedecins, 200);
    }

    //-----------AJOUT D'UN MEDECIN -----------------------------------------------------

    public function store(Request $request): JsonResponse
    {
        // Utiliser une transaction pour s'assurer que les deux créations réussissent ou échouent ensemble
        return \DB::transaction(function () use ($request) {
            
            try {
                $typeSpecialite = TypeSpecialite::where('NomSpecialite', $request->typeSpecialite)->firstOrFail();
            } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
                return response()->json(['message' => 'Type de spécialité non trouvé.'], 404);
            }
            
            $userData = $request->only([
                'nom', 'nomConjoint', 'prenom', 'email', 'numTelephone', 
                'dateNaissance', 'lieuNaissance', 
                'wilayaNaissance', 'adresse', 'wilaya', 'sexe', 
                'nationalite'
            ]);
            
            // Ajouter nomConjoint et motDePasse séparément
            $userData['motDePasse'] = bcrypt($request->motDePasse);
            
            $utilisateur = Utilisateur::create($userData);
            
            // Créer le médecin
            $medecin = Medecin::create([
                'utilisateur_id' => $utilisateur->id,
                'typeSpecialite_id' => $typeSpecialite->id,
                'adresseService' => $request->adresseService,
            ]);
    
            return response()->json(['message' => 'Medecin creé avec succès.'], 201);
        });
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

        $medecin->utilisateur->update($request->only([
            'nom', 'nomConjoint', 'prenom', 'email', 'numTelephone',
            'dateNaissance', 'lieuNaissance', 'wilayaNaissance',
            'adresse','wilaya',
            'sexe', 'nationalite'
        ]));

        $medecin->update($request->only(['adresseService' , 'specialite']));

        return response()->json(['message' => 'Médecin mis à jour avec succès'], 200);
    }

    //-----------SUPPRESSION D'UN MEDECIN ------------------------------------------------

    public function destroy($id): JsonResponse
    {
        $medecin = Medecin::with('utilisateur')->findOrFail($id);

        $medecin->utilisateur->delete();
        $medecin->delete();

        return response()->json(['message' => 'Médecin supprimé avec succès.'], 200);
    }

    //------------AFFICHAGE DE TOUTES LES SPECIALITES ------------------------------------

    public function getSpecialites(): JsonResponse
    {
        $specialites = TypeSpecialite::all(); // Récupérer toutes les spécialités

        return response()->json($specialites, 200);
    }
}