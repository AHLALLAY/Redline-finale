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
        $gender = ['Masculin', 'Féminin'];

        for ($i = 1; $i <= 246; $i++) {
            $levelIndex = ($i - 1) % 6;
            $genderIndex = $i % 2;

            DB::table('students')->insert([
                'name' => 'Élève ' . $i,
                'email' => 'eleve' . $i . '@example.com',
                'password' => Hash::make('password'),
                'birth_date' => Carbon::now()->subYears(6 + $levelIndex)->subDays(rand(1, 365))->format('Y-m-d'),
                'birth_place' => 'Ville ' . rand(1, 10),
                'gender' => $gender[$genderIndex],
                'level' => $levels[$levelIndex],
                'parent' => 'Parent d\'Élève ' . $i,
                'cin' => 'S' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'address' => 'Adresse ' . $i . ', Rue ' . rand(1, 100),
                'phone' => '06' . str_pad($i, 8, '0', STR_PAD_LEFT),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}