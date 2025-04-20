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

    public function RegisterStudent($dataStudent) {}

    public function LoginStudent($identStudent) {}

    public function Logout() {}
}
