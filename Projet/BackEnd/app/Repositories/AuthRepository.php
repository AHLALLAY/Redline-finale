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

    public function registerStaff(array $staffData)
    {
        try {
            $staffData['password'] = Hash::make($staffData['password']);
            return User::create($staffData);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function loginStaff(array $credentials)
    {
        try {
            Auth::guard('api')->attempt($credentials);

            if (!$token = JWTAuth::attempt($credentials)) {
                return null;
            }

            $staff = Auth::user();
            if (!$staff) {
                throw new Exception("Staff not found!");
            }

            $staffWithDetails = User::where('users.id', $staff->id)
                ->leftJoin('classes as c', 'users.id', '=', 'c.teacher_id')
                ->leftJoin('subjects as s', 'users.subject_id', '=', 's.id')
                ->select('users.*', 'c.level', 'c.group', 's.nom as subject_name')
                ->first();

            return [
                'staff' => $staffWithDetails,
                'token' => $token,
                'token_type' => 'bearer',
            ];
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function registerStudent(array $studentData)
    {
        try {
            $studentData['password'] = Hash::make($studentData['password']);
            return Student::create($studentData);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function loginStudent(array $credentials)
    {
        try {
            Auth::guard('student')->attempt([
                'email' => $credentials['email'],
                'password' => $credentials['password']
            ]);

            $student = Student::where('email', $credentials['email'])->first();

            if (!$student) {
                return null;
            }

            $token = JWTAuth::fromUser($student);

            return [
                'student' => $student,
                'token' => $token,
                'token_type' => 'bearer',
            ];
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function logout()
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
