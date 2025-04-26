<?php


namespace App\Repositories;

use App\Interfaces\AdminInterface;
use App\Models\Offre;
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
            return User::all();
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
    public function DeleteStaff($staffId)
    {
        try {
            $user = User::find($staffId);
            $user->update(['is_deleted' => true]);
            return true;
        } catch (\Exception $e) {
            report($e);
            return false;
        }
    }
    public function AddClasse($classeData) {}
    public function AddGarde($gardData) {}

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
            return Student::all();
        } catch (\Exception $e) {
            throw $e;
        }
    }

    // auther
    public function AddOffre($offreData)
    {
        try {
            Offre::create($offreData);
            return true;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
