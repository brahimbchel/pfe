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
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'numTelephone' => 'required|regex:/^[0-9]{10}$/',
            'motDePasse' => 'required|string|min:8',
            'dateNaissance' => 'required|date',
            'lieuNaissance' => 'required|string|max:255',
            'wilayaNaissance' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'sexe' => 'required|in:masculin,féminin',
            'nationalite' => 'required|string|max:255',
        ];
    }
}
