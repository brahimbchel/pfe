<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use App\Models\Employe;
use App\Models\DossierMedical;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Notifications\EmployeCreated;
use App\Notifications\EmployeDeleted;

class EmployeController extends Controller
{

    //------------AFFICHAGE DE TOUT LES EMPLOYEES ------------------------------------------

    public function index(): JsonResponse
    {
        // Récupérer tous les employés avec les memes id utilisateurs
        $employes = Employe::with('utilisateur')->get();

        // Transformer la réponse pour fusionner les attributs 
        $formattedEmployes = $employes->map(function ($employe) {
            // Créer un tableau avec les attributs de l'employé
            $data = $employe->only([
                'id', 'matricule', 'poste', 
                'departement','statutEmploye'
            ]);

            // Ajouter les attributs de l'utilisateur
            $data['nom'] = $employe->utilisateur->nom;
            $data['prenom'] = $employe->utilisateur->prenom;
            // Retourner les données sans l'objet utilisateur
            return $data;
        });

        return response()->json($formattedEmployes, 200);
    }
        
    //-----------AJOUT D'UN EMPLOYE --------------------------------------------------------

    public function store(Request $request): JsonResponse
    {
     // Utiliser une transaction pour s'assurer que les deux créations réussissent ou échouent ensemble
     return DB::transaction(function () use ($request) 
     {
        // Si l'employé est masculin, forcer nomConjoint à null
        if ($request->sexe === 'masculin') {
             $request->merge(['nomConjoint' => null]);
        }

         // Si l'employé est féminin, vérifier que nomConjoint est présent
        if ($request->sexe === 'féminin' && !$request->nomConjoint) {
             return response()->json(['error' => 'Le champ nomConjoint est requis pour les employées féminines.'], 422);
        }

        // Créer l'utilisateur
        $utilisateur = Utilisateur::create(array_merge($request->only([
            'nom', 'nomConjoint', 'prenom', 'email', 'numTelephone', 
            'dateNaissance', 'lieuNaissance', 
            'wilayaNaissance', 'adresse', 'wilaya', 'sexe', 
            'nationalite'
        ]), [
            'motDePasse' => bcrypt($request->motDePasse),
            'nomConjoint' => $request->nomConjoint ?? null  // Add this line to ensure nomConjoint is either the provided value or null
        ]));

        $employe = Employe::create(array_merge($request->only([
            'matricule', 'fonction', 'poste', 
            'departement', 'situationFamille', 
            'groupeSanguin', 'rh', 'formationScolaire',
            'formationProfessionnelle', 'qualificationProfessionnelle', 
            'numSecuSocial', 'serviceNational', 'statutEmploye'
        ]), ['utilisateur_id' => $utilisateur->id]));

        $dossierMedical = DossierMedical::create([
            'matricule' => $employe->matricule,
            'aptitudeDeTravail' => 'apte', // Valeur par défaut
            'notes' => 'Dossier médical créé',
        ]);
        $utilisateur->notify(new EmployeCreated($request->email, $request->motDePasse));
        return response()->json(['message' => 'Employé creé avec succès.'], 201);
        });
    }

    //-----------VOIR UN EMPLOYE -----------------------------------------------------------

    public function show($id): JsonResponse
    {
        $employe = Employe::with('utilisateur')->findOrFail($id);
    
        // Créer une réponse avec tous les attributs
        $response = [
            'id' => $employe->id,
            'nom' => $employe->utilisateur->nom,
            'nomConjoint' => $employe->utilisateur->nomConjoint,
            'prenom' => $employe->utilisateur->prenom,
            'email' => $employe->utilisateur->email,
            'numTelephone' => $employe->utilisateur->numTelephone,
            'matricule' => $employe->matricule,
            'dateNaissance' => $employe->utilisateur->dateNaissance,
            'lieuNaissance' => $employe->utilisateur->lieuNaissance,
            'wilayaNaissance' => $employe->utilisateur->wilayaNaissance,
            'adresse' => $employe->utilisateur->adresse,
            'wilaya' => $employe->utilisateur->wilaya,
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
            'serviceNational' => $employe->serviceNational,
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
        
        // Si l'employé est masculin, forcer nomConjoint à null
        if ($request->sexe === 'masculin') {
            $request->merge(['nomConjoint' => null]);
        }

        // Si l'employé est féminin, vérifier que nomConjoint est présent
        if ($request->sexe === 'féminin' && !$request->nomConjoint) {
            return response()->json(['error' => 'Le champ nomConjoint est requis pour les employées féminines.'], 422);
        }
        
        // Mettre à jour les informations de l'utilisateur
        $employe->utilisateur->update($request->only([
            'nom', 'nomConjoint', 'prenom', 'email', 'numTelephone', 
            'dateNaissance', 'lieuNaissance', 
            'wilayaNaissance', 'adresse','wilaya', 'sexe', 
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
    
        return response()->json(['message' => 'Employé modifié avec succès.'], 200);
    }

    //-----------SUPPRISSION D'UN EMPLOYE --------------------------------------------------
    
    public function destroy($id): JsonResponse
    {
        $employe = Employe::with('utilisateur')->findOrFail($id);

        // Supprimer l'utilisateur associé
        $employe->utilisateur->delete();
    
        // Supprimer l'employé
        $employe->delete();
        if ($employe->utilisateur && $employe->utilisateur->email) {
            $employe->utilisateur->notify(new EmployeDeleted($employe));}
        // Retourner une réponse de succès
        return response()->json(['message' => 'Employé supprimé avec succès.'], 200);
    }
}