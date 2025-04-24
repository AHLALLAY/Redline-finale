<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JournalsSeeder extends Seeder
{
    public function run()
    {
        $journals = [];
        $types = ['Charge', 'Produit'];
        $ressourceTypes = ['Client', 'Fournisseur'];
        $months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

        // Générer 50 entrées de journal
        for ($i = 0; $i < 50; $i++) {
            $type = $types[array_rand($types)];
            $ressourceType = $ressourceTypes[array_rand($ressourceTypes)];
            
            $journals[] = [
                'label' => $type === 'Produit' 
                    ? 'Frais de scolarité ' . ['1er trimestre', '2ème trimestre', '3ème trimestre'][array_rand(['1er trimestre', '2ème trimestre', '3ème trimestre'])]
                    : ['Achat fournitures', 'Paiement salaire', 'Frais administratifs', 'Maintenance'][array_rand(['Achat fournitures', 'Paiement salaire', 'Frais administratifs', 'Maintenance'])],
                'amount' => $type === 'Produit' ? rand(3000, 6000) : rand(500, 10000),
                'type' => $type,
                'reference' => ($type === 'Produit' ? 'FAC' : 'ACH') . '-2023-' . str_pad($i+1, 3, '0', STR_PAD_LEFT),
                'ressource' => $ressourceType === 'Client' 
                    ? 'Élève ' . rand(1, 264)
                    : ['Fournisseur Papeterie', 'Électricité et Eau', 'Service Nettoiement', 'Professeur ' . rand(2, 13)][array_rand(['Fournisseur Papeterie', 'Électricité et Eau', 'Service Nettoiement', 'Professeur '])],
                'ressource_type' => $ressourceType,
            ];
        }

        DB::table('journals')->insert($journals);
    }
}