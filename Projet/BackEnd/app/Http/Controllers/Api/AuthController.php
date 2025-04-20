<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginStaffRequest;
use App\Http\Requests\LoginStudentRequest;
use App\Services\AuthService;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function LoginStaff(LoginStaffRequest $loginStudentRequest)
    {
        try {
            $validated_data = $loginStudentRequest->validated();
            $data = $this->authService->LoginStaff($validated_data);

            return response()->json([
                'message' => 'Connexion réussie',
                'data' => $data
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
                'status' => 'error'
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Échec de la connexion',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }

    public function LoginStudent(LoginStudentRequest $loginStudentRequest)
    {
        try {
            $validated_data = $loginStudentRequest->validated();
            $data = $this->authService->LoginStudent($validated_data);

            return response()->json([
                'message' => 'Connexion réussie',
                'data' => $data
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
                'status' => 'error'
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Échec de la connexion',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }
}
