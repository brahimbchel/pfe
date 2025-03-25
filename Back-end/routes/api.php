<?php

use App\Http\Controllers\EmployeController;
use App\Http\Controllers\AdministrateurController;
use App\Http\Controllers\MedecinController;
use Illuminate\Support\Facades\Route;

// Routes pour gest. des employés
Route::apiResource('employes', EmployeController::class);

// Routes pour gest. des administrateurs
Route::apiResource('administrateurs', AdministrateurController::class);

// Routes pour gest. des medcins
Route::apiResource('medecins', MedecinController::class);

