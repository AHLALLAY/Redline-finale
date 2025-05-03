<?php

namespace App\Interfaces;

interface AccountantInterface
{
    public function addRecord(array $recordData);
    public function calculateMonthlyStatistics($month);
    public function getAllRecords();
}
