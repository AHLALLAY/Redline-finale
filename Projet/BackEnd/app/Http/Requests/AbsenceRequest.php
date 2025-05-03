<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AbsenceRequest extends FormRequest
{

    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'student_id' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'in:Présent,Absent,Retard', 'string'],
            'delay_minutes' => ['nullable', 'integer'],
            'date' => ['required', 'date'],
            'period' => ['nullable', 'in:Matin,Après-midi,Journée', 'string'],
            'justification' => ['nullable', 'in:Non justifié,Justifié,En attente', 'string'],
            'recorded_by' => ['required', 'integer', 'min:1'],
        ];
    }
}