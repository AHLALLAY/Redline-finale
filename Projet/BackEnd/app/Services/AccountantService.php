<?php

namespace App\Services;

use App\Interfaces\AccountantInterface;

class AccountantService{
    protected $accantantRepository;

    public function __construct(AccountantInterface $accantantRepository)
    {
        $this->accantantRepository = $accantantRepository;
    }

    public function AddRecord($RecordData){
        return $this->accantantRepository->AddRecord($RecordData);
    }

    public function CalculateStatisticsOfMonth($month){
        return $this->accantantRepository->CalculateStatisticsOfMonth($month);
    }

    public function GetAllRecord(){
        return $this->accantantRepository->GetAllRecord();
    }
}