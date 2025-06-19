<?php

use App\Http\Controllers\Api\AssemblyStationController;
use App\Http\Controllers\Api\ChargingStationController;
use App\Http\Controllers\Api\DistributorController;
use App\Http\Controllers\Api\FactoryController;
use App\Http\Controllers\Api\RouteController;
use App\Http\Controllers\Api\ShipmentController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\StationController;
use Illuminate\Support\Facades\Route;

Route::apiResource('stations', ChargingStationController::class);
Route::apiResource('routes', RouteController::class);
Route::apiResource('suppliers', SupplierController::class);
Route::apiResource('distributors', DistributorController::class);
Route::apiResource('factories', FactoryController::class);
Route::apiResource('assembly-stations', AssemblyStationController::class);
Route::apiResource('shipments', ShipmentController::class);
Route::get('/stations', [ChargingStationController::class, 'index']);
Route::get('/routes', [RouteController::class, 'index']);
