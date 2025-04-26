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
    public function DeleteStaff($staffId){ return $this->adminRepository->DeleteStaff($staffId); }
    public function AddClasse($classeData){ return $this->adminRepository->AddClasse($classeData); }
    public function AddGarde($gardData){ return $this->adminRepository->AddGarde($gardData); }

    
    // student
    public function DisplayStudents(){ return $this->adminRepository->DisplayStudents(); }
    public function DisplayAbsences(){ return $this->adminRepository->DisplayAbsences(); }
    
    // auther
    public function AddOffre($offreData){ return $this->adminRepository->AddOffre($offreData); }
}