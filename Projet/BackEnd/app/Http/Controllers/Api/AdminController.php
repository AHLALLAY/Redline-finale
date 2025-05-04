<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClasseRequest;
use App\Http\Requests\GuardeRequest;
use App\Http\Requests\OfferRequest;
use App\Http\Requests\TimeTableRequest;
use App\Services\AdminService;
use Illuminate\Validation\ValidationException;


class AdminController extends Controller
{
    protected $adminService;
    public function __construct(AdminService $adminService) { $this->adminService = $adminService; }

    // staff
    public function addStaff(){
        
    }
    public function getStaffList()
    {
        try {
            $data = $this->adminService->getStaffList();
            if ($data === null) {
                return response()->json([
                    "message" => "No Stuff found",
                    "status" => "success"
                ], 200);
            }
            return response()->json([
                "message" => "les donner collecter",
                "data" => $data,
                "status" => "success"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Unexpected Error",
                "error" => $e->getMessage()
            ], 500);
        }
    }
    public function suspendStaff($staffId)
    {
        try {
            $result = $this->adminService->suspendStaff($staffId);

            if (!$result) {
                return response()->json([
                    'message' => 'Staff member not found',
                    'status' => 'error'
                ], 404);
            }

            return response()->json([
                'message' => 'Suspend successive',
                'status' => 'success'
            ], 200);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function activateStaff($staffId)
    {
        try {
            $result = $this->adminService->activateStaff($staffId);

            if (!$result) {
                return response()->json([
                    'message' => 'Staff member not found',
                    'status' => 'error'
                ], 404);
            }

            return response()->json([
                'message' => 'Activation successive',
                'status' => 'success'
            ], 200);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function deleteStaff($staffId)
    {
        try {
            $result = $this->adminService->deleteStaff($staffId);
            if ($result) {
                return response()->json([
                    'message' => 'delete successive',
                    'status' => 'success'
                ], 200);
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function addClass(ClasseRequest $classeRequest)
    {
        try {
            $validated_data = $classeRequest->validated();
            $this->adminService->addClass($validated_data);
            return response()->json([
                'message' => 'Class Added',
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
    public function addGuard(GuardeRequest $guardeRequest)
    {
        try {
            $validated_data = $guardeRequest->validated();
            $this->adminService->addGuard($validated_data);
            return response()->json([
                'message' => 'Guard Added',
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
    public function addTimeTable(TimeTableRequest $timeTableRequest){
        try{
            $validated_data = $timeTableRequest->validated();
            $this->adminService->addTimeTable($validated_data);

            return response()->json([
                'message' => 'Time Table created',
                'status' => 'success'
            ], 201);
        } catch (ValidationException $e) {
            return  response()->json([
                'message' => 'Erreur lors la validation',
                'error' => $e->errors(),
                'status' => 'failed'
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unexpected Error',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }

    // student
    public function getStudentsList()
    {
        try {
            $data = $this->adminService->getStudentsList();
            if ($data === null) {
                return response()->json([
                    "message" => "No Student found",
                    "status" => "success"
                ], 200);
            }
            return response()->json([
                "message" => "les donner collecter",
                "data" => $data,
                "status" => "success"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Unexpected Error",
                "error" => $e->getMessage()
            ], 500);
        }
    }
    public function getAbsencesList()
    {
        try {
            $data = $this->adminService->getAbsencesList();
            if ($data === null) {
                return response()->json([
                    "message" => "No Student found",
                    "status" => "success"
                ], 200);
            }
            return response()->json([
                "message" => "les donner collecter",
                "data" => $data,
                "status" => "success"
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Unexpected Error",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    // statistics
    public function getStaffStatistics(){
        try{
            $result = $this->adminService->getStaffStatistics();
            if($result){
                return response()->json([
                    'message' => 'Calcule Completed',
                    'data' => $result,
                    'status' => 'success'
                ], 200);
            }
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Unexpected error',
                'error' => $e->getMessage(),
                'status' => 'failed'
            ], 500);
        }
    }

    public function getStudentStatistics(){
        try{
            $result = $this->adminService->getStudentStatistics();
            if($result){
                return response()->json([
                    'message' => 'Calcule Completed',
                    'data' => $result,
                    'status' => 'success'
                ], 200);
            }
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Unexpected error',
                'error' => $e->getMessage(),
                'status' => 'failed'
            ], 500);
        }
    }
    // auther
    public function addOffer(OfferRequest $offerRequest)
    {
        try {
            $validated_data = $offerRequest->validated();
            $this->adminService->addOffer($validated_data);
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
    public function getSubjects()
    {
        try {
            $subjects = $this->adminService->getSubjects();
            return response()->json([
                'message' => 'Subjects found',
                'subjects' => $subjects,
                'status' => 'success'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unexpected Error',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }
}
