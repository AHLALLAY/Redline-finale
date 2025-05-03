<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExerciceRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string', 'max:200'],
            'teacher_id' => ['required', 'integer', 'exists:users,id,role,Enseignant'],
            'class_id' => ['required', 'integer'],
            'is_done' => ['required', 'boolean'],
            'done_at' => ['nullable', 'date', 'required_if:is_done,true']
        ];
    }
}
