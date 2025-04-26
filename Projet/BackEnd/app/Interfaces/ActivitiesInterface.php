<?php

namespace App\Interfaces;

interface ActivitiesInterface
{
    public function AssignActivity($activity);
    public function AddActivityToTextBox($activity);
    public function AddGrades($grades);
}
