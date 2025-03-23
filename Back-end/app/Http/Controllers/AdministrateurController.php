<?php

namespace App\Http\Controllers;

use App\Models\Administrateur;
use Illuminate\Http\Request;

class AdministrateurController extends Controller
{
    public function index() {
        return Administrateur::all();
    }

    public function store(Request $request) {
        $administrateur = Administrateur::create($request->all());
        return response()->json($administrateur, 201);
    }

    public function show($id) {
        return Administrateur::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $administrateur = Administrateur::findOrFail($id);
        $administrateur->update($request->all());
        return response()->json($administrateur);
    }

    public function destroy($id) {
        Administrateur::destroy($id);
        return response()->json(null, 204);
    }
}