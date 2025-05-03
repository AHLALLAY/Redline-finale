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

    public function __construct(AuthService $authService){$this->authService = $authService;}

    public function loginStaff(LoginStaffRequest $loginStaffRequest)
    {
        try {
            $validated_data = $loginStaffRequest->validated();
            $data = $this->authService->loginStaff($validated_data);

            if ($data === null) {
                return response()->json([
                    'message' => 'Identifiants invalides',
                    'status' => 'error'
                ], 401);
            }

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

    public function loginStudent(LoginStudentRequest $loginStudentRequest)
    {
        try {
            $validated_data = $loginStudentRequest->validated();
            $data = $this->authService->loginStudent($validated_data);

            if ($data === null) {
                return response()->json([
                    'message' => 'Identifiants invalides',
                    'status' => 'error'
                ], 401);
            }

            return response()->json([
                'message' => 'Connexion réussie',
                'data' => $data,
                'status' => 'success'
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

    public function registerStaff(RegisterStaffRequest $registerStaffRequest)
    {
        try {
            $validated_data = $registerStaffRequest->validated();
            $user = $this->authService->registerStaff($validated_data);

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

    public function registerStudent(RegisterStudentRequest $registerStudentRequest)
    {
        try {
            $validated_data = $registerStudentRequest->validated();
            $user = $this->authService->registerStudent($validated_data);

            return response()->json([
                'message' => 'Élève enregistré avec succès',
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

    public function logout()
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