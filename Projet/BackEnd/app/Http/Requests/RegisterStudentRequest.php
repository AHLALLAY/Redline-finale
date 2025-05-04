<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterStudentRequest extends FormRequest
{
     public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:70', 'unique:students'],
            'password' => ['required', 'string', 'min:8'],
            'birth_date' => ['required', 'date', 'before:-6 years'],
            'birth_place' => ['required', 'string', 'max:50'],
            'gender' => ['required', 'in:Masculin,Féminin'],
            'level' => ['required', 'string', 'in:1ére année,2ème année,3ème année,4ème année,5ème année,6ème année'],
            'group' => ['required', 'string', 'max:1', 'in:A,B,C,D'],
            'parent_name' => ['required', 'string', 'max:50'],
            'parent_cin' => ['required', 'string', 'max:9'],
            'address' => ['required', 'string', 'max:150'],
            'phone' => ['required', 'string', 'regex:/^(\+212|0)[\s\-\.]?[5-7][\s\-\.]?\d{2}[\s\-\.]?\d{2}[\s\-\.]?\d{2}[\s\-\.]?\d{2}$/'],
            'decision' => ['nullable', 'string', 'in:progress,success,failed,excluded'],
            'is_deleted' => ['nullable', 'boolean'],
        ];
    }
}
