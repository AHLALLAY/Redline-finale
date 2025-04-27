<?php

namespace App\Repositories;

use App\Interfaces\TeacherInterface;
use App\Models\Exercice;
use App\Models\Student;

class TeacherRepository implements TeacherInterface
{
    // activities
    public function AddExercice($exerciceData)
    {
        try {
            return Exercice::create($exerciceData);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    public function AddActivityToTextBox($activityData) {}

    // student
    public function DisplayMyStudents($level, $group) {
        try{
            return Student::where('level', $level)->where('group', $group)->get();
        }catch(\Exception $e){
            return $e->getMessage();
        }
    }
    public function AddAbsence($absnceData) {}
    public function AddGrade($gradeData) {}
}
