<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterStaffRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:70', 'unique:users'],
            'cin' => ['required', 'string', 'max:9'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'in:Enseignant,Comptable,Secrétaire,Admin'],
            'birth_date' => ['required', 'date', 'before:-18 years'],
            'phone' => ['required', 'string', 'regex:/^(\+212|0)[\s\-\.]?[5-7][\s\-\.]?\d{2}[\s\-\.]?\d{2}[\s\-\.]?\d{2}[\s\-\.]?\d{2}$/'],
            'last_diploma' =>['required', 'string'],
            'obtained_at' => ['required','date'],
            'subject_id' => ['required','integer', 'min:1', 'exists:subjects:id'],
            'teaching_level' => ['required','in:1ére année,2ème année,3ème année,4ème année,5ème année,6ème année'],
            'is_suspended' => ['required','boolean'],
            'is_deleted' => ['required','boolean'],
        ];
    }
}
