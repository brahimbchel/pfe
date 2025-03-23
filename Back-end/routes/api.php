<?php

use App\Http\Controllers\EmployeController;
use App\Http\Controllers\AdministrateurController;
use Illuminate\Support\Facades\Route;

// Routes pour les employés
Route::apiResource('employes', EmployeController::class);

// Routes pour les administrateurs
Route::apiResource('administrateurs', AdministrateurController::class);