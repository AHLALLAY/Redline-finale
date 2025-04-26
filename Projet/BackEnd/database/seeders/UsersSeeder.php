<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;


class UsersSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        DB::table('users')->insert([
            'name' => 'Admin User',
            'cin' => 'A123456',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'Admin',
            'birth_date' => '1985-03-15',
            'phone' => '0600000001',
            'last_diplomat' => 'Doctorat en Informatique',
            'obtained_at' => '2010-06-20',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Comptable user
        DB::table('users')->insert([
            'name' => 'Comptable User',
            'cin' => 'B123456',
            'email' => 'comptable@example.com',
            'password' => Hash::make('password'),
            'role' => 'Comptable',
            'birth_date' => '1988-07-25',
            'phone' => '0600000002',
            'last_diplomat' => 'Master en Finance',
            'obtained_at' => '2012-06-15',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Secrétaire user
        DB::table('users')->insert([
            'name' => 'Secrétaire User',
            'cin' => 'C123456',
            'email' => 'secretaire@example.com',
            'password' => Hash::make('password'),
            'role' => 'Secrétaire',
            'birth_date' => '1990-11-10',
            'phone' => '0600000003',
            'last_diplomat' => 'Licence en Administration',
            'obtained_at' => '2014-06-30',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 9 Enseignants
        $subjects = [
            'Mathématiques', 'Français', 'Sciences', 'Histoire', 'Géographie',
            'Physique', 'Chimie', 'Biologie', 'Informatique'
        ];

        foreach ($subjects as $index => $subject) {
            DB::table('users')->insert([
                'name' => "Enseignant $subject",
                'cin' => 'E' . str_pad($index + 1, 6, '0', STR_PAD_LEFT),
                'email' => strtolower($subject) . '@example.com',
                'password' => Hash::make('password'),
                'role' => 'Enseignant',
                'birth_date' => Carbon::now()->subYears(rand(30, 60))->subDays(rand(1, 365))->format('Y-m-d'),
                'phone' => '06' . str_pad($index + 10, 8, '0', STR_PAD_LEFT),
                'last_diplomat' => "Master en $subject",
                'obtained_at' => Carbon::now()->subYears(rand(5, 20))->format('Y-m-d'),
                'is_suspended' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}