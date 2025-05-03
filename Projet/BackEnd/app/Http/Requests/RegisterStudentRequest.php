<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterStudentRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:70', 'unique:students'],
            'password' => ['required', 'string', 'min:8'],
            'birth_date' => ['required', 'date', 'before:-6 years'],
            'birth_place' => ['required', 'string', 'max:50'],
            'gender' => ['required', 'in:Masculin,Féminin'],
            'class_id' => ['required', 'min:1', 'exists:classes,id'],
            'parent_name' => ['required', 'string', 'max:50'],
            'parent_cin' => ['required', 'string', 'max:9'],
            'address' => ['required', 'string', 'max:150'],
            'phone' => ['required', 'string', 'regex:/^(\+212|0)[\s\-\.]?[5-7][\s\-\.]?\d{2}[\s\-\.]?\d{2}[\s\-\.]?\d{2}[\s\-\.]?\d{2}$/'],
            'decision' => ['nullable', 'string', 'in:success,failed,excluded'],
            'is_deleted' => ['nullable', 'boolean'],
        ];
    }
}
