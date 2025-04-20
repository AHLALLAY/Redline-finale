<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginStaffRequest;
use App\Http\Requests\LoginStudentRequest;
use App\Http\Requests\RegisterStaffRequest;
use App\Http\Requests\RegisterStudentRequest;
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

    public function RegisterStaff(RegisterStaffRequest $registerStaffRequest)
    {
        try {
            $validated_data = $registerStaffRequest->validated();
            $user = $this->authService->RegisterStaff($validated_data);

            return response()->json([
                'message' => $validated_data['role'] . ' enregistré avec succès',
                'user' => $user,
                'status' => 'success'
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
                'status' => 'error'
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'enregistrement',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }

    public function RegisterStudent(RegisterStudentRequest $registerStudentRequest)
    {
        try {
            $validated_data = $registerStudentRequest->validated();
            $user = $this->authService->RegisterStudent($validated_data);

            return response()->json([
                'message' => 'élève enregistré avec succès',
                'user' => $user,
                'status' => 'success'
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
                'status' => 'error'
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'enregistrement',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }

    public function Logout()
    {
        try {
            $logoutResult = $this->authService->logout();

            if (!$logoutResult) {
                return response()->json([
                    "message" => "No authenticated user"
                ], 200);
            }

            return response()->json([
                "message" => "Good bye",
                "success" => true
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Logout failed",
                "error" => $e->getMessage(),
                "success" => false
            ], 500);
        }
    }
}
