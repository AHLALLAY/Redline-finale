<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AbsencesSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['Présent', 'Absent', 'Retard'];
        $periods = ['Matin', 'Après-midi', 'Journée'];
        $justifications = ['Non justifié', 'Justifié', 'En attente'];

        for ($i = 1; $i <= 500; $i++) {
            $status = $statuses[rand(0, 2)];
            
            DB::table('absences')->insert([
                'student_id' => rand(1, 246),
                'status' => $status,
                'delay' => $status === 'Retard' ? rand(5, 60) : null,
                'date' => Carbon::now()->subDays(rand(1, 90))->format('Y-m-d'),
                'period' => $periods[rand(0, 2)],
                'justification' => $status !== 'Présent' ? $justifications[rand(0, 2)] : null,
                'recorded_by' => rand(4, 12), // Users IDs (9 enseignants)
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}