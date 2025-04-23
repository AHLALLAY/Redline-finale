<?php

use App\Http\Controllers\Api\AccountantController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Requests\AccountantRequest;
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
    Route::get('/admin/staff','DisplayStaff');
});