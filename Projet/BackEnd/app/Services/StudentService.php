<?php

namespace App\Services;

use App\Interfaces\StudentInterface;

class StudentService{

    protected $studentrepository;

    public function __construct(StudentInterface $studentrepository) { $this->studentrepository = $studentrepository; }

    public function getGrades($studentId){ $this->studentrepository->getGrades($studentId); }
    public function getExrcises($classId){ $this->studentrepository->getExercises($classId); }
    
}