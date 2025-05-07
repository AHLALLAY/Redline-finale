<?php
namespace App\Services;

use App\Repositories\TeacherRepository;

class TeacherService {

    protected $teacherRepository;

    public function __construct(TeacherRepository $teacherRepository){
        $this->teacherRepository = $teacherRepository;
    }

    // activities
    public function addExercise($exerciseData) { return $this->teacherRepository->addExercise($exerciseData); }
    public function markExerciseAsDone($exerciceId) { return $this->teacherRepository->markExerciseAsDone($exerciceId); }
    public function addTextBoxActivity($activityData) { return $this->teacherRepository->addTextBoxActivity($activityData); }

    // student
    public function getClasses($teacherId){ return $this->teacherRepository->getClasses($teacherId); }
    public function getStudentsByLevelAndGroup($classId) { return $this->teacherRepository->getStudentsByLevelAndGroup($classId); }
    public function recordAbsence($absnceData) { return $this->teacherRepository->recordAbsence($absnceData); }
    public function addGrade($gradeData) { return $this->teacherRepository->addGrade($gradeData); }
}