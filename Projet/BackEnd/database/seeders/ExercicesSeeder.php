<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ExercicesSeeder extends Seeder
{
    public function run(): void
    {
        $classes = ['CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème'];
        $subjects = ['Mathématiques', 'Français', 'Sciences', 'Histoire', 'Géographie'];
        $groups = ['A', 'B', 'C', 'D'];
        

        for ($i = 1; $i <= 30; $i++) {
            $isDone = rand(0, 1);
            
            DB::table('exercices')->insert([
                'title' => $subjects[rand(0, count($subjects) - 1)] . ' - Exercice ' . $i,
                'description' => 'Description de l\'exercice ' . $i . '. ' . Str::random(50),
                'classe' => $classes[rand(0, count($classes) - 1)],
                'group' => $groups[rand(0, 3)],
                'teacher_id' => rand(4, 12),
                'is_done' => $isDone,
                'done_at' => $isDone ? Carbon::now()->subDays(rand(1, 30))->format('Y-m-d') : null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}