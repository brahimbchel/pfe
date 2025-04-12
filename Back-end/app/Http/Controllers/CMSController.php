<?php

namespace App\Http\Controllers;

use App\Models\CMS; // Assurez-vous que le modèle est importé
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CMSController extends Controller
{
    public function create(Request $request): JsonResponse
    {
        $validatedData = $request->validate(['nomCMS' => 'required|string|max:255']);
        $cms = CMS::create($validatedData);
        return response()->json(['message' => 'un nouveau centre supprimé avec succès.'], 200);
    }

    public function getAll(): JsonResponse
    {
        return response()->json(CMS::all(), 200);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $validatedData = $request->validate(['nomCMS' => 'required|string|max:255']);
        $cms = CMS::findOrFail($id);
        $cms->update($validatedData);
        return response()->json(['message' => 'centre rennommé.'], 200);
    }

    public function delete($id): JsonResponse
    {
        $cms = CMS::findOrFail($id);
        $cms->delete();
        return response()->json(['message' => 'centre supprimé avec succès.'], 200);
    }
}