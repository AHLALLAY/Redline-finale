<?php

namespace App\Interfaces;

interface TeacherInterface
{
    // Activitis
    public function addExercise(array $exerciseData);
    public function markExerciseAsDone(int $exerciseId);
    public function addTextBoxActivity(array $activityData);
    
    // Students
    public function getStudentsByLevelAndGroup(string $level, string $group);
    public function recordAbsence(array $absenceData);
    public function addGrade(array $gradeData);

    // Educational document
    
}

