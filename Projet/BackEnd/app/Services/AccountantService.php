<?php

namespace App\Services;

use App\Interfaces\AccountantInterface;

class AccountantService{
    protected $accantantRepository;

    public function __construct(AccountantInterface $accantantRepository) { $this->accantantRepository = $accantantRepository; }


    public function addRecord($recordData){ return $this->accantantRepository->addRecord($recordData); }
    public function calculateMonthlyStatistics($month){return $this->accantantRepository->calculateMonthlyStatistics($month);}
    public function getAllRecords(){return $this->accantantRepository->getAllRecords();}
}