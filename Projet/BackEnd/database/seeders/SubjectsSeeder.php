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
                'name' => 'Mathématiques',
                'code' => 'M',
                'weekly_hours' => 5,
                'category' => 'Mathématiques',
                'teaching_level' => '1ére année',
            ],
            [
                'name' => 'Physique & Chimie',
                'code' => 'PC',
                'weekly_hours' => 4,
                'category' => 'Sciences',
                'teaching_level' => '2ème année',
            ],
            [
                'name' => 'Français',
                'code' => 'FR',
                'weekly_hours' => 4,
                'category' => 'Langues',
                'teaching_level' => '3ème année',
            ],
            [
                'name' => 'Education Physique',
                'code' => 'EP',
                'weekly_hours' => 2,
                'category' => 'Sport',
                'teaching_level' => '4ème année',
            ],
            [
                'name' => 'Peinture',
                'code' => 'P',
                'weekly_hours' => 2,
                'category' => 'Arts',
                'teaching_level' => '5ème année',
            ],
        ];

        DB::table('subjects')->insert($subjects);
    }
}