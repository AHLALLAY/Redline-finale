<?php
namespace App\Repositories;

use App\Interfaces\AbsenceInterface;
use App\Models\Absence;

class AbsenceRepository implements AbsenceInterface{
    public function AddAbsence($data)
    {
        try{
            return Absence::create($data);
        }catch(\Exception $e){
            throw $e;
        }
    }
    
}