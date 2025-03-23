<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use App\Models\Employe;
use Illuminate\Http\JsonResponse;


class EmployeController extends Controller
{

    ////--------AFFICHAGE DE TOUT LES EMPLOYEES ---------------------------------------

    public function index(): JsonResponse
    {
        // Récupérer tous les employés avec les memes id utilisateurs
        $employes = Employe::with('utilisateur')->get();

        // Transformer la réponse pour fusionner les attributs 
        $formattedEmployes = $employes->map(function ($employe) {
            // Créer un tableau avec les attributs de l'employé
            $data = $employe->only([
                'id', 'matricule', 'fonction', 'poste', 
                'departement', 'situationFamille', 'groupeSanguin', 
                'rh', 'formationScolaire', 'formationProfessionnelle', 
                'qualificationProfessionnelle', 'numSecuSocial', 
                'statutEmploye', 'created_at', 'updated_at'
            ]);

            // Ajouter les attributs de l'utilisateur
            $data['nom'] = $employe->utilisateur->nom;
            $data['prenom'] = $employe->utilisateur->prenom;
            $data['email'] = $employe->utilisateur->email;
            $data['numTelephone'] = $employe->utilisateur->numTelephone;
            $data['dateNaissance'] = $employe->utilisateur->dateNaissance;
            $data['lieuNaissance'] = $employe->utilisateur->lieuNaissance;
            $data['wilayaNaissance'] = $employe->utilisateur->wilayaNaissance;
            $data['adresse'] = $employe->utilisateur->adresse;
            $data['sexe'] = $employe->utilisateur->sexe;
            $data['nationalite'] = $employe->utilisateur->nationalite;

            // Retourner les données sans l'objet utilisateur
            return $data;
        });

        return response()->json($formattedEmployes, 200);
    }

        
    //--------AJOUT D'UN EMPLOYE ----------------------------------------------------------

    public function store(Request $request): JsonResponse
    {
     // Utiliser une transaction pour s'assurer que les deux créations réussissent ou échouent ensemble
     return \DB::transaction(function () use ($request) 
     {
        // Créer l'utilisateur
        $utilisateur = Utilisateur::create(array_merge($request->only([
            'nom', 'prenom', 'email', 'numTelephone', 
            'dateNaissance', 'lieuNaissance', 
            'wilayaNaissance', 'adresse', 'sexe', 
            'nationalite'
        ]), ['motDePasse' => bcrypt($request->motDePasse)]));

        // Créer l'employé avec le même ID
        $employe = Employe::create(array_merge($request->only([
            'matricule', 'fonction', 'poste', 
            'departement', 'situationFamille', 
            'groupeSanguin', 'rh', 'formationScolaire', 
            'formationProfessionnelle', 'qualificationProfessionnelle', 
            'numSecuSocial', 'statutEmploye'
        ]), ['utilisateur_id' => $utilisateur->id]));

        // Créer une réponse avec tous les attributs
        $response = [
            'id' => $employe->id,
            'matricule' => $employe->matricule,
            'fonction' => $employe->fonction,
            'poste' => $employe->poste,
            'departement' => $employe->departement,
            'situationFamille' => $employe->situationFamille,
            'groupeSanguin' => $employe->groupeSanguin,
            'rh' => $employe->rh,
            'formationScolaire' => $employe->formationScolaire,
            'formationProfessionnelle' => $employe->formationProfessionnelle,
            'qualificationProfessionnelle' => $employe->qualificationProfessionnelle,
            'numSecuSocial' => $employe->numSecuSocial,
            'statutEmploye' => $employe->statutEmploye,
            'nom' => $utilisateur->nom,
            'prenom' => $utilisateur->prenom,
            'email' => $utilisateur->email,
            'numTelephone' => $utilisateur->numTelephone,
            'dateNaissance' => $utilisateur->dateNaissance,
            'lieuNaissance' => $utilisateur->lieuNaissance,
            'wilayaNaissance' => $utilisateur->wilayaNaissance,
            'adresse' => $utilisateur->adresse,
            'sexe' => $utilisateur->sexe,
            'nationalite' => $utilisateur->nationalite,
            'created_at' => $employe->created_at,
            'updated_at' => $employe->updated_at,
        ];

             return response()->json($response, 201);
        });
    }

    //-----------VOIR UN EMPLOYE ----------------------------------------------------------

    public function show($id): JsonResponse
    {
        $employe = Employe::with('utilisateur')->findOrFail($id);
    
        // Créer une réponse avec tous les attributs
        $response = [
            'id' => $employe->id,
            'nom' => $employe->utilisateur->nom,
            'prenom' => $employe->utilisateur->prenom,
            'email' => $employe->utilisateur->email,
            'numTelephone' => $employe->utilisateur->numTelephone,
            'matricule' => $employe->matricule,
            'dateNaissance' => $employe->utilisateur->dateNaissance,
            'lieuNaissance' => $employe->utilisateur->lieuNaissance,
            'wilayaNaissance' => $employe->utilisateur->wilayaNaissance,
            'adresse' => $employe->utilisateur->adresse,
            'sexe' => $employe->utilisateur->sexe,
            'nationalite' => $employe->utilisateur->nationalite,
            'fonction' => $employe->fonction,
            'poste' => $employe->poste,
            'departement' => $employe->departement,
            'situationFamille' => $employe->situationFamille,
            'groupeSanguin' => $employe->groupeSanguin,
            'rh' => $employe->rh,
            'formationScolaire' => $employe->formationScolaire,
            'formationProfessionnelle' => $employe->formationProfessionnelle,
            'qualificationProfessionnelle' => $employe->qualificationProfessionnelle,
            'numSecuSocial' => $employe->numSecuSocial,
            'statutEmploye' => $employe->statutEmploye,
            'created_at' => $employe->created_at,
            'updated_at' => $employe->updated_at,
        ];
    
        return response()->json($response, 200);
    }


    //-----------MODIFICATION D'UN EMPLOYE ------------------------------------------------

    public function update(Request $request, $id): JsonResponse
    {
        $employe = Employe::with('utilisateur')->findOrFail($id);
    
        // Mettre à jour les informations de l'utilisateur
        $employe->utilisateur->update($request->only([
            'nom', 'prenom', 'email', 'numTelephone', 
            'dateNaissance', 'lieuNaissance', 
            'wilayaNaissance', 'adresse', 'sexe', 
            'nationalite'
        ]));
    
        // Mettre à jour les informations de l'employé
        $employe->update($request->only([
            'matricule', 'fonction', 'poste', 
            'departement', 'situationFamille', 
            'groupeSanguin', 'rh', 'formationScolaire', 
            'formationProfessionnelle', 'qualificationProfessionnelle', 
            'numSecuSocial', 'statutEmploye'
        ]));
    
        // Créer une réponse avec tous les attributs au même niveau
        $response = [
            'id' => $employe->id,
            'matricule' => $employe->matricule,
            'fonction' => $employe->fonction,
            'poste' => $employe->poste,
            'departement' => $employe->departement,
            'situationFamille' => $employe->situationFamille,
            'groupeSanguin' => $employe->groupeSanguin,
            'rh' => $employe->rh,
            'formationScolaire' => $employe->formationScolaire,
            'formationProfessionnelle' => $employe->formationProfessionnelle,
            'qualificationProfessionnelle' => $employe->qualificationProfessionnelle,
            'numSecuSocial' => $employe->numSecuSocial,
            'statutEmploye' => $employe->statutEmploye,
            'nom' => $employe->utilisateur->nom,
            'prenom' => $employe->utilisateur->prenom,
            'email' => $employe->utilisateur->email,
            'numTelephone' => $employe->utilisateur->numTelephone,
            'dateNaissance' => $employe->utilisateur->dateNaissance,
            'lieuNaissance' => $employe->utilisateur->lieuNaissance,
            'wilayaNaissance' => $employe->utilisateur->wilayaNaissance,
            'adresse' => $employe->utilisateur->adresse,
            'sexe' => $employe->utilisateur->sexe,
            'nationalite' => $employe->utilisateur->nationalite,
            'created_at' => $employe->created_at,
            'updated_at' => $employe->updated_at,
        ];
    
        return response()->json($response, 200);
    }


    //-----------SUPPRISSION D'UN EMPLOYE --------------------------------------------------
    
    public function destroy($id): JsonResponse
    {
        $employe = Employe::with('utilisateur')->findOrFail($id);

        // Supprimer l'utilisateur associé
        $employe->utilisateur->delete();
    
        // Supprimer l'employé
        $employe->delete();
    
        // Retourner une réponse de succès
        return response()->json(['message' => 'Employé supprimé avec succès.'], 200);
    }
}