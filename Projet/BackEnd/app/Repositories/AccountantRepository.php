<?php

namespace App\Repositories;

use App\Interfaces\AccountantInterface;
use App\Models\Accountant;
use Carbon\Carbon;
use InvalidArgumentException;

class AccountantRepository implements AccountantInterface
{
    public function AddRecord($RecordData)
    {
        try {
            return Accountant::create($RecordData);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function CalculateStatisticsOfMonth($month)
    {
        try {
            $start = Carbon::createFromFormat('m', $month)->startOfMonth();
            $end = $start->copy()->endOfMonth();

            $charges = Accountant::where('type', 'Charge')
                ->whereBetween('created_at', [$start, $end])
                ->get();
            $produits = Accountant::where('type', 'Produit')
                ->whereBetween('created_at', [$start, $end])
                ->get();

            return [
                'month' => $start->format('F Y'),
                'currency' => 'MAD',
                'charges' => [
                    'data' => $charges,
                    'stats' => [
                        'count' => $charges->count(),
                        'total' => round($charges->sum('amount'), 2),
                        'average' => round($charges->avg('amount'), 2),
                        'max' => $charges->max('amount'),
                        'min' => $charges->min('amount')
                    ]
                ],
                'produit' => [
                    'data' => $produits,
                    'stats' => [
                        'count' => $produits->count(),
                        'total' => round($produits->sum('amount'), 2),
                        'average' => round($produits->avg('amount'), 2),
                        'max' => $produits->max('amount'),
                        'min' => $produits->min('amount')
                    ]
                ]
            ];
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
