<?php

namespace App\Services;

use App\Repositories\AbsenceRepository;

class AbsenceService {
    protected $absenceRepository;

    public function __construct(AbsenceRepository $absenceRepository)
    {
        $this->absenceRepository = $absenceRepository;   
    }
    
}