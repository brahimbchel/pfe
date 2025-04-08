<?php

namespace App\Http\Controllers;

use App\Models\TypeDocument; 
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TypeDocumentController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        $validatedData = $request->validate(['nomTypeDocument' => 'required|string|max:255']);
        $typeDocument = TypeDocument::create($validatedData);
        return response()->json(['message' => 'Un nouveau type de document ajouté'], 200);
    }

    public function getAll(): JsonResponse
    {
        return response()->json(TypeDocument::all(), 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validatedData = $request->validate(['nomTypeDocument' => 'required|string|max:255']);
        $typeDocument = TypeDocument::findOrFail($id);
        $typeDocument->update($validatedData);
        return response()->json(['message' => 'Type de document rennommé'], 200);
    }

    public function delete($id): JsonResponse
    {
        $typeDocument = TypeDocument::findOrFail($id);
        $typeDocument->delete();
        return response()->json(['message' => 'Type de document supprimé'], 200);
    }
}