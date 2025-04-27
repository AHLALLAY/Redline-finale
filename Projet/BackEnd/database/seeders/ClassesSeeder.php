<?php

namespace Database\Seeders;

use App\Models\Classe;
use App\Models\User;
use Illuminate\Database\Seeder;

class ClassesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = User::where('role', 'Enseignant')->get()->values();
        
        if ($teachers->isEmpty()) {
            $this->command->error('Aucun enseignant trouvé. Exécutez d\'abord UsersSeeder!');
            return;
        }

        $niveaux = ['1ére année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année'];
        $groups = ['A', 'B', 'C', 'D'];

        $teacherIndex = 3;
        foreach ($niveaux as $niveau) {
            foreach ($groups as $group) {
                $teacher = $teachers[$teacherIndex % $teachers->count()];
                $teacherIndex++;

                Classe::create([
                    'niveau' => $niveau,
                    'group' => $group,
                    'teacher_id' => $teacher->id,
                ]);
            }
        }
    }
}