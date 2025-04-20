<?php

namespace App\Services;

use App\Interfaces\AccountantInterface;

class AccountantService{
    protected $accRepo;

    public function __construct(AccountantInterface $accRepo)
    {
        return $this->accRepo = $accRepo;
    }
    
}