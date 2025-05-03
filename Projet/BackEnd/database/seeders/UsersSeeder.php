<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $users = [
            // Admin (sans subject_id ni teaching_level)
            [
                'name' => 'Admin System',
                'cin' => 'A123456',
                'email' => 'admin@school.com',
                'password' => Hash::make('password123'),
                'role' => 'Admin',
                'birth_date' => '1980-01-15',
                'phone' => '0612345678',
                'last_diploma' => 'Master en Informatique',
                'obtained_at' => '2005-06-30',
                'subject_id' => null,
                'teaching_level' => null,
                'is_suspended' => false,
                'is_deleted' => false,
            ],
            // Enseignant (avec subject_id et teaching_level)
            [
                'name' => 'Professeur Math',
                'cin' => 'M654321',
                'email' => 'math.teacher@school.com',
                'password' => Hash::make('password123'),
                'role' => 'Enseignant',
                'birth_date' => '1985-05-20',
                'phone' => '0623456789',
                'last_diploma' => 'Doctorat en Mathématiques',
                'obtained_at' => '2010-07-15',
                'subject_id' => 1,
                'teaching_level' => '1ére année',
                'is_suspended' => false,
                'is_deleted' => false,
            ],
            // Secrétaire (sans subject_id ni teaching_level)
            [
                'name' => 'Secrétaire',
                'cin' => 'S987654',
                'email' => 'secretary@school.com',
                'password' => Hash::make('password123'),
                'role' => 'Secrétaire',
                'birth_date' => '1990-11-10',
                'phone' => '0634567890',
                'last_diploma' => 'BTS Secrétariat',
                'obtained_at' => '2015-06-20',
                'subject_id' => null,
                'teaching_level' => null,
                'is_suspended' => false,
                'is_deleted' => false,
            ],
        ];

        // Insertion un par un pour éviter le problème de longueur différente
        foreach ($users as $user) {
            DB::table('users')->insert($user);
        }
    }
}