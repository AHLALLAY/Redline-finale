<?php
namespace App\Services;

use App\Interfaces\AdminInterface;

class AdminService {
    protected $adminRepository;

    public function __construct(AdminInterface $adminRepository)
    {
        $this->adminRepository = $adminRepository;   
    }

    public function DisplayStaff(){
        return $this->adminRepository->DisplayStaff();
    }

}