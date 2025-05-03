<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OfferRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:100'],
            'description'=> ['required', 'string', 'max:1000'],
            'contract_type'=> ['required', 'in:Stage,CDI,CDD'],
            'is_active'=> ['required', 'boolean'],
            'created_by'=> ['required', 'integer', 'exists:users,id']
        ];
    }
}
