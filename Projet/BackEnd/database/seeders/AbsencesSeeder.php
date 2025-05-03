<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AbsencesSeeder extends Seeder
{
    public function run()
    {
        $absences = [
            [
                'student_id' => 1,
                'status' => 'Absent',
                'delay_minutes' => null,
                'date' => '2023-10-15',
                'period' => 'Matin',
                'justification' => 'Non justifié',
                'recorded_by' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_id' => 2,
                'status' => 'Retard',
                'delay_minutes' => 15,
                'date' => '2023-10-16',
                'period' => 'Matin',
                'justification' => 'Justifié',
                'recorded_by' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_id' => 3,
                'status' => 'Présent',
                'delay_minutes' => null,
                'date' => '2023-10-17',
                'period' => 'Journée',
                'justification' => null,
                'recorded_by' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Insertion un par un pour plus de fiabilité
        foreach ($absences as $absence) {
            DB::table('absences')->insert($absence);
        }
    }
}