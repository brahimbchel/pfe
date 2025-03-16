<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeRequest extends FormRequest
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
    public function rules()
    {
        return [
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'matricule' => 'required|unique:employes',
            'fonction' => 'required|string|max:25',
            'poste' => 'required|string|max:25',
            'departement' => 'required|string|max:20',
            'situationFamille' => 'required|string|max:10',
            'groupeSanguin' => 'required|in:A,B,AB,O',
            'rh' => 'required|in:+,-',
            'formationScolaire' => 'nullable|string|max:255',
            'formationProfessionnelle' => 'nullable|string|max:255',
            'qualificationProfessionnelle' => 'nullable|string|max:255',
            'numSecuSocial' => 'required|regex:/^[0-9]{12}$/',
            'statutEmploye' => 'required|in:actif,inactif',
        ];
    }
}