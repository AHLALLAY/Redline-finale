<?php
namespace App\Services;

use App\Interfaces\AdminInterface;

class AdminService {
    protected $adminRepository;

    public function __construct(AdminInterface $adminRepository){ $this->adminRepository = $adminRepository; }
    
    // staff
    public function AddStaff($staffData){}
    public function DisplayStaff(){ return $this->adminRepository->DisplayStaff(); }
    public function SuspendStaff($staffId){ return $this->adminRepository->SuspendStaff($staffId); }
    public function ActivatStaff($staffId){ return $this->adminRepository->ActivatStaff($staffId); }
    public function DeleteStaff($staffId){ return $this->adminRepository->DeleteStaff($staffId); }
    public function AddClasse($classeData){ return $this->adminRepository->AddClasse($classeData); }
    public function AddGarde($gardData){ return $this->adminRepository->AddGarde($gardData); }

    
    // student
    public function DisplayStudents(){ return $this->adminRepository->DisplayStudents(); }
    public function DisplayAbsences(){ return $this->adminRepository->DisplayAbsences(); }
    
    // statistics
    public function CountStaff(){ return $this->adminRepository->CountStaff(); }
    public function CountStudent(){ return $this->adminRepository->CountStudent(); }

    
    // auther
    public function AddOffer($offerData){ return $this->adminRepository->AddOffer($offerData); }
}