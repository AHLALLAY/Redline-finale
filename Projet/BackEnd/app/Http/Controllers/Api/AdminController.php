<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\AdminService;

class AdminController extends Controller
{
    protected $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

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
}
