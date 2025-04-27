<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ActivityRequest;
use App\Http\Requests\ExerciceRequest;
use App\Http\Requests\TextBoxRequest;
use App\Models\TextBox;
use App\Services\teacherService;
use Illuminate\Validation\ValidationException;

class TeacherController extends Controller
{
    protected $teacherService;

    public function __construct(TeacherService $teacherService)
    {
        $this->teacherService = $teacherService;
    }

    // activities
    public function AddExercice(ExerciceRequest $exerciceRequest)
    {
        try {
            $validated_data = $exerciceRequest->validated();
            $result = $this->teacherService->AddExercice($validated_data);

            return response()->json([
                'message' => 'Exercice Assigned successfuly',
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
    public function AddActivityToTextBox(TextBox $textBoxRequest)
    {
        try {
            $validated_data = $textBoxRequest->validated();
            $this->teacherService->AddActivityToTextBox($validated_data);

            return response()->json([
                'message' => 'Activity Added',
                'data' => $validated_data,
                'status' => 'success'
            ], 201);
        } catch (ValidationException $e) {
            return  response()->json([
                'message' => 'Erreur lors lavalidation',
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
    public function DisplayMyStudents($students) {}
    public function AddAbsence($absnceData) {}
    public function AddGrade($gradeData) {}
}
