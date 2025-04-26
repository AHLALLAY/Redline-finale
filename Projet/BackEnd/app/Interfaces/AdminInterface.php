<?php

namespace App\Interfaces;

interface AdminInterface
{
    // staff
    public function AddStaff($staff);
    public function DisplayStaff();
    public function SuspendStaff($staff);
    public function DeleteStaff($staff);
    public function AssignClasse($classe, $to);
    public function AssignGarde($time, $to);

    // student
    public function DisplayStudents();
    public function DisplayAbsences();

    // auther
    public function AddOffre($offre);
}
