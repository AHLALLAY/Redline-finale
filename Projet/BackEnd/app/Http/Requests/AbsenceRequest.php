<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AbsenceRequest extends FormRequest
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
            'student_id' => ['required', 'integer', 'min:1'],
            'status' => ['required', 'in:Présent,Absent,Retard', 'string'],
            'delay' => ['integer'],
            'date' => ['required', 'date'],
            'period' => ['required', 'in:Matin,Après-midi,Journée', 'string'],
            'justification' => ['required', 'in:Non justifié,Justifié,En attente', 'string'],
            'recorded_by' => ['required', 'integer', 'min:1'],
        ];
    }
}
