<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AbsenceRequest;
use App\Http\Requests\ExerciceRequest;
use App\Http\Requests\GradeRequest;
use App\Http\Requests\TextBoxRequest;
use App\Services\teacherService;
use Illuminate\Validation\ValidationException;

class TeacherController extends Controller
{
    protected $teacherService;

    public function __construct(TeacherService $teacherService) { $this->teacherService = $teacherService; }

    // activities
    public function addExercise(ExerciceRequest $exerciceRequest)
    {
        try {
            $validated_data = $exerciceRequest->validated();
            $result = $this->teacherService->addExercise($validated_data);

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
    public function markExerciseAsDone($exerciceId)
    {
        try {
            $result = $this->teacherService->markExerciseAsDone($exerciceId);
            if ($result) {
                return response()->json([
                    'message' => 'Exercice status has been changed',
                    'status' => 'success'
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unexpected Error',
                'error' => $e->getMessage(),
                'status' => 'faild'
            ], 500);
        }
    }
    public function addTextBoxActivity(TextBoxRequest $textBoxRequest)
    {
        try {
            $validated_data = $textBoxRequest->validated();
            $this->teacherService->addTextBoxActivity($validated_data);

            return response()->json([
                'message' => 'Activity Added',
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
    public function getClasses($teacherId){
        try{
            $result = $this->teacherService->getClasses($teacherId);
            return response()->json([
                'message' => 'Classes found',
                'classes' => $result,
                'status' => 'success'
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'message' => 'Unexepected Error',
                'error' => $e->getMessage(),
                'status' => 'faild'
            ], 500);
        }
    }
    public function getStudentsByLevelAndGroup($classId)
    {
        try {
            $students = $this->teacherService->getStudentsByLevelAndGroup($classId);
            return response()->json([
                'message' => 'Étudiants récupérés avec succès',
                'data' => $students,
                'status' => 'success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des étudiants',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }

    public function recordAbsence(AbsenceRequest $absenceRequest) {
        try{
            $validated_data = $absenceRequest->validated();
            $this->teacherService->recordAbsence($validated_data);
            return response()->json([
                'message' => 'absent added',
                'status' => 'success'
            ], 200);
        }catch(ValidationException $e){
            return response()->json([
                'message' => 'Validation Error',
                'error' => $e->errors(),
                'status' => 'failed'
            ], 422);

        }catch(\Exception $e){
            return response()->json([
                'message' => 'unexpected error',
                'error' => $e->getMessage(),
                'status' => 'errors'
            ], 500);
        }
    }
    public function addGrade(GradeRequest $gradeRequest) {
        try{
            $validated_data = $gradeRequest->validated();
            $this->teacherService->addGrade($validated_data);
            return response()->json([
                'message' => 'grade added',
                'status' => 'success'
            ], 200);
        }catch(ValidationException $e){
            return response()->json([
                'message' => 'Validation Error',
                'error' => $e->errors(),
                'status' => 'failed'
            ], 422);

        }catch(\Exception $e){
            return response()->json([
                'message' => 'unexpected error',
                'error' => $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }
}
