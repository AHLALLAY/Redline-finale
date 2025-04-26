<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TextBoxRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:50'],
            'type' => ['required', 'string', 'in:Cours,Evaluation'],
            'description' => ['required', 'string', 'max:250'],
            'teacher_id' => ['required', 'integer', 'exists:users,id,role,Enseignant'],
        ];
    }
}
