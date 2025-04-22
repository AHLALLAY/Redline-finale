<?php

namespace App\Interfaces;

interface AccountantInterface{
    public function AddRecord($RecordData);
    public function CalculateStatisticsOfMonth($month);
    public function GetAllRecord();
}