<?php

namespace App\Repositories;

use App\Models\User;
use App\Interfaces\AuthInterface;
use App\Models\Student;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthRepository implements AuthInterface
{
    public function RegisterStaff($dataStaff)
    {
        try {
            $dataStaff['password'] = Hash::make($dataStaff['password']);
            return User::create($dataStaff);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function LoginStaff($identStaff)
    {
        try {
            // Spécifier le garde pour le personnel
            Auth::guard('web')->attempt($identStaff);
            
            if (!$token = JWTAuth::attempt($identStaff)) {
                return null;
            }
            
            $staff = Auth::user();
            if (!$staff) {
                throw new Exception("Staff not found !!!");
            } else {
                return [
                    'staff' => $staff,
                    'token' => $token,
                    'token_type' => 'bearer',
                ];
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function RegisterStudent($dataStudent)
    {
        try {
            $dataStudent['password'] = Hash::make($dataStudent['password']);
            return Student::create($dataStudent);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function LoginStudent($identStudent)
    {
        try {
            Auth::guard('student')->attempt([
                'email' => $identStudent['email'],
                'password' => $identStudent['password']
            ]);
    
            $student = Student::where('email', $identStudent['email'])->first();
            
            if (!$student) {
                return null;
            }
            
            $token = JWTAuth::fromUser($student);
            
            return [
                'student' => $student,
                'token' => $token,
                'token_type' => 'bearer',
            ];
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function Logout()
    {
        try {
            Auth::logout();
            if (JWTAuth::getToken()) {
                JWTAuth::invalidate(JWTAuth::getToken());
            }
            return true;
        } catch (Exception $e) {
            throw new Exception('Logout failed: ' . $e->getMessage());
        }
    }
}