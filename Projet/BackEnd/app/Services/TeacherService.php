<?php
namespace App\Services;

use App\Repositories\ActivityRepository;
use App\Repositories\TeacherRepository;

class ActivityService {

    protected $activityRepository;

    public function __construct(TeacherRepository $activityRepository){
        $this->activityRepository = $activityRepository;
    }

    // activities
    public function AddExercice($exerciceData) {}
    public function AddActivityToTextBox($activityData) {}

    // student
    public function DisplayMyStudents($students) {}
    public function AddAbsence($absnceData) {}
    public function AddGrade($gradeData) {}
}