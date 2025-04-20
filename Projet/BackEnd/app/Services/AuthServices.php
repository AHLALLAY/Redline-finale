<?php

namespace App\Services;

use App\Interfaces\AuthInterface;

class AuthService
{
    protected $authRepository;

    public function __construct(AuthInterface $authRepository)
    {
        return $this->authRepository = $authRepository;
    }

    public function RegisterStaff($dataStaff)
    {
        return $this->authRepository->RegisterStaff($dataStaff);
    }

    public function LoginStaff($identStaff)
    {
        return $this->authRepository->LoginStaff($identStaff);
    }

    public function RegisterStudent($dataStudent)
    {
        return $this->authRepository->RegisterStudent($dataStudent);
    }
    public function LoginStudent($identStudent)
    {
        return $this->authRepository->LoginStudent($identStudent);
    }

    public function Logout()
    {
        return $this->authRepository->Logout();
    }
}
