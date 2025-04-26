<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ClasseRequest;
use App\Http\Requests\GardeRequest;
use App\Http\Requests\OffreRequest;
use App\Services\AdminService;
use Illuminate\Validation\ValidationException;

class AdminController extends Controller
{
    protected $adminService;
    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    // staff
    public function AddStaff($staffData) {}

    public function DisplayStaff()
    {
        try {
            $data = $this->adminService->DisplayStaff();
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
    public function SuspendStaff($staffId)
    {
        try {
            $result = $this->adminService->SuspendStaff($staffId);

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
    public function DeleteStaff($staffId)
    {
        try {
            $result = $this->adminService->DeleteStaff($staffId);
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
    public function AddClasse(ClasseRequest $classeRequest)
    {
        try {
            $validated_data = $classeRequest->validated();
            $this->adminService->AddClasse($validated_data);
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
    public function AddGarde(GardeRequest $gardeRequest)
    {
        try {
            $validated_data = $gardeRequest->validated();
            $this->adminService->AddGarde($validated_data);
            return response()->json([
                'message' => 'Gard Added',
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


    // student
    public function DisplayAbsences()
    {
        try {
            $data = $this->adminService->DisplayAbsences();
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

    public function DisplayStudents()
    {
        try {
            $data = $this->adminService->DisplayStudents();
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


    // auther
    public function AddOffre(OffreRequest $offreRequest)
    {
        try {
            $validated_data = $offreRequest->validated();
            $this->adminService->AddGarde($validated_data);
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
}
