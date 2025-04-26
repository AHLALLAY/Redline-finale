<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class JournalsSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['Charge', 'Produit'];
        $ressourceTypes = ['Client', 'Fournisseur'];
        $labels = [
            'Charge' => ['Électricité', 'Eau', 'Internet', 'Fournitures', 'Salaires', 'Loyer'],
            'Produit' => ['Frais de scolarité', 'Inscription', 'Activités', 'Dons', 'Subventions']
        ];

        for ($i = 1; $i <= 50; $i++) {
            $type = $types[rand(0, 1)];
            
            DB::table('journals')->insert([
                'label' => $labels[$type][rand(0, count($labels[$type]) - 1)],
                'amount' => rand(100, 10000) + (rand(0, 99) / 100),
                'type' => $type,
                'reference' => 'REF-' . date('Y') . '-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'ressource' => $type === 'Charge' ? 'Fournisseur ' . rand(1, 10) : 'Client ' . rand(1, 246),
                'ressource_type' => $type === 'Charge' ? 'Fournisseur' : 'Client',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}