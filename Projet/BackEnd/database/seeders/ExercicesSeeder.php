<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExercicesSeeder extends Seeder
{
    public function run()
    {
        $exercices = [
            [
                'title' => 'Devoir de Mathématiques',
                'description' => 'Exercices sur les fractions',
                'teacher_id' => 2,
                'class_id' => 1,
                'is_done' => true,
                'done_at' => '2023-10-10 14:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Projet Scientifique',
                'description' => 'Expérience sur la photosynthèse',
                'teacher_id' => 2,
                'class_id' => 2,
                'is_done' => false,
                'done_at' => null, // Explicitement null quand non utilisé
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insertion un par un pour éviter les problèmes de structure
        foreach ($exercices as $exercice) {
            DB::table('exercices')->insert($exercice);
        }
    }
}