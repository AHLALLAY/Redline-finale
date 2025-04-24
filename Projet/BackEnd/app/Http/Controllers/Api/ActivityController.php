<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActivityRequest;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ActivityController extends Controller
{
    protected $activityService;

    public function __construct(ActivityService $activityService)
    {
        $this->activityService = $activityService;
    }

    public function AssignActivity(ActivityRequest $activityRequest)
    {
        try {
            $validated_data = $activityRequest->validated();
            $result = $this->activityService->AssignActivity($validated_data);

            return response()->json([
                'message' => 'Activity Assigned successfuly',
                'data' => $result,
                'status' => 'success'
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => '',
                'error' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unexpected error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
