<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExercicesSeeder extends Seeder
{
    public function run()
    {
        $exercices = [];
        $classes = ['1ére A', '2ème A', '3ème A', '4ème A', '5ème A', '6ème A', '1ére B', '2ème B', '3ème B'];
        $groups = ['Groupe 1', 'Groupe 2', 'Groupe 3', 'Groupe 4'];
        $subjects = ['Mathématiques', 'Physique', 'Chimie', 'Français', 'Arabe', 'Histoire-Géo', 'SVT', 'Anglais'];

        // Générer 30 exercices
        for ($i = 0; $i < 30; $i++) {
            $isDone = rand(0, 1);
            
            $exercices[] = [
                'title' => 'Devoir de ' . $subjects[array_rand($subjects)],
                'description' => 'Exercices sur ' . ['les fractions', 'la grammaire', 'l\'histoire', 'les équations', 'la photosynthèse'][array_rand(['les fractions', 'la grammaire', 'l\'histoire', 'les équations', 'la photosynthèse'])],
                'date' => date('Y-m-d', strtotime('+' . rand(1, 30) . ' days')),
                'classe' => $classes[array_rand($classes)],
                'group' => $groups[array_rand($groups)],
                'Teacher_id' => rand(2, 13), // IDs des enseignants (2-13)
                'is_done' => $isDone,
                'done_at' => $isDone ? date('Y-m-d', strtotime('+' . rand(1, 5) . ' days')) : null,
            ];
        }

        DB::table('exercices')->insert($exercices);
    }
}