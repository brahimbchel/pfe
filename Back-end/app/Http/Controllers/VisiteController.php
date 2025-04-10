<?php

namespace App\Http\Controllers;

use App\Models\Visite;
use App\Enums\TypesVisitesEnum;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


    class VisiteController extends Controller
    {
        
        public function store(Request $request): JsonResponse
        {
            try {
                // Obtenir les valeurs de l'énumération
                $typesVisite = implode(',', TypesVisitesEnum::getValues());
        
                $validatedData = $request->validate([
                    'dateVisite' => 'required|date',
                    'MedecinId' => 'required|exists:medecins,id',
                    'EmployeId' => 'required|exists:employes,id',
                    'type' => 'required|in:' . $typesVisite,
                    'cms_id' => 'required|exists:cms,id',
                ]);
        
                // Création de la visite
                Visite::create($validatedData);
        
                return response()->json([
                    'message' => 'Visite planifiée avec succès.',
                ], 201);
            } catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json([
                    'message' => 'Erreur de validation.',
                    'errors' => $e->validator->errors(),
                ], 422);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Une erreur est survenue lors de la planification.',
                    'error' => $e->getMessage(),
                ], 500);
            }
        }

        //----------------------------------------------------------
        
        public function update(Request $request, $id): JsonResponse
        {
            try {
                $typesVisite = implode(',', TypesVisitesEnum::getValues());
        
                $validatedData = $request->validate([
                    'dateVisite' => 'required|date',
                    'MedecinId' => 'required|exists:medecins,id',
                    'EmployeId' => 'required|exists:employes,id',
                    'type' => 'required|in:' . $typesVisite,
                    'cms_id' => 'required|exists:cms,id',
                ]);
        
                $visite = Visite::findOrFail($id);
                $visite->update($validatedData);
        
                return response()->json([
                    'message' => 'Visite mise à jour avec succès.',
                ]);
            } catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json([
                    'message' => 'Erreur de validation.',
                    'errors' => $e->validator->errors(),
                ], 422);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Une erreur est survenue lors de la mise à jour.',
                    'error' => $e->getMessage(),
                ], 500);
            }
        }

        //----------------------------------------------------------

        public function destroy($id): JsonResponse
        {
            try {
                $visite = Visite::findOrFail($id);
                $visite->delete();
        
                return response()->json([
                    'message' => 'Visite supprimée avec succès.',
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Une erreur est survenue lors de la suppression.',
                    'error' => $e->getMessage(),
                ], 500);
            }
        }

        //----------------------------------------------------------

        public function show($id): JsonResponse
        {
            // Récupération de la visite avec les relations nécessaires
            $visite = Visite::with(['medecin', 'employe'])->find($id);

            // Vérification si la visite existe
            if (!$visite) {
                return response()->json(['message' => 'Visite non trouvée.'], 404);
            }

            // Formatage de la réponse
            $response = [
                'id' => $visite->id,
                'dateVisite' => $visite->dateVisite,
                'type' => $visite->type,
                'cms_id' => $visite->cms_id,
                'prescriptions' => $visite->prescriptions,
                'observations' => $visite->observations,
                'medecin_nom' => $visite->medecin->utilisateur->nom,
                'medecin_prenom' => $visite->medecin->utilisateur->prenom,
                'medecin_numTelephone' => $visite->medecin->utilisateur->numTelephone,
                'specialite' => $visite->medecin->TypeSpecialite->NomSpecialite,
                'employe_nom' =>$visite->employe->utilisateur->nom,
                'employe_prenom' => $visite->employe->utilisateur->prenom,
                'employe_numTelephone' => $visite->employe->utilisateur->numTelephone,
                'employe_departement' => $visite->employe->departement,
                'employe_poste' => $visite->employe->utilisateur->poste,
            ];

            return response()->json($response, 200);
        }

        //----------------------------------------------------------

        public function index(): JsonResponse
        {
            // Récupération de toutes les visites avec les relations nécessaires
            $visites = Visite::with(['medecin', 'employe'])->get();
    
            // Formatage de la réponse
            $response = $visites->map(function ($visite) {
                return [
                   'id' => $visite->id,
                'dateVisite' => $visite->dateVisite,
                'type' => $visite->type,
                'cms_id' => $visite->cms_id,
                'prescriptions' => $visite->prescriptions,
                'observations' => $visite->observations,
                'medecin_nom' => $visite->medecin->utilisateur->nom,
                'medecin_prenom' => $visite->medecin->utilisateur->prenom,
                'medecin_numTelephone' => $visite->medecin->utilisateur->numTelephone,
                'specialite' => $visite->medecin->TypeSpecialite->NomSpecialite,
                'employe_nom' => $visite->employe->utilisateur->nom,
                'employe_prenom' => $visite->employe->utilisateur->prenom,
                'employe_numTelephone' => $visite->employe->utilisateur->numTelephone,
                'employe_departement' => $visite->employe->departement,
                'employe_poste' => $visite->employe->utilisateur->poste,
                ];
            });
    
            return response()->json($response, 200);
        }

        //----------------------------------------------------------

        public function updateObservations(Request $request, $id): JsonResponse
        {
            $validatedData = $request->validate([
                'observations' => 'required|string|max:500',
            ]);
        
            $visite = Visite::find($id);
        
            if (!$visite) {
                return response()->json(['message' => 'Visite non trouvée.'], 404);
            }
        
            $visite->observations = $validatedData['observations'];
            $visite->save();
        
            return response()->json(['message' => 'Observations mises à jour avec succès.'], 200);
        }

        //----------------------------------------------------------

        public function updatePrescriptions(Request $request, $id): JsonResponse
        {
            $validatedData = $request->validate([
                'prescriptions' => 'required|string|max:500',
            ]);
        
            $visite = Visite::find($id);
        
            if (!$visite) {
                return response()->json(['message' => 'Visite non trouvée.'], 404);
            }
        
            $visite->prescriptions = $validatedData['prescriptions'];
            $visite->save();
        
            return response()->json(['message' => 'Prescriptions mises à jour avec succès.'], 200);
        }

        //----------------------------------------------------------

        public function historiqueVisitesMedecin($id): JsonResponse
        {
            $visites = Visite::where('medecinId', $id)
                             ->where('dateVisite', '<', now())
                             ->get();
            return response()->json($visites, 200);
        }

        public function visitesFuturesMedecin($id): JsonResponse
        {
            $visites = Visite::where('medecinId', $id)
                             ->where('dateVisite', '>=', now())
                             ->get();
            return response()->json($visites, 200);
        }

        public function historiqueVisitesEmploye($id): JsonResponse
        {
            $visites = Visite::where('employeId', $id)
                             ->where('dateVisite', '<', now())
                             ->get();
            return response()->json($visites, 200);
        }

        public function visitesFuturesEmploye($id): JsonResponse
        {
            $visites = Visite::where('employeId', $id)
                             ->where('dateVisite', '>=', now())
                             ->get();
            return response()->json($visites, 200);
        }
}
