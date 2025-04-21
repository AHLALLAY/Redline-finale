<?php

namespace App\Interfaces;

interface AccountantInterface{
    public function AddRecord($RecordData);
    public function CalculateChargesOfMonth($month);
}