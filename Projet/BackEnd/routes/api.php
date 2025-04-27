<?php

use App\Http\Controllers\Api\AccountantController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TeacherController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function() {
    Route::post('/login/staff','LoginStaff'); //done
    Route::post('/login/student','LoginStudent'); //done
    Route::post('/register/staff','RegisterStaff'); //done
    Route::post('/register/student','RegisterStudent'); //done
    Route::post('/logout','Logout'); //done
});


Route::controller(AccountantController::class)->group(function(){
    Route::post('/accountant/journal/new','AddRecord'); //done
    Route::post('/accountant/journal/statistics/{month}','CalculateStatisticsOfMonth'); //done
    Route::get('/accountant/journal/all','GetAllRecord'); //done
});


Route::controller(AdminController::class)->group(function(){
    // staff
    Route::get('/admin/staff','DisplayStaff'); //done
    Route::patch('/admin/staff/suspend/{staffId}','SuspendStaff'); //done
    Route::patch('/admin/staff/activat/{staffId}','ActivatStaff'); //done
    Route::patch('/admin/staff/delete/{staffId}','DeleteStaff'); //done
    Route::post('/admin/class/new','AddClasse'); //done
    Route::post('/admin/gard/new','AddGarde'); //done
    
    // student
    Route::get('/admin/students','DisplayStudents'); //done
    Route::get('/admin/absences','DisplayAbsences'); //done
    
    // statistics
    Route::get('/admin/statistics/staff','CountStaff'); // done
    Route::get('/admin/statistics/students','CountStudent'); // done
    // auther
    Route::post('/admin/offer/new','AddOffer'); //done
});

Route::controller(TeacherController::class)->group(function(){
    Route::post('/prof/activity/new', 'AssignActivity');
    Route::post('/prof/activity/textbox/new', 'AddActivityToTextBox');
});