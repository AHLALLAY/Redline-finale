<?php

namespace App\Services;

use App\Interfaces\AuthInterface;

class AuthService
{
    protected $authRepository;

    public function __construct(AuthInterface $authRepository) { return $this->authRepository = $authRepository; }

    public function registerStaff($dataStaff){return $this->authRepository->registerStaff($dataStaff);}
    public function loginStaff($identStaff){return $this->authRepository->loginStaff($identStaff);}
    public function registerStudent($dataStudent){return $this->authRepository->registerStudent($dataStudent);}
    public function loginStudent($identStudent){return $this->authRepository->loginStudent($identStudent);}
    public function logout(){return $this->authRepository->logout();}
}
