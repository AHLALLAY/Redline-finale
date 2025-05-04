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
                'nom' => 'Langue Arabe',
                'code' => 'AR',
                'weekly_hours' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Langue Française',
                'code' => 'FR',
                'weekly_hours' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Langue Anglaise',
                'code' => 'EN',
                'weekly_hours' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Éducation Islamique',
                'code' => 'IS',
                'weekly_hours' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Mathématiques',
                'code' => 'MA',
                'weekly_hours' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Activité Scientifique',
                'code' => 'SC',
                'weekly_hours' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Informatique',
                'code' => 'IN',
                'weekly_hours' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Sciences Sociales',
                'code' => 'SS',
                'weekly_hours' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Éducation Artistique',
                'code' => 'EA',
                'weekly_hours' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Éducation Physique',
                'code' => 'EP',
                'weekly_hours' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('subjects')->insert($subjects);
    }
}