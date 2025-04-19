<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use App\Models\Employe;
use App\Models\DossierMedical;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class EmployeController extends Controller
{

    //------------AFFICHAGE DE TOUT LES EMPLOYEES ------------------------------------------

    public function index(): JsonResponse
    {
        // Récupérer tous les employés avec les memes id utilisateurs
        $employes = Employe::with('utilisateur')->get();

        // Transformer la réponse pour fusionner les attributs 
        $formattedEmployes = $employes->map(function ($employe) {
            
            $data = $employe->only([
                'id', 'matricule', 'poste', 
                'departement'
            ]);

            // Ajouter les attributs de l'utilisateur
            $data['nom'] = $employe->utilisateur->nom;
            $data['prenom'] = $employe->utilisateur->prenom;
            $data['statut'] = $employe->utilisateur->statut;
            
            return $data;
        });

        return response()->json($formattedEmployes, 200);
    }
        
    //-----------AJOUT D'UN EMPLOYE --------------------------------------------------------

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

    // Utiliser une transaction
    return DB::transaction(function () use ($request) {
        // Vérifier le type de spécialité
        try {
            $typeSpecialite = TypeSpecialite::where('NomSpecialite', $request->typeSpecialite)->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Type de spécialité non trouvé.'], 404);
        }

        // Créer l'utilisateur
        $utilisateur = Utilisateur::create(array_merge($request->only([
            'nom', 'prenom', 'nomConjoint', 'email', 'numTelephone', 
            'dateNaissance', 'lieuNaissance', 
            'wilayaNaissance', 'adresse', 'wilaya', 'sexe', 
            'nationalite'
        ]), ['motDePasse' => bcrypt($request->motDePasse)]));

        // Créer le médecin
        $medecin = Medecin::create([
            'utilisateur_id' => $utilisateur->id,
            'typeSpecialite_id' => $typeSpecialite->id,
            'adresseService' => $request->adresseService,
        ]);

        return response()->json(['message' => 'Le médecin est créé avec succès'], 201);
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
            'statut' => $employe->utilisateur->statut,
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
            'nationalite', 'statut'
        ]));
    
        // Mettre à jour les informations de l'employé
        $employe->update($request->only([
            'matricule', 'fonction', 'poste', 
            'departement', 'situationFamille', 
            'groupeSanguin', 'rh', 'formationScolaire', 
            'formationProfessionnelle', 'qualificationProfessionnelle', 
            'numSecuSocial'
        ]));
    
        return response()->json(['message' => 'Employé modifié avec succès.'], 200);
    }

    //-----------SUPPRISSION D'UN EMPLOYE --------------------------------------------------
    
    public function block($id): JsonResponse
    {
        $employe = Employe::with('utilisateur')->findOrFail($id);

        // Vérifier si l'employé est déjà bloqué
        if ($employe->utilisateur->blocked_at !== null) {
            return response()->json(['error' => 'Cet employé est déjà bloqué.'], 422);
        }

        // Bloquer l'employé
        $employe->utilisateur->update([
            'blocked_at' => now(),
            'statut' => 'bloqué',
        ]);

        return response()->json(['message' => 'Employé bloqué avec succès.'], 200);
    }

    public function unblock($id): JsonResponse
    {
        $employe = Employe::with('utilisateur')->findOrFail($id);

        // Vérifier si l'employé est bloqué
        if ($employe->utilisateur->blocked_at === null) {
            return response()->json(['error' => 'Cet employé n\'est pas bloqué.'], 422);
        }

        // Débloquer l'employé
        $employe->utilisateur->update([
            'blocked_at' => null,
            'statut' => 'actif',
        ]);

        return response()->json(['message' => 'Employé débloqué avec succès.'], 200);
    }
}