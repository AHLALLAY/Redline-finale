<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionsSeeder extends Seeder
{
    public function run()
    {
        $transactions = [
            [
                'description' => 'Frais de scolarité',
                'amount' => 2500.00,
                'type' => 'Revenu',
                'reference_number' => 'FEE-2023-001',
                'entity_name' => 'Ahmed Benali',
                'entity_type' => 'Etudiant',
                'recorded_by' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'description' => 'Achat de fournitures',
                'amount' => 1200.50,
                'type' => 'Dépense',
                'reference_number' => 'EXP-2023-001',
                'entity_name' => 'Fournitures Pro',
                'entity_type' => 'Fournisseur',
                'recorded_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'description' => 'Salaire enseignant',
                'amount' => 8000.00,
                'type' => 'Dépense',
                'reference_number' => 'SAL-2023-001',
                'entity_name' => 'Professeur Math',
                'entity_type' => 'Personnel',
                'recorded_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('transactions')->insert($transactions);
    }
}