<?php

namespace App\Interfaces;

interface AuthInterface
{
    // Staff
    public function registerStaff(array $staffData);
    public function loginStaff(array $credentials);
    // Students
    public function registerStudent(array $studentData);
    public function loginStudent(array $credentials);
    // Commun
    public function logout();
}
