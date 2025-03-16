<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVisiteRequest extends FormRequest
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
            'employe_id' => 'required|exists:employes,id',
            'aptitudeDeTravail' => 'required|in:apte,inapteTemporaire,inapteDefinitif',
            'description' => 'nullable|string',
        ];
    }
}
