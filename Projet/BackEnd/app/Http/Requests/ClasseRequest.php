<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClasseRequest extends FormRequest
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
            'niveau' => ['required', 'in:1ére année,2ème année,3ème année,4ème année,5ème année,6ème année'],
            'group' => ['required', 'in:A,B,C,D'],
            'teacher' => ['required', 'integer', 'exists:users,id']
        ];
    }
}
