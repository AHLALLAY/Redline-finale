<?php

namespace App\Repositories;

use App\Interfaces\AccountantInterface;
use App\Models\Transaction;
use Carbon\Carbon;
use InvalidArgumentException;

class AccountantRepository implements AccountantInterface
{

    public function addRecord(array $recordData)
    {
        try {
            return Transaction::create($recordData);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function calculateMonthlyStatistics($month)
    {
        try {
            $start = Carbon::createFromFormat('m', $month)->startOfMonth();
            $end = $start->copy()->endOfMonth();

            $charges = Transaction::where('type', 'Charge')
                ->whereBetween('created_at', [$start, $end])
                ->get();
            $produits = Transaction::where('type', 'Produit')
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
                        'average' => round($charges->avg('amount') ?? 0, 2),
                        'max' => $charges->max('amount') ?? 0,
                        'min' => $charges->min('amount') ?? 0
                    ]
                ],
                'produit' => [
                    'data' => $produits,
                    'stats' => [
                        'count' => $produits->count(),
                        'total' => round($produits->sum('amount'), 2),
                        'average' => round($produits->avg('amount') ?? 0, 2),
                        'max' => $produits->max('amount') ?? 0,
                        'min' => $produits->min('amount') ?? 0
                    ]
                ]
            ];
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function getAllRecords()
    {
        try {
            return Transaction::all();
        } catch (\Exception $e) {
            throw $e;
        }
    }
}