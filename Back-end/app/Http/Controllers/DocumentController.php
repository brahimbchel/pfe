<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Employe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DocumentController extends Controller
{

    public function index(): JsonResponse
{
        
        $documents = Document::with(['employe:id,matricule', 'typeDocument:id,nomTypeDocument'])->get()
            ->map(function ($document) {
                return [
                    'id' => $document->id,
                    'Matricule' => $document->employe->matricule ?? null,
                    'nomDocument' => $document->nomDocument,
                    'TypeDocument' => $document->typeDocument->nomTypeDocument ?? null,
                    'lien' => $document->lien,
                    'created_at' => $document->created_at,
                    'updated_at' => $document->updated_at,
                ];
            });
    
        return response()->json($documents, 200);
}

    public function show($employe_id): JsonResponse
{
    // Récupère les documents de l'employé avec le nom du type de document
    $documents = Document::with(['typeDocument:id,nomTypeDocument'])
        ->where('EmployeId', $employe_id)
        ->get()
        ->map(function ($document) {
            return [
                'id' => $document->id,
                'nomDocument' => $document->nomDocument,
                'TypeDocument' => $document->typeDocument->nomTypeDocument ?? null, // nom du type de document
                'lien' => $document->lien,
                'created_at' => $document->created_at,
                'updated_at' => $document->updated_at,
            ];
        });

    if ($documents->isEmpty()) {
        return response()->json(['message' => 'Aucun document trouvé pour cet employé.'], 404);
    }

    return response()->json($documents, 200);
}

    // Méthode pour créer un document
    public function store(Request $request): JsonResponse
{
    try {
        $validatedData = $request->validate([
            'EmployeId' => 'required|exists:employes,id',
            'nomDocument' => 'required|string|max:255',
            'lien' => 'required|string|max:255',
            'typeDocument_id' => 'required|exists:type_documents,id',
        ]);

        Document::create($validatedData);

        return response()->json([
            'message' => 'Document créé avec succès.'
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur lors de la création du document.',
            'error' => $e->getMessage()
        ], 500);
    }
}

    // Méthode pour mettre à jour un document
    public function update(Request $request, $id): JsonResponse
{
    try {
        $document = Document::findOrFail($id); // Trouve le document ou renvoie une erreur 404

        $validatedData = $request->validate([
            'nomDocument' => 'sometimes|required|string|max:255',
            'lien' => 'sometimes|required|string|max:255',
            'typeDocument_id' => 'sometimes|required|exists:type_documents,id',
        ]);

        $document->update($validatedData);

        return response()->json([
            'message' => 'Document modifié avec succès.'
        ], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'message' => 'Document non trouvé.'
        ], 404);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur lors de la mise à jour du document.',
            'error' => $e->getMessage()
        ], 500);
    }
}

    // Méthode pour supprimer un document
    public function destroy($id): JsonResponse
{
        $document = Document::find($id);

        if (!$document) {
            return response()->json(['message' => 'Document non trouvé.'], 404);
        }

        $document->delete();
        return response()->json(['message' => 'Document supprimé avec succès.'], 204);
}

public function documentsEmploye($id): JsonResponse
{
    // Vérifiez si l'employé existe
    $employe = Employe::find($id);
    
    if (!$employe) {
        return response()->json(['message' => 'Employé non trouvé.'], 404);
    }

    // Récupérez les documents associés à cet employé avec le type de document
    $documents = Document::with(['typeDocument:id,nomTypeDocument'])
        ->where('employeId', $id)
        ->get()
        ->map(function ($document) {
            return [
                'id' => $document->id,
                'nomDocument' => $document->nomDocument,
                'TypeDocument' => $document->typeDocument->nomTypeDocument ?? null, // nom du type de document
                'lien' => $document->lien,
                'created_at' => $document->created_at,
                'updated_at' => $document->updated_at,
            ];
        });

    return response()->json($documents, 200);
}
}