<?php

namespace App\Repositories;

use App\Interfaces\ActivitiesInterface;
use App\Models\Exercice;

class ActivityRepository implements ActivitiesInterface{

    public function AssignActivity($activity){
        try{
            return Exercice::create($activity);
        }catch(\Exception $e){
            return $e->getMessage();
        }
    }
    public function AddActivityToTextBox($activity){

    }

    public function AddGrades($grades)
    {
        
    }
}