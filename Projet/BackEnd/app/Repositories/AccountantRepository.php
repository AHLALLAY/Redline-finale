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

    public function CalculatChargesOfMonth($month)
    {
        try {
            // Validation du mois AVEC CARBON
            try {
                $start = Carbon::createFromFormat('Y-m', $month)->startOfMonth();
                $end = $start->copy()->endOfMonth();
            } catch (\Exception $e) {
                throw new InvalidArgumentException("Format de mois invalide. Utiliser YYYY-MM (ex: 2023-12)");
            }

            // Récupération des charges (version compacte)
            $charges = Accountant::where('type', 'Charge')
                ->whereBetween('created_at', [$start, $end])
                ->get();

            return [
                'month' => $start->format('F Y'),
                'total' => $charges->sum('amount'),
                'currency' => 'MAD',
                'charges' => $charges,
                'stats' => [
                    'count' => $charges->count(),
                    'average' => round($charges->avg('amount'), 2),
                    'max' => $charges->max('amount'),
                    'min' => $charges->min('amount')
                ]
            ];
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
