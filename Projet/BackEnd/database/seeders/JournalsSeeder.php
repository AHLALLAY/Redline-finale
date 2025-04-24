<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class JournalsSeeder extends Seeder
{
    public function run()
    {
        $journals = [];
        
        // Clients (élèves)
        $eleves = [];
        for ($i = 1; $i <= 264; $i++) {
            $eleves[] = [
                'name' => 'Élève ' . $i,
                'code' => 'ELEVE-' . str_pad($i, 4, '0', STR_PAD_LEFT)
            ];
        }
        
        // Fournisseurs spécifiques à une école marocaine
        $fournisseurs = [
            [
                'name' => 'ONEP',
                'type' => 'Services publics',
                'categories' => ['Eau', 'Électricité']
            ],
            [
                'name' => 'SHELL Maroc',
                'type' => 'Combustible',
                'categories' => ['Gasoil', 'Fioul']
            ],
            [
                'name' => 'Librairie des Écoles',
                'type' => 'Fournitures',
                'categories' => ['Livres', 'Cahiers', 'Stylos']
            ],
            [
                'name' => 'Bureau Tech',
                'type' => 'Matériel',
                'categories' => ['Ordinateurs', 'Imprimantes']
            ],
            [
                'name' => 'Netto Pro',
                'type' => 'Nettoyage',
                'categories' => ['Produits nettoyage', 'Services nettoyage']
            ]
        ];
        
        // Génération des opérations
        for ($i = 0; $i < 100; $i++) { // 100 écritures au total
            $isCharge = ($i < 70); // 70% charges, 30% produits
            
            if ($isCharge) {
                // Opération de charge (dépense)
                $fournisseur = $fournisseurs[array_rand($fournisseurs)];
                $category = $fournisseur['categories'][array_rand($fournisseur['categories'])];
                
                $journal = [
                    'label' => $category,
                    'amount' => $this->getMontantForCategory($category),
                    'type' => 'Charge',
                    'reference' => 'FAC-' . substr($fournisseur['name'], 0, 3) . '-' . date('Ym') . '-' . str_pad($i+1, 4, '0', STR_PAD_LEFT),
                    'ressource' => $fournisseur['name'],
                    'ressource_type' => 'Fournisseur',
                    'created_at' => Carbon::today()->subDays(rand(0, 90))
                ];
            } else {
                // Opération de produit (recette)
                $eleve = $eleves[array_rand($eleves)];
                $trimestre = ['1er trimestre', '2ème trimestre', '3ème trimestre'][array_rand([0, 1, 2])];
                
                $journal = [
                    'label' => 'Frais scolaire ' . $trimestre,
                    'amount' => rand(2500, 4000), // MAD
                    'type' => 'Produit',
                    'reference' => 'FAC-' . $eleve['code'] . '-' . date('Y') . '-' . substr($trimestre, 0, 1),
                    'ressource' => $eleve['name'],
                    'ressource_type' => 'Client',
                    'created_at' => Carbon::today()->subDays(rand(0, 90))
                ];
            }
            
            $journals[] = $journal;
        }

        DB::table('journals')->insert($journals);
    }
    
    private function getMontantForCategory($category)
    {
        $montants = [
            'Eau' => rand(500, 1500),
            'Électricité' => rand(800, 2500),
            'Gasoil' => rand(3000, 8000),
            'Fioul' => rand(5000, 12000),
            'Livres' => rand(2000, 10000),
            'Cahiers' => rand(500, 3000),
            'Stylos' => rand(200, 1500),
            'Ordinateurs' => rand(4000, 15000),
            'Imprimantes' => rand(2000, 8000),
            'Produits nettoyage' => rand(300, 2000),
            'Services nettoyage' => rand(1000, 5000),
            'Repas élèves' => rand(8000, 20000),
            'Fournitures cuisine' => rand(1000, 4000)
        ];
        
        return $montants[$category] ?? rand(500, 5000);
    }
}