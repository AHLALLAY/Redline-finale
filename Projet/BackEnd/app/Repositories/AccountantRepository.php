<?php

namespace App\Repositories;

use App\Interfaces\AccountantInterface;
use App\Models\Accountant;

class AccountantRepository implements AccountantInterface{
    public function AddRecord($RecordData)
    {
        try{
            return Accountant::create($RecordData);
        }catch(\Exception $e){
            throw $e;
        }
    }
}