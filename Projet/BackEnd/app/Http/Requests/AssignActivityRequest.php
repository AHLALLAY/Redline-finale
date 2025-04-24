<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignActivityRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string', 'max:200'],
            'date' => ['required', 'date'],
            'classe' => ['required', 'string', 'in:1ére année, 2ème année, 3ème année, 4ème année, 5ème année, 6ème année'],
            'group' => ['required', 'integer', 'between:1,10'],
            'teacher_id' => ['required', 'integer', 'exists:teachers,id'],
            'is_done' => ['required', 'boolean'],
            'done_at' => ['nullable', 'date', 'required_if:is_done,true']
        ];
    }
}
