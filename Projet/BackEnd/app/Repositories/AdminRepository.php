<?php


namespace App\Repositories;

use App\Interfaces\AdminInterface;
use App\Models\Absence;
use App\Models\Classe;
use App\Models\Garde;
use App\Models\Offer;
use App\Models\Student;
use App\Models\User;

class AdminRepository implements AdminInterface
{

    // staff
    public function AddStaff($staffData)
    {
        try {
            return User::create($staffData);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function DisplayStaff()
    {
        try {
            return User::where('role', 'Enseignant')->get();
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function SuspendStaff($staffId)
    {
        try {
            $user = User::findOrFail($staffId);
            $user->is_suspended = true;
            return $user->save();
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function ActivatStaff($staffId)
    {
        try {
            $user = User::findOrFail($staffId);
            $user->is_suspended = false;
            return $user->save();
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function DeleteStaff($staffId)
    {
        try {
            $user = User::find($staffId);
            $user->is_deleted = true;
            return $user->save();
            return true;
        } catch (\Exception $e) {
            report($e);
            return false;
        }
    }
    public function AddClasse($classeData)
    {
        try {
            return Classe::create($classeData);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function AddGarde($gardData)
    {
        try {
            return Garde::create($gardData);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function AddTimeTable($data)
    {
        
    }
    // student
    public function DisplayStudents()
    {
        try {
            return Student::all();
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function DisplayAbsences()
    {
        try {
            return Absence::all();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    // statistics
    public function CountStaff()
    {
        try {
            $all = User::all()->count();
            $admin = User::where('role', 'Admin')->count();
            $teacher = User::where('role', 'Enseignant')->count();
            $accountant = User::where('role', 'Comptable')->count();
            $secretary = User::where('role', 'Secrétaire')->count();
            
            return [
                'total' => $all,
                'admin' => $admin,
                'teacher'=> $teacher,
                'accoutant' => $accountant,
                'Secretary' => $secretary
            ];

        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function CountStudent()
    {
        try {
            $all = Student::all()->count();
            $male = Student::where('gender', 'Masculin')->count();
            $female = Student::where('gender', 'Féminin')->count();

            return [
                'total' => $all,
                'male' => $male,
                'female' => $female
            ];
        } catch (\Exception $e) {
            throw $e;
        }
    }

    // auther
    public function AddOffer($offerData)
    {
        try {
            Offer::create($offerData);
            return true;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
