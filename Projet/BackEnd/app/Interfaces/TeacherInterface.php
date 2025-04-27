<?php

namespace App\Interfaces;

interface TeacherInterface
{
    // activities
    public function AddExercice($exerciceData);
    public function AddActivityToTextBox($activityData);
    
    // student
    public function DisplayMyStudents($students);
    public function AddAbsence($absnceData);
    public function AddGrade($gradeData);

    // educational document
    
}

