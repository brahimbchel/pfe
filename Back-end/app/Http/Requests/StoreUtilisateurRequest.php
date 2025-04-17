<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUtilisateurRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'nomConjoint' => 'nullable|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'numTelephone' => 'required|unique:utilisateurs,numTelephone|regex:/^[0-9]{10}$/',
            'motDePasse' => 'required|string|min:8',
<<<<<<< HEAD
            'dateNaissance' => 'required|date',
            'lieuNaissance' => 'required|string|max:255',
            'wilayaNaissance' => 'required|in:' . implode(',', WilayaEnum::getAllWilayas()),
            'adresse' => 'required|string|max:255',
            'sexe' => 'required|in:masculin,féminin',
            'nationalite' => 'required|string|max:255',
=======
            'dateNaissance' => 'nullable|date',
            'lieuNaissance' => 'nullable|string|max:255',
            'wilayaNaissance' => 'nullable|in:' . implode(',', WilayaEnum::getAllWilayas()),
            'sexe' => 'required|in:masculin,féminin',
            'adresse' => 'nullable|string|max:255',
            'wilaya' => 'nullable|in:' . implode(',', WilayaEnum::getAllWilayas()),
            'nationalite' => 'nullable|string|max:255',
>>>>>>> origin/Back-end-main
        ];
    }
}
