<?php


namespace App\Repositories;

use App\Interfaces\AdminInterface;
use App\Models\Absence;
use App\Models\Classe;
use App\Models\GuardDuty;
use App\Models\Offer;
use App\Models\Student;
use App\Models\Subject;
use App\Models\TimeTable;
use App\Models\User;

class AdminRepository implements AdminInterface
{
    public function addStaff(array $staffData)
    {
        try {
            return User::create($staffData);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getStaffList()
    {
        try {
            return User::all();
        } catch (\Exception $e) {
            throw $e;
        }
    }


    public function suspendStaff(int $staffId)
    {
        try {
            $user = User::findOrFail($staffId);
            $user->is_suspended = true;
            return $user->save();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function activateStaff(int $staffId)
    {
        try {
            $user = User::findOrFail($staffId);
            $user->is_suspended = false;
            return $user->save();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function deleteStaff(int $staffId)
    {
        try {
            $user = User::findOrFail($staffId);
            $user->is_deleted = true;
            return $user->save();
        } catch (\Exception $e) {
            report($e);
            return false;
        }
    }

    public function addClass(array $classData)
    {
        try {
            return Classe::create($classData);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function addGuard(array $guardData)
    {
        try {
            return GuardDuty::create($guardData);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function addTimeTable(array $timeTableData)
    {
        try {
            return TimeTable::create($timeTableData);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getStudentsList()
    {
        try {
            return Student::all();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getAbsencesList()
    {
        try {
            return Absence::all();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getStaffStatistics()
    {
        try {
            return [
                'total' => User::count(),
                'admin' => User::where('role', 'Admin')->count(),
                'teacher' => User::where('role', 'Enseignant')->count(),
                'accountant' => User::where('role', 'Comptable')->count(),
                'secretary' => User::where('role', 'Secrétaire')->count()
            ];
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getStudentStatistics()
    {
        try {
            return [
                'total' => Student::count(),
                'male' => Student::where('gender', 'Masculin')->count(),
                'female' => Student::where('gender', 'Féminin')->count()
            ];
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getSubjects()
    {
        try{
            return Subject::all();
        }catch(\Exception $e){
            throw $e;
        }
    }
}
