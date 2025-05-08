<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClasseRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'level' => ['required', 'in:1ére année,2ème année,3ème année,4ème année,5ème année,6ème année'],
            'group' => ['required', 'string' ,'size:1','in:A,B,C,D'],
            'teacher_id' => ['required', 'integer', 'exists:users,id'],
            'academic_year' => ['required', 'integer', 'digits:4']
        ];
    }
}
