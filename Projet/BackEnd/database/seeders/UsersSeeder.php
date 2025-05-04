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
            // Admin
            [
                'name' => 'Admin',
                'cin' => 'A123456',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('123456789'),
                'role' => 'Admin',
                'birth_date' => '1980-01-15',
                'phone' => '0612345678',
                'last_diploma' => 'Master en Administration',
                'obtained_at' => '2005-06-30',
                'subject_id' => null,
                'teaching_level' => null,
                'is_suspended' => false,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Secrétaire
            [
                'name' => 'Secrétaire Scolaire',
                'cin' => 'S654321',
                'email' => 'secretaire@gmail.com',
                'password' => Hash::make('123456789'),
                'role' => 'Secrétaire',
                'birth_date' => '1990-03-25',
                'phone' => '0623456789',
                'last_diploma' => 'BTS Assistant de Direction',
                'obtained_at' => '2015-06-20',
                'subject_id' => null,
                'teaching_level' => null,
                'is_suspended' => false,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Matières et niveaux
        $subjects = [
            1 => 'Langue Arabe',
            2 => 'Langue Française',
            3 => 'Langue Anglaise',
            4 =>'Éducation Islamique',
            5 => 'Mathématiques',
            6 => 'Activité Scientifique',
            7 => 'Informatique',
            8 => 'Sciences Sociales',
            9 => 'Éducation Artistique',
            10 => 'Éducation Physique'
        ];

        $levels = [
            '1ére année',
            '2ème année', 
            '3ème année',
            '4ème année',
            '5ème année',
            '6ème année'
        ];

        // Génération de 60 enseignants
        for ($i = 1; $i <= 60; $i++) {
            $subjectId = ($i % 10) + 1; // Répartition cyclique sur les 10 matières
            $levelIndex = ($i % 6); // Répartition sur les 6 niveaux
            
            $users[] = [
                'name' => 'Professeur '.$subjects[$subjectId].' '.$i,
                'cin' => 'E'.str_pad($i, 5, '0', STR_PAD_LEFT),
                'email' => 'prof'.$i.'@gmail.com',
                'password' => Hash::make('123456789'),
                'role' => 'Enseignant',
                'birth_date' => $this->generateBirthDate(),
                'phone' => '06'.str_pad(rand(10000000, 99999999), 8, '0'),
                'last_diploma' => $this->generateDiploma($subjects[$subjectId]),
                'obtained_at' => $this->generateObtainedDate(),
                'subject_id' => $subjectId,
                'teaching_level' => $levels[$levelIndex],
                'is_suspended' => false,
                'is_deleted' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('users')->insert($users);
    }

    private function generateBirthDate()
    {
        $year = rand(1970, 1995);
        $month = rand(1, 12);
        $day = rand(1, 28);
        return sprintf('%d-%02d-%02d', $year, $month, $day);
    }

    private function generateObtainedDate() 
    {
        $year = rand(2000, 2020);
        $month = rand(1, 12);
        $day = rand(1, 28);
        return sprintf('%d-%02d-%02d', $year, $month, $day);
    }

    private function generateDiploma($subject)
    {
        $diplomas = [
            'Licence en '.$subject,
            'Master en '.$subject,
            'Doctorat en '.$subject,
            'Diplôme de Professeur de '.$subject,
            'Certificat d\'enseignement de '.$subject
        ];
        return $diplomas[array_rand($diplomas)];
    }
}