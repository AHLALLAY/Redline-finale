<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AccountantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'label' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'decimal'],
            'type' => ['required', 'string', 'in:Charge,Produit'],
            'reference' => ['required', 'string', 'max:50'],
            'client' => ['required', 'integer', 'min:1']
        ];
    }
}
