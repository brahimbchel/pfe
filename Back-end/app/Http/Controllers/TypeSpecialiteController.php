<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TypeSpecialite;
use Illuminate\Http\JsonResponse;



class TypeSpecialiteController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        $validatedData = $request->validate(['NomSpecialite' => 'required|string|max:255']);
        $typeSpecialite = TypeSpecialite::create($validatedData);
        return response()->json([
            'message' => 'Une nouvelle specialité ajoutée.',
        ], 201);
    }

    public function getAll(): JsonResponse
    {
        return response()->json(TypeSpecialite::all(), 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validatedData = $request->validate(['NomSpecialite' => 'required|string|max:255unique:type_specialites,nomSpecialite']);
        $typeSpecialite = TypeSpecialite::findOrFail($id);
        $typeSpecialite->update($validatedData);
        return response()->json(['message' => 'Spécialité renommé.'], 200);
    }

    public function delete($id): JsonResponse
    {
        $typeSpecialite = TypeSpecialite::findOrFail($id);
        $typeSpecialite->delete();
        return response()->json(['message' => 'Spécialité supprimé.'], 200);
    }
}