<?php
namespace App\Services;

use App\Interfaces\AdminInterface;

class AdminService {
    protected $adminRepository;

    public function __construct(AdminInterface $adminRepository){ $this->adminRepository = $adminRepository; }
    
    // staff
    public function addStaff($staffData){ return $this->adminRepository->addStaff($staffData); }
    public function getStaffList(){ return $this->adminRepository->getStaffList(); }
    public function suspendStaff($staffId){ return $this->adminRepository->suspendStaff($staffId); }
    public function activateStaff($staffId){ return $this->adminRepository->activateStaff($staffId); }
    public function deleteStaff($staffId){ return $this->adminRepository->deleteStaff($staffId); }
    
    //classes
    public function addClass($classeData){ return $this->adminRepository->addClass($classeData); }
    public function addGuard($guardData){ return $this->adminRepository->addGuard($guardData); }
    public function addTimeTable($timeTableData){ return $this->adminRepository->addTimeTable($timeTableData); }
    
    // student
    public function getStudentsList(){ return $this->adminRepository->getStudentsList(); }
    public function getAbsencesList(){ return $this->adminRepository->getAbsencesList(); }
    
    // statistics
    public function getStaffStatistics(){ return $this->adminRepository->getStaffStatistics(); }
    public function getStudentStatistics(){ return $this->adminRepository->getStudentStatistics(); }

    
    // auther
    public function addOffer($offerData){ return $this->adminRepository->addOffer($offerData); }
    public function getSubjects(){ return $this->adminRepository->getSubjects(); }
}