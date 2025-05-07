<?php

use App\Http\Controllers\Api\AccountantController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OffreController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\TeacherController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function() {
    Route::post('/login/staff','loginStaff'); //done
    Route::post('/login/student','loginStudent'); //done
    Route::post('/register/staff','registerStaff'); //done
    Route::post('/register/student','registerStudent'); //done
    Route::post('/logout','logout'); //done
});


Route::controller(AccountantController::class)->group(function(){
    Route::post('/accountant/journal/new','addRecord'); //done
    Route::post('/accountant/journal/statistics/{month}','calculateMonthlyStatistics'); //done
    Route::get('/accountant/journal/all','getAllRecords'); //done
});


Route::controller(AdminController::class)->group(function(){
    // staff
    Route::get('/admin/staff','getStaffList'); //done
    Route::patch('/admin/staff/suspend/{staffId}','suspendStaff'); //done
    Route::patch('/admin/staff/activat/{staffId}','activateStaff'); //done
    Route::patch('/admin/staff/delete/{staffId}','deleteStaff'); //done
    Route::post('/admin/class/new','addClass'); //done
    Route::post('/admin/guard/new','addGuard'); //
    Route::post('/admin/timetable/new', 'addTimeTable'); //done
    
    // student
    Route::get('/admin/students','getStudentsList'); //done
    Route::get('/admin/absences','getAbsencesList'); //done
    
    // statistics
    Route::get('/admin/statistics/staff','getStaffStatistics'); // done
    Route::get('/admin/statistics/students','getStudentStatistics'); // done
    
    // auther
    Route::get('/admin/subjects/all','getSubjects'); //
});

Route::controller(TeacherController::class)->group(function(){
    Route::post('/prof/exercice/new','addExercise'); //done
    Route::patch('/prof/exercice/done/{exerciceId}','markExerciseAsDone'); //done
    Route::post('/prof/activity/new','addTextBoxActivity'); //done
    Route::get('/prof/classes/{teacherId}','getClasses');
    Route::post('/prof/MyStudents/{classId}','getStudentsByLevelAndGroup'); //done
    Route::post('/prof/absence/new','recordAbsence'); //done
    Route::post('/prof/grade/new','addGrade'); //done
});


Route::controller(StudentController::class)->group(function(){
    Route::get('/student/grades/{studentId}','getGrades');
    Route::get('/student/exercises/{classId}','getExercises');
    Route::post('/student/details/{studentId}','getStudentDetails');
});

Route::controller(OffreController::class)->group( function (){
    Route::post('/admin/offer/new','addOffer'); //done
    Route::get('/offers','getOffers');
});