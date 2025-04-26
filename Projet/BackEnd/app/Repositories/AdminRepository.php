<?php


namespace App\Repositories;

use App\Interfaces\AdminInterface;
use App\Models\Student;
use App\Models\User;

class AdminRepository implements AdminInterface
{

    // staff
    public function AddStaff($staff) {}
    public function DisplayStaff()
    {
        try {
            return User::all();
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function SuspendStaff($staff) {}
    public function DeleteStaff($staff) {}
    public function AssignClasse($classe, $to) {}
    public function AssignGarde($time, $to) {}

    // student
    public function DisplayStudents()
    {
        try{
            return Student::all();
        }catch(\Exception $e){
            throw $e;
        }
    }
    public function DisplayAbsences() {}

    // auther
    public function AddOffre($offre) {}
}