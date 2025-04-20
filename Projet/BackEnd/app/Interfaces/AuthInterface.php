<?php

namespace App\Interfaces;

interface AuthInterface
{
    // staff
    public function RegisterStaff($dataStaff);
    public function LoginStaff($identStaff);

    // student
    public function RegisterStudent($dataStudent);
    public function LoginStudent($identStudent);

    // commun
    public function Logout();
}
