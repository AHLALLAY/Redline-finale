<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TextBoxRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:50'],
            'type' => ['required', 'string', 'in:Cours,Evaluation'],
            'description' => ['required', 'string', 'max:250'],
            'teacher_id' => ['required', 'integer', 'exists:users,id,role,Enseignant'],
            'class_id' => ['required', 'integer', 'exists:classes,id'],
        ];
    }
}
