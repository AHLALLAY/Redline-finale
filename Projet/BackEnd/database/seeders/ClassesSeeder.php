<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClassesSeeder extends Seeder
{
    public function run()
    {
        $classes = [
            [
                'level' => '1ére année',
                'group' => 'A',
                'teacher_id' => 2, // Professeur Math
                'academic_year' => 2023,
            ],
            [
                'level' => '2ème année',
                'group' => 'B',
                'teacher_id' => 2,
                'academic_year' => 2023,
            ],
            [
                'level' => '3ème année',
                'group' => 'A',
                'teacher_id' => 2,
                'academic_year' => 2023,
            ],
        ];

        DB::table('classes')->insert($classes);
    }
}