<?php

namespace App\Repositories;

use App\Interfaces\StudentInterface;
use App\Models\Exercice;
use App\Models\Grade;
use App\Models\Student;

class StudentRepository implements StudentInterface {
    public function getGrades(int $studentId)
    {
        try{
            return Grade::where('student_id', $studentId)->get();
        }catch(\Exception $e){
            throw $e;
        }
    }

    public function getExercises(int $classId)
    {
        try{
            return Exercice::where('class_id', $classId)->get();
        }catch(\Exception $e){
            throw $e;
        }
    }

    public function getStudentDetails(int $studentId)
    {
        try{
            return Student::where('id', $studentId)->get();
        }catch(\Exception $e){
            throw $e;
        }
    }
}
