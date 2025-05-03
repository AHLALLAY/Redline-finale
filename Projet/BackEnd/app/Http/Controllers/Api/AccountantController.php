<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AccountantRequest;
use App\Services\AccountantService;
use Illuminate\Validation\ValidationException;

class AccountantController extends Controller
{
    protected $accountantService;
    public function __construct(AccountantService $accountantService) { $this->accountantService = $accountantService; }

    public function addRecord(AccountantRequest $accountantRequest)
    {
        try {
            $validated_data = $accountantRequest->validated();
            if ($validated_data) {
                $this->accountantService->addRecord($validated_data);
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

    public function calculateMonthlyStatistics($month)
    {
        try {

            $result = $this->accountantService->calculateMonthlyStatistics($month);

            return response()->json([
                'message' => 'Calcul effectué avec succès',
                'data' => $result,
                'status' => 'success'
            ], 200);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 'error'
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Une erreur est survenue lors du calcul',
                'status' => 'error'
            ], 500);
        }
    }

    public function getAllRecords(){
        try{
            $result = $this->accountantService->getAllRecords();
            return response()->json([
                'message' => 'Donner trouvé avec succès',
                'data' => $result,
                'status' => 'success'
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                "message" => "Unexpected Error",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
