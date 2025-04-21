<?php

namespace App\Services;

use App\Interfaces\AccountantInterface;

class AccountantService{
    protected $accantantRepository;

    public function __construct(AccountantInterface $accantantRepository)
    {
        return $this->accantantRepository = $accantantRepository;
    }

    public function AddRecord($RecordData){
        return $this->accantantRepository->AddRecord($RecordData);
    }

    public function CalculatChargesOfMonth($month){
        return $this->accantantRepository->CalculatChargesOfMonth($month);
    }
}