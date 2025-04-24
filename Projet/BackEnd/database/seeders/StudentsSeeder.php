<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentsSeeder extends Seeder
{
    public function run()
    {
        $firstNamesMale = ['Mohamed', 'Ahmed', 'Youssef', 'Hassan', 'Omar', 'Karim', 'Adil', 'Mehdi', 'Nabil', 'Rachid'];
        $firstNamesFemale = ['Fatima', 'Amina', 'Khadija', 'Zahra', 'Samira', 'Nadia', 'Leila', 'Houda', 'Salma', 'Asmae'];
        $lastNames = ['Alaoui', 'Benjelloun', 'El Mansouri', 'Chraibi', 'Bennani', 'Touimi', 'Berrada', 'Ouazzani', 'Cherkaoui', 'Idrissi'];
        $cities = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Meknès', 'Agadir', 'Oujda', 'Kénitra', 'Tétouan'];
        $levels = ['1ére année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année'];

        $students = [];

        for ($i = 0; $i < 264; $i++) {
            $gender = ($i % 2 === 0) ? 'Masculin' : 'Féminin';
            $firstName = $gender === 'Masculin' 
                ? $firstNamesMale[array_rand($firstNamesMale)] 
                : $firstNamesFemale[array_rand($firstNamesFemale)];
            $lastName = $lastNames[array_rand($lastNames)];
            $city = $cities[array_rand($cities)];
            $level = $levels[array_rand($levels)];

            $students[] = [
                'name' => $firstName . ' ' . $lastName,
                'email' => strtolower($firstName) . strtolower($lastName) . ($i+1) . '2025@gmail.com',
                'password' => Hash::make('123456789'),
                'birth_date' => $this->generateStudentBirthDate($level),
                'birth_place' => $city,
                'gender' => $gender,
                'level' => $level,
                'parent' => 'Parent de ' . $firstName . ' ' . $lastName,
                'cin' => 'EE' . rand(100000, 999999),
                'address' => rand(1, 200) . ' Rue ' . ['Mohammed V', 'Hassan II', 'Ibn Batouta', 'Al Massira', 'Zerktouni'][array_rand(['Mohammed V', 'Hassan II', 'Ibn Batouta', 'Al Massira', 'Zerktouni'])] . ', ' . $city,
                'phone' => (rand(0, 1) ? '06' . rand(10000000, 99999999) : null),
            ];
        }

        DB::table('students')->insert($students);
    }

    private function generateStudentBirthDate($level)
    {
        $baseYear = 2023 - ((int)substr($level, 0, 1) + 6); // Âge approximatif selon le niveau
        $year = $baseYear - rand(0, 1);
        $month = rand(1, 12);
        $day = rand(1, 28);

        return sprintf('%04d-%02d-%02d', $year, $month, $day);
    }
}