<?php


namespace App\Repositories;

use App\Interfaces\AdminInterface;
use App\Models\Student;
use App\Models\User;

class AdminRepository implements AdminInterface{

    public function DisplayStaff(){
        try{
            return User::all();
        }catch(\Exception $e){
            throw $e;
        }
        
    }
    public function DisplayStudents(){
        try{
            return Student::all();
        }catch(\Exception $e){
            throw $e;
        }
    }
    public function DisplayAbsences(){
        
    }
}