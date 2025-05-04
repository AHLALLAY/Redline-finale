<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectsSeeder extends Seeder
{
    public function run()
    {
        $subjects = [
            [
                'nom' => 'Mathématiques',
                'code' => 'M',
                'weekly_hours' => 5,
                'teaching_level' => '1ère année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Langue Française',
                'code' => 'FR',
                'weekly_hours' => 4,
                'teaching_level' => '1ère année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Langue Arabe',
                'code' => 'AR',
                'weekly_hours' => 6,
                'teaching_level' => '1ère année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Éducation Islamique',
                'code' => 'IS',
                'weekly_hours' => 2,
                'teaching_level' => '1ère année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Activité Scientifique',
                'code' => 'AS',
                'weekly_hours' => 3,
                'teaching_level' => '2ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Éducation Physique',
                'code' => 'EP',
                'weekly_hours' => 2,
                'teaching_level' => '2ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Langue Amazighe',
                'code' => 'AM',
                'weekly_hours' => 3,
                'teaching_level' => '3ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Informatique',
                'code' => 'IN',
                'weekly_hours' => 2,
                'teaching_level' => '3ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Sciences Sociales',
                'code' => 'SS',
                'weekly_hours' => 2,
                'teaching_level' => '4ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Éducation Artistique',
                'code' => 'EA',
                'weekly_hours' => 2,
                'teaching_level' => '4ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Langue Anglaise',
                'code' => 'EG',
                'weekly_hours' => 3,
                'teaching_level' => '5ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Éducation Musicale',
                'code' => 'EM',
                'weekly_hours' => 1,
                'teaching_level' => '5ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Robotique',
                'code' => 'RB',
                'weekly_hours' => 2,
                'teaching_level' => '6ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Langue Espagnole',
                'code' => 'ES',
                'weekly_hours' => 2,
                'teaching_level' => '6ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Éducation Financière',
                'code' => 'EF',
                'weekly_hours' => 1,
                'teaching_level' => '6ème année',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('subjects')->insert($subjects);
    }
}