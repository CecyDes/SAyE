<?php

use App\Http\Controllers\Api\AssemblyStationController;
use App\Http\Controllers\Api\DistributorController;
use App\Http\Controllers\Api\FactoryController;
use App\Http\Controllers\Api\ShipmentController;
use App\Http\Controllers\Api\SupplierController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard.index');

Route::get('/factories', [FactoryController::class, 'index'])->name('factories.index');
Route::get('/distributors', [DistributorController::class, 'index'])->name('distributors.index');
Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
Route::get('/assembly-stations', [AssemblyStationController::class, 'index'])->name('assembly-stations.index');
Route::get('/shipments', [ShipmentController::class, 'index'])->name('shipments.index');
