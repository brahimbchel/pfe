<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMedecinRequest extends FormRequest
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
            'typeSpecialite_id' => 'required|exists:type_specialites,id',
            'adresseService' => 'required|string|max:255',
        ];
    }
}
