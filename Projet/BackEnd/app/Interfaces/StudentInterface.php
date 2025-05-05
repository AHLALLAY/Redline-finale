<?php

namespace App\Interfaces;

interface StudentInterface
{
    public function getGrades(int $studentId);
    public function getExercises(int $classId);
    public function getStudentDetails(int $studentId);
}
