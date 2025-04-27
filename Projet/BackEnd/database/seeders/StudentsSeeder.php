<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentsSeeder extends Seeder
{
    public function run(): void
    {
        $levels = ['1ére année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année'];
        $groups = ['A', 'B', 'C', 'D'];
        $studentsPerGroup = 22;
        $totalStudents = count($levels) * count($groups) * $studentsPerGroup; // 6*4*22 = 528

        for ($i = 1; $i <= $totalStudents; $i++) {
            $levelIndex = (int) (($i - 1) / (count($groups) * $studentsPerGroup));
            $groupIndex = (int) ((($i - 1) % (count($groups) * $studentsPerGroup)) / $studentsPerGroup);
            $studentInGroup = ($i - 1) % $studentsPerGroup + 1;

            DB::table('students')->insert([
                'name' => 'Élève ' . $i,
                'email' => 'eleve' . $i . '@gmail.com',
                'password' => Hash::make('123456789'),
                'birth_date' => Carbon::now()->subYears(6 + $levelIndex)->subDays(rand(1, 365))->format('Y-m-d'),
                'birth_place' => 'Ville ' . rand(1, 10),
                'gender' => ($i % 2) ? 'Masculin' : 'Féminin',
                'level' => $levels[$levelIndex],
                'group' => $groups[$groupIndex],
                'parent' => 'Parent ' . $i,
                'cin' => 'S' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'address' => 'Adresse ' . $i,
                'phone' => '06' . str_pad($i, 8, '0', STR_PAD_LEFT),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}