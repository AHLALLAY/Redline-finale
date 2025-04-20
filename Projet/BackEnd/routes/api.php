<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function() {
    Route::post('/login/staff','LoginStaff');
    Route::post('/login/student','LoginStudent');
    Route::post('/register/staff','RegisterStaff');
    Route::post('/register/student','RegisterStudent');
    Route::post('/logout','Logout');
});
