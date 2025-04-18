<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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
                'roles' => ['required', 'string', 'in:Enseignant,Secrétaire,Comptable'],
                'birth_date' => ['required', 'date']
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'roles' => $validatedData['roles'],
                'birth_date' => $validatedData['birth_date']
            ]);


            return response()->json([
                'message' => 'Inscription réussie',
                'user' => $user
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
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
                'user' => $user,
                'token' => $token,
                'token_type' => 'bearer'
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de la connexion',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function logout() {
        try {
            
            if (!JWTAuth::check()) {
                return response()->json([
                    "message" => "No authenticated user to log out"
                ], 401);
            }
            
            $token = JWTAuth::getToken() ?? request()->bearerToken();
            
            if ($token) {
                JWTAuth::setToken($token)->invalidate();
            }
            
            Auth::logout();
            
            return response()->json([
                "message" => "Successfully logged out"
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Unexpected Error (Logout failed)",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
