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
        
    }

    public function LoginStaff($identStaff)
    {
        
    }

    public function RegisterStudent($dataStudent)
    {
        
    }

    public function LoginStudent($identStudent)
    {
        
    }

    public function Logout()
    {
        
    }
}
