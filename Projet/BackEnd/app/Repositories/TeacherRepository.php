<?php

namespace App\Repositories;

use App\Interfaces\TeacherInterface;
use App\Models\Absence;
use App\Models\Classe;
use App\Models\Exercice;
use App\Models\Grade;
use App\Models\Student;
use App\Models\TextBox;

class TeacherRepository implements TeacherInterface
{
    public function addExercise(array $exerciseData)
    {
        try {
            return Exercice::create($exerciseData);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function markExerciseAsDone(int $exerciseId)
    {
        try {
            $exercice = Exercice::findOrFail($exerciseId);
            $exercice->is_done = true;
            $exercice->done_at = now();
            return $exercice->save();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function addTextBoxActivity(array $activityData)
    {
        try {
            return TextBox::create($activityData);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function getClasses(int $teacherId){
        try{
            return Classe::where('teacher_id', $teacherId)->get();
        }catch(\Exception $e){
            throw $e;
        }
    }
    public function getStudentsByLevelAndGroup(int $classId)
    {
        try {
            return Student::where('class_id', $classId)->get();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function recordAbsence(array $absenceData)
    {
        try {
            return Absence::create($absenceData);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function addGrade(array $gradeData)
    {
        try {
            return Grade::create($gradeData);
        } catch (\Exception $e) {
            throw $e;
        }
    }
}