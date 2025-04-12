<?php

use App\Http\Controllers\EmployeController;
use App\Http\Controllers\AdministrateurController;
use App\Http\Controllers\MedecinController;
use App\Http\Controllers\VisiteController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\TypeSpecialiteController;
use App\Http\Controllers\TypeDocumentController;
use App\Http\Controllers\CMSController;

use Illuminate\Support\Facades\Route;

// Routes pour gest. des employés
Route::apiResource('employes', EmployeController::class);

// Routes pour gest. des administrateurs
Route::apiResource('administrateurs', AdministrateurController::class);

// Routes pour gest. des medcins
Route::apiResource('medecins', MedecinController::class);


// Routes pour gest. des documents
Route::apiResource('documents', DocumentController::class);


// Routes pour gest. visites
Route::apiResource('visites', VisiteController::class);

// ----MEDECINS------
Route::patch('visites/{id}/prescriptions', [VisiteController::class, 'updatePrescriptions']);
Route::patch('visites/{id}/observations', [VisiteController::class, 'updateObservations']);
Route::get('medecins/{id}/historique-visites', [VisiteController::class, 'historiqueVisitesMedecin']);
Route::get('medecins/{id}/visites-futures', [VisiteController::class, 'visitesFuturesMedecin']);

// ----EMPLOYEES------
Route::get('employes/{id}/historique-visites', [VisiteController::class, 'historiqueVisitesEmploye']);
Route::get('employes/{id}/visites-futures', [VisiteController::class, 'visitesFuturesEmploye']);
Route::get('employes/{id}/documents', [DocumentController::class, 'documentsEmploye']);


Route::post('specialites', [TypeSpecialiteController::class, 'create']);
Route::get('specialites', [TypeSpecialiteController::class, 'getAll']);
Route::patch('specialites/{id}', [TypeSpecialiteController::class, 'update']);
Route::delete('specialites/{id}', [TypeSpecialiteController::class, 'delete']);

Route::post('type-documents', [TypeDocumentController::class, 'create']);
Route::get('type-documents', [TypeDocumentController::class, 'getAll']);
Route::patch('type-documents/{id}', [TypeDocumentController::class, 'update']);
Route::delete('type-documents/{id}', [TypeDocumentController::class, 'delete']);

Route::post('cms', [CMSController::class, 'create']);
Route::get('cms', [CMSController::class, 'getAll']);
Route::patch('cms/{id}', [CMSController::class, 'update']);
Route::delete('cms/{id}', [CMSController::class, 'delete']);