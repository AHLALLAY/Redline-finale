<?php

use App\Http\Controllers\Api\AbsenceController;
use App\Http\Controllers\Api\AccountantController;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function() {
    Route::post('/login/staff','LoginStaff');
    Route::post('/login/student','LoginStudent');
    Route::post('/register/staff','RegisterStaff');
    Route::post('/register/student','RegisterStudent');
    Route::post('/logout','Logout');
});


Route::controller(AccountantController::class)->group(function(){
    Route::post('/accountant/journal/new','AddRecord');
    Route::post('/accountant/journal/statistics/{month}','CalculateStatisticsOfMonth');
    Route::get('/accountant/journal/all','GetAllRecord');
});


Route::controller(AdminController::class)->group(function(){
    // staff
    Route::get('/admin/staff','DisplayStaff');
    Route::post('/admin/staff/suspend/{staffId}','SuspendStaff');
    Route::post('/admin/staff/delete/{staffId}','SuspendStaff');
    Route::post('/admin/class/new','AddClasse');
    Route::post('/admin/gard/new','AddGarde');
    
    // student
    Route::get('/admin/student','DisplayStudents');
    Route::get('/admin/absence','DisplayAbsences');
    
    // auther
    Route::post('/admin/offre/new','AddOffre');
});

Route::controller(AbsenceController::class)->group(function (){
    Route::post('/prof/absence/new','AddAbsence');
});

Route::controller(ActivityController::class)->group(function(){
    Route::post('/prof/activity/new', 'AssignActivity');
    Route::post('/prof/activity/textbox/new', 'AddActivityToTextBox');
});