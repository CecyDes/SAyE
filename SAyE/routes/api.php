<?php

use App\Http\Controllers\Api\ChargingStationController;
use App\Http\Controllers\Api\RouteController;
use Illuminate\Support\Facades\Route;

Route::get('/stations', [ChargingStationController::class, 'index']);
Route::post('/stations', [ChargingStationController::class, 'store']);
Route::delete('/stations/{id}', [ChargingStationController::class, 'destroy']);
Route::put('/stations/{id}', [ChargingStationController::class, 'update']);

Route::get('/routes', [RouteController::class, 'index']);
Route::post('/routes', [RouteController::class, 'store']);
