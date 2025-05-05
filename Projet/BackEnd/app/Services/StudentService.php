<?php

namespace App\Services;

use App\Interfaces\StudentInterface;

class StudentService{

    protected $studentrepository;

    public function __construct(StudentInterface $studentrepository) { $this->studentrepository = $studentrepository; }

    public function getGrades($studentId){ return $this->studentrepository->getGrades($studentId); }
    public function getExrcises($classId){ return $this->studentrepository->getExercises($classId); }
    public function getStudentDetails($studentId){ return $this->studentrepository->getStudentDetails($studentId); }

}