<?php

namespace App\Interfaces;

interface AdminInterface
{
    // Staff
    public function addStaff(array $staffData);
    public function getStaffList();
    public function suspendStaff(int $staffId);
    public function activateStaff(int $staffId);
    public function deleteStaff(int $staffId);

    // Classes & Guards & Times Table
    public function addClass(array $classData);
    public function addGuard(array $guardData);
    public function addTimeTable(array $timeTableData);

    // Student
    public function getStudentsList();
    public function getAbsencesList();

    // Statistics
    public function getStaffStatistics();
    public function getStudentStatistics();

    // Autres fonctionnalités
    public function addOffer(array $offerData);
    public function getSubjects();
}
