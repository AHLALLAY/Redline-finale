<?php
namespace App\Services;

use App\Repositories\ActivityRepository;

class ActivityService {

    protected $activityRepository;

    public function __construct(ActivityRepository $activityRepository){
        $this->activityRepository = $activityRepository;
    }

    public function AssignActivity($activity){
        return $this->activityRepository->AssignActivity($activity);
    }
    public function AddActivityToTextBox($activity){
        return $this->activityRepository->AddActivityToTextBox($activity);
    }

}