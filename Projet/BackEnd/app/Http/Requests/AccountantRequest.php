<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccountantRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'description' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'between:0,999999.99'],
            'type' => ['required', 'string', 'in:Dépense,Revenu'],
            'reference_number' => ['required', 'string', 'max:50', 'unique:transactions'],
            'entity_name' => ['required', 'string', 'max:255'],
            'entity_type' => ['required', 'string', 'in:Etudiant,Personnel,Fournisseur,Autre'],
            'recorded_by' => ['nullable', 'integer']
        ];
    }
}
