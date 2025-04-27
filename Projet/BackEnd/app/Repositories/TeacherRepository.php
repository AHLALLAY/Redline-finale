<?php

namespace App\Repositories;

use App\Interfaces\TeacherInterface;
use App\Models\Absence;
use App\Models\Exercice;
use App\Models\Grade;
use App\Models\Student;
use App\Models\TextBox;

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
    public function ExerciceDone($exerciceId)
    {
        try{
            $exercice = Exercice::findOrFail($exerciceId);
            $exercice->is_done = true;
            $exercice->done_at = now();
            return $exercice->save();
        }catch(\Exception $e){
            throw $e;
        }
    }
    public function AddActivityToTextBox($activityData) {
        try{
            return TextBox::create($activityData);
        }catch(\Exception $e){
            throw $e;
        }
    }

    // student
    public function DisplayMyStudents($level, $group) {
        try{
            return Student::where('level', $level)->where('group', $group)->get();
        }catch(\Exception $e){
            return $e->getMessage();
        }
    }
    public function AddAbsence($absnceData) {
        try{
            return Absence::create($absnceData);
        }catch(\Exception $e){
            throw $e;
        }
    }
    public function AddGrade($gradeData) {
        try{
            return Grade::create($gradeData);
        }catch(\Exception $e){
            throw $e;
        }
    }
}
