<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OfferRequest;
use App\Services\OffreService;
use Illuminate\Validation\ValidationException;

class OffreController extends Controller
{
    protected $offerService;

    public function __construct(OffreService $offerService) { $this->offerService = $offerService; }

    public function addOffer(OfferRequest $offerRequest)
    {
        try {
            $validated_data = $offerRequest->validated();
            $this->offerService->addOffer($validated_data);
            return response()->json([
                'message' => 'Offre Added',
                'data' => $validated_data,
                'status' => 'success'
            ], 201);
        } catch (ValidationException $e) {
            return  response()->json([
                'message' => 'Erreur lors la validation',
                'error' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unexpected Error',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }

    public function getOffers()
    {
        try {
            $offres = $this->offerService->getOffers();
            return response()->json([
                'message' => 'Offres found',
                'data' => $offres,
                'status' => 'success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unexpected Error',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }
    public function addApplication(int $postId) {}
}
