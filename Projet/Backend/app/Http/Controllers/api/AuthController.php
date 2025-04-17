<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => ['required', 'string', 'max:50'],
                'email' => ['required', 'string', 'email:rfc,dns', 'max:60', 'unique:users'],
                'password' => ['required', 'string', 'min:8', 'max:10'],
                'roles' => ['required', 'string', 'in:Enseignant(e),Secrétaire,Comptable'],
                'birth_date' => ['required', 'date', 'before_or_equal:' . now()->subYears(18)->format('Y-m-d')]
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'roles' => $validatedData['roles'],
                'birth_date' => $validatedData['birth_date']
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json([
                'success' => true,
                'message' => 'Inscription réussie',
                'user' => $user,
                'token' => $token,
                'token_type' => 'bearer'
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email', 'string', 'max:60', 'exists:users,email'],
                'password' => ['required', 'string', 'min:8']
            ]);
            
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Email ou mot de passe incorrect',
                ], 401);
            }
    
            $user = JWTAuth::user();
    
            return response()->json([
                'message' => 'Connexion réussie',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email
                ],
                'token' => $token,
                'token_type' => 'bearer'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->validator->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la connexion',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
}
