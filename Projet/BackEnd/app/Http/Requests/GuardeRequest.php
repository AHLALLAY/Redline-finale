<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardeRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'teacher_id' => ['required','integer','exists:users,id,role,Enseignant'],
            'date' => ['required','date_format:Y-m-d','after_or_equal:today'],
            'start_time' => ['required', 'date_format:H:i']
        ];
    }
}
