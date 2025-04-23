<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AbsenceService;
use App\Http\Requests\AbsenceRequest;
use Illuminate\Validation\ValidationException;

class AbsenceController extends Controller
{
    protected $absenceService;

    public function __construct(AbsenceService $absenceService)
    {
        $this->absenceService = $absenceService;
    }

    public function AddAbsence(AbsenceRequest $absenceRequest)
    {
        try {
            $validated_data = $absenceRequest->validated();
            if ($validated_data) {
                $this->absenceService->AddAbsence($validated_data);
                return response()->json([
                    'message' => 'enregistré avec succès',
                    'data' => $validated_data,
                    'status' => 'success'
                ], 201);
            }
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
                'status' => 'error'
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'enregistrement',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }
    
}
