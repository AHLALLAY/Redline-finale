<?php

namespace App\Interfaces;

interface TeacherInterface
{
    // Activitis
    public function addExercise(array $exerciseData);
    public function markExerciseAsDone(int $exerciseId);
    public function addTextBoxActivity(array $activityData);
    
    // Students
    public function getClasses(int $teacherId);
    public function getStudentsByLevelAndGroup(int $classId);
    public function recordAbsence(array $absenceData);
    public function addGrade(array $gradeData);

    // Educational document

    // Autre
    public function getTimeTable(int $teacherId);
}

