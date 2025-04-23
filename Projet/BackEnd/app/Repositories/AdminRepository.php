<?php


namespace App\Repositories;

use App\Models\User;

class AdminRepository {

    public function DisplayStaff(){
        try{
            return User::all();
        }catch(\Exception $e){
            throw $e;
        }
        
    }
    public function DisplayStudents(){
        
    }
    public function DisplayAbsences(){
        
    }
}