<?php

namespace App\Interfaces;

interface TeacherInterface
{
    // activities
    public function AddExercice($exerciceData);
    public function AddActivityToTextBox($activityData);
    
    // student
    public function DisplayMyStudents($level, $groupe);
    public function AddAbsence($absnceData);
    public function AddGrade($gradeData);

    // educational document
    
}

