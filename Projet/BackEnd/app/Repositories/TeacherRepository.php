<?php

namespace App\Repositories;

use App\Interfaces\TeacherInterface;
use App\Models\Exercice;

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
    public function DisplayMyStudents($students) {}
    public function AddAbsence($absnceData) {}
    public function AddGrade($gradeData) {}
}
