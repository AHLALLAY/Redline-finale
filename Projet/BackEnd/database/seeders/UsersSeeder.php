<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $roles = ['Enseignant', 'Enseignant', 'Enseignant', 'Enseignant', 'Enseignant', 
                 'Enseignant', 'Enseignant', 'Enseignant', 'Enseignant', 'Enseignant',
                 'Comptable', 'Secrétaire', 'Admin'];
        
        $firstNamesMale = ['Mohamed', 'Ahmed', 'Youssef', 'Hassan', 'Omar', 'Karim', 'Adil', 'Mehdi', 'Nabil', 'Rachid'];
        $firstNamesFemale = ['Fatima', 'Amina', 'Khadija', 'Zahra', 'Samira', 'Nadia', 'Leila', 'Houda', 'Salma', 'Asmae'];
        $lastNames = ['Alaoui', 'Benjelloun', 'El Mansouri', 'Chraibi', 'Bennani', 'Touimi', 'Berrada', 'Ouazzani', 'Cherkaoui', 'Idrissi'];

        $users = [];
        
        // Admin
        $users[] = [
            'name' => 'Admin Admin',
            'cin' => 'AB123456',
            'email' => 'admin2025@gmail.com',
            'password' => Hash::make('123456789'),
            'role' => 'Admin',
            'birth_date' => '1980-01-15',
            'phone' => '06' . rand(10, 99) . rand(10, 99) . rand(10, 99),
            'last_diplomat' => 'Doctorat en Gestion',
            'obtained_at' => '2010-06-30',
        ];

        // Comptable
        $users[] = [
            'name' => 'Comptable Comptable',
            'cin' => 'CD789012',
            'email' => 'comptable2025@gmail.com',
            'password' => Hash::make('123456789'),
            'role' => 'Comptable',
            'birth_date' => '1985-05-20',
            'phone' => '06' . rand(10, 99) . rand(10, 99) . rand(10, 99),
            'last_diplomat' => 'Master en Comptabilité',
            'obtained_at' => '2015-07-15',
        ];

        // Secrétaire
        $users[] = [
            'name' => 'Secrétaire Secrétaire',
            'cin' => 'EF345678',
            'email' => 'secretaire2025@gmail.com',
            'password' => Hash::make('123456789'),
            'role' => 'Secrétaire',
            'birth_date' => '1978-11-10',
            'phone' => '06' . rand(10, 99) . rand(10, 99) . rand(10, 99),
            'last_diplomat' => 'Bac +3 en Secrétariat',
            'obtained_at' => '2005-06-20',
        ];

        // 10 Enseignants (5 hommes, 5 femmes)
        for ($i = 0; $i < 10; $i++) {
            $gender = ($i < 5) ? 'male' : 'female';
            $firstName = $gender === 'male' 
                ? $firstNamesMale[array_rand($firstNamesMale)] 
                : $firstNamesFemale[array_rand($firstNamesFemale)];
            $lastName = $lastNames[array_rand($lastNames)];
            
            $users[] = [
                'name' => $firstName . ' ' . $lastName,
                'cin' => substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 2) . rand(100000, 999999),
                'email' => strtolower($firstName) . strtolower($lastName) . '2025@gmail.com',
                'password' => Hash::make('123456789'),
                'role' => 'Enseignant',
                'birth_date' => date('Y-m-d', mt_rand(strtotime('1970-01-01'), strtotime('1990-12-31'))),
                'phone' => '06' . rand(10, 99) . rand(10, 99) . rand(10, 99),
                'last_diplomat' => 'Master en ' . ['Mathématiques', 'Physique', 'Chimie', 'Français', 'Arabe', 'Histoire'][array_rand(['Mathématiques', 'Physique', 'Chimie', 'Français', 'Arabe', 'Histoire'])],
                'obtained_at' => date('Y-m-d', mt_rand(strtotime('2010-01-01'), strtotime('2020-12-31'))),
            ];
        }

        DB::table('users')->insert($users);
    }
}