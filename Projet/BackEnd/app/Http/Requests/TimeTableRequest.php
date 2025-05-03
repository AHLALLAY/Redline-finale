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
            'class_room_N' => ['required', 'integer', 'min:1', 'max:50'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i','after:start_time'],
            'subject_school' => ['required', 'string', 'max:100']
        ];
    }
}