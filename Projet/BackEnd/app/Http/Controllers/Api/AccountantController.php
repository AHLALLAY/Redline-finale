<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AccountantRequest;
use App\Services\AccountantService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AccountantController extends Controller
{
    protected $accountantService;
    public function __construct(AccountantService $accountantService)
    {
        return $this->accountantService = $accountantService;
    }

    public function AddRecord(AccountantRequest $accountantRequest)
    {
        try {
            $validated_data = $accountantRequest->validated();
            if ($validated_data) {
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
