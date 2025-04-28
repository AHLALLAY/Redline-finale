<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TimeTableRequest extends FormRequest
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
            'level' => ['required', 'string', 'in:1ére année,2ème année,3ème année,4ème année,5ème année,6ème année'],
            'group' => ['required', 'string', 'in:A,B,C,D'],
            'class_room_N' => ['required', 'integer', 'min:1', 'max:50'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i','after:start_time'],
            'subject_school' => ['required', 'string', 'max:100']
        ];
    }
}