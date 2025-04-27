<?php
namespace App\Services;

use App\Repositories\TeacherRepository;

class TeacherService {

    protected $teacherRepository;

    public function __construct(TeacherRepository $teacherRepository){
        $this->teacherRepository = $teacherRepository;
    }

    // activities
    public function AddExercice($exerciceData) {}
    public function AddActivityToTextBox($activityData) {}

    // student
    public function DisplayMyStudents($students) {}
    public function AddAbsence($absnceData) {}
    public function AddGrade($gradeData) {}
}