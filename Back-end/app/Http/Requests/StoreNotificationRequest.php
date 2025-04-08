<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNotificationRequest extends FormRequest
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
            'idDestinataire' => 'required|exists:employes,id',
            'idAuteur' => 'required|exists:administrateurs,id',
            'sujet' => 'required|string|max:255',
            'message' => 'required|string',
            'dateNotification' => 'required|date',
        ];
    }
}
