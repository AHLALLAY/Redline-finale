<?php

namespace App\Interfaces;

interface AdminInterface
{
    // staff
    public function AddStaff($staffData);
    public function DisplayStaff();
    public function SuspendStaff($staffId);
    public function ActivatStaff($staffId);
    public function DeleteStaff($staffId);
    public function AddClasse($classeData);
    public function AddGarde($gardData);

    // student
    public function DisplayStudents();
    public function DisplayAbsences();

    // statistics
    public function CountStuff();
    public function CountStudent();

    // auther
    public function AddOffer($offerData);
}
