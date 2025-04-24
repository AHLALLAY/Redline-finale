<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AbsencesSeeder extends Seeder
{
    public function run()
    {
        $absences = [];
        $statuses = ['Présent', 'Absent', 'Retard'];
        $periods = ['Matin', 'Après-midi', 'Journée'];
        $justifications = ['Non justifié', 'Justifié', 'En attente', null];

        // Générer 3 absences par élève
        for ($studentId = 1; $studentId <= 264; $studentId++) {
            for ($i = 0; $i < 3; $i++) {
                $status = $statuses[array_rand($statuses)];
                $delay = ($status === 'Retard') ? rand(5, 45) : null;
                
                $absences[] = [
                    'student_id' => $studentId,
                    'status' => $status,
                    'delay' => $delay,
                    'date' => date('Y-m-d', strtotime('-' . rand(1, 30) . ' days')),
                    'period' => ($status !== 'Présent') ? $periods[array_rand($periods)] : null,
                    'justification' => ($status !== 'Présent') ? $justifications[array_rand($justifications)] : null,
                    'recorded_by' => rand(2, 13), // IDs des enseignants (2-13)
                ];
            }
        }

        DB::table('absences')->insert($absences);
    }
}