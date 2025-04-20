<?php

namespace App\Repositories;

use App\Interfaces\AccountantInterface;
use App\Models\Journal;

class AccountantRepository implements AccountantInterface{
    public function AddRecord($RecordData)
    {
        try{
            return Journal::create($RecordData);
        }catch(\Exception $e){
            throw $e;
        }
    }
}