<?php
namespace App\Services;

use App\Repositories\TeacherRepository;

class TeacherService {

    protected $teacherRepository;

    public function __construct(TeacherRepository $teacherRepository){
        $this->teacherRepository = $teacherRepository;
    }

    // activities
    public function AddExercice($exerciceData) { return $this->teacherRepository->AddExercice($exerciceData); }
    public function AddActivityToTextBox($activityData) { return $this->teacherRepository->AddActivityToTextBox($activityData); }

    // student
    public function DisplayMyStudents($students) { return $this->teacherRepository->DisplayMyStudents($students); }
    public function AddAbsence($absnceData) { return $this->teacherRepository->AddAbsence($absnceData); }
    public function AddGrade($gradeData) { return $this->teacherRepository->AddGrade($gradeData); }
}