<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\StudentService;
use Symfony\Component\CssSelector\Node\FunctionNode;

class StudentController extends Controller
{
    protected $studentService;

    public function __construct(StudentService $studentService){ $this->studentService = $studentService; }

    public function getGrades($studentId){
        try{
            $grades = $this->studentService->getGrades($studentId);

            return response()->json([
                'message' => 'data found',
                'grade' => $grades,
                'status' => 'success'
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Unexpected Error',
                'status' => 'failed'
            ], 500);
        }

    }

    public function getExercise($classId){
        try{
            $exercises = $this->studentService->getGrades($classId);

            return response()->json([
                'message' => 'data found',
                'grade' => $exercises,
                'status' => 'success'
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Unexpected Error',
                'status' => 'failed'
            ], 500);
        }
    }
}
