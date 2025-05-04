<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TimeTableRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'class_id' => ['required', 'integer', 'min:1','exists:classes,id'],
            'teacher_id' => ['required', 'integer', 'exists:users,id'],
            'day_of_week' => ['required', 'string', 'in:Lundi,Mardi,Mercredi,Jeudi,Vendredi'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i','after:start_time'],
        ];
    }
}