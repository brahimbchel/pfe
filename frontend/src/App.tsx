import React from 'react';
import { Navigate, Route, Routes } from 'react-router'
import { useAuthStore } from './store/useAuthStore';
import MainLayout from './layout/MainLaout';
import Home from './pages/Home';
import AuthLayout from './layout/AuthLaout';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound404 from './pages/NotFound404';
import AdminLayout from './layout/AdminLayout';
import RendezVous from './pages/admin/RendezVous';
import EmpHomePage from './pages/employer/EmpHomePAge';
import EmpProfile from './pages/employer/EmpProfile';
import EmpLayout from './layout/EmpLayout';
import MedLayout from './layout/MedLayout';
import ListRendezVous from './pages/medcin/ListRendezVous';
import EmpRendezVous from './pages/medcin/EmpRendezVous';
import PrivateRoute from './components/PrivateRoute';
import RendezVousForm from './components/admin-rendez-vous/RendezVousForm';
import Employers from './pages/admin/Employers';
import Medcins from './pages/admin/Medcins';
import MedcinsForm from './components/admin-medcin/MedcinsForm';
import EmployerForm from './components/admin-employer/EmployerForm';
import UpdateMedcinForm from './components/admin-medcin/UpdateMedcinForm';
import UpdateEmployerForm from './components/admin-employer/UpdateEmployerForm';
import UpdateRendezVousForm from './components/admin-rendez-vous/UpdateRendezVousForm';
import MedcinDetails from './components/admin-medcin/MedcinDetails';
import EmployeDetails from './components/admin-employer/EmployeDetails';
import AdminHome from './components/admin/AdminHome';
import CMSPage from './components/admin/CMSPage';
import SpecialitesPage from './components/admin/SpecialitesPage';
import DetailsVisit from './pages/medcin/DetailsVisit';

function ProtectedRoute({ element }: { element: React.ReactElement }) {
  const isAuth = useAuthStore((state) => state.isAuth);
  return isAuth ? element : <Navigate to="/auth/login" />;
}

function App() {

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="" element={<Home />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected Routes */}

      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminHome /> } />
          <Route path="cms" element={<CMSPage />} />
          <Route path="specialites" element={<SpecialitesPage />} />

          <Route path="rendez-vous">
            <Route index element={<RendezVous />} />
            {/* <Route path="ajoute-rendez-vous" element={<RendezVousForm />} /> */}
            <Route path="ajoute-rendez-vous/:employeId" element={<RendezVousForm />} />
            <Route path="update/:id" element={<UpdateRendezVousForm />} />
          </Route>

          <Route path="medcin">
            <Route index element={<Medcins />} />
            <Route path="detailes/:medcinId" element={<MedcinDetails /> } />
            <Route path="ajoute-medcin" element={<MedcinsForm /> } />
            <Route path="update/:id" element={<UpdateMedcinForm />} />
          </Route>

          <Route path="employers">
            <Route index element={<Employers />} />
            <Route path="detailes/:employeId" element={<EmployeDetails /> } />
            <Route path="ajoute-employer" element={<EmployerForm /> } />
            <Route path="update/:id" element={<UpdateEmployerForm />} />
          </Route>

        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={["medcin"]} />}>
        <Route path="medcin" element={<ProtectedRoute element={<MedLayout />} />}>
          <Route path="visit/:medcinId" element={<ListRendezVous />} />
          <Route path="visit/:medcinId/:visitId" element={<DetailsVisit />} />
          <Route path="employer/:id" element={<EmpRendezVous />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={["employer"]} />}>
        <Route path="employer" element={<ProtectedRoute element={<EmpLayout />} />}>
          <Route path="" element={<EmpHomePage />} />
          <Route path="profile" element={<EmpProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;




// <?php

// use App\Http\Controllers\EmployeController;
// use App\Http\Controllers\AdministrateurController;
// use App\Http\Controllers\MedecinController;
// use App\Http\Controllers\VisiteController;
// use App\Http\Controllers\DocumentController;
// use App\Http\Controllers\TypeSpecialiteController;
// use App\Http\Controllers\TypeDocumentController;
// use App\Http\Controllers\CMSController;

// use Illuminate\Support\Facades\Route;

// // Routes pour gest. des employés
// Route::apiResource('employes', EmployeController::class);
// Route::post('employes/{id}/block', [EmployeController::class, 'block'])->name('employes.block');
// Route::post('employes/{id}/unblock', [EmployeController::class, 'unblock'])->name('employes.unblock');

// // Routes pour gest. des medcins
// Route::apiResource('medecins', MedecinController::class);
// Route::post('medecins/{id}/block', [MedecinController::class, 'block'])->name('medecins.block');
// Route::post('medecins/{id}/unblock', [MedecinController::class, 'unblock'])->name('medecins.unblock');

// // Routes pour gest. des administrateurs
// Route::apiResource('administrateurs', AdministrateurController::class);
// Route::post('administrateurs/{id}/block', [AdministrateurController::class, 'block'])->name('administrateurs.block');
// Route::post('administrateurs/{id}/unblock', [AdministrateurController::class, 'unblock'])->name('administrateurs.unblock');

// // Routes pour gest. des documents
// Route::apiResource('documents', DocumentController::class);

// // Routes pour gest. visites
// Route::apiResource('visites', VisiteController::class);

// // ----MEDECINS------
// Route::patch('visites/{id}/prescriptions', [VisiteController::class, 'updatePrescriptions']);
// Route::patch('visites/{id}/observations', [VisiteController::class, 'updateObservations']);
// Route::get('medecins/{id}/historique-visites', [VisiteController::class, 'historiqueVisitesMedecin']);
// Route::get('medecins/{id}/visites-futures', [VisiteController::class, 'visitesFuturesMedecin']);

// // ----EMPLOYEES------
// Route::get('employes/{id}/historique-visites', [VisiteController::class, 'historiqueVisitesEmploye']);
// Route::get('employes/{id}/visites-futures', [VisiteController::class, 'visitesFuturesEmploye']);
// Route::get('employes/{id}/documents', [DocumentController::class, 'documentsEmploye']);


// Route::post('specialites', [TypeSpecialiteController::class, 'create']);
// Route::get('specialites', [TypeSpecialiteController::class, 'getAll']);
// Route::patch('specialites/{id}', [TypeSpecialiteController::class, 'update']);
// Route::delete('specialites/{id}', [TypeSpecialiteController::class, 'delete']);

// Route::post('type-documents', [TypeDocumentController::class, 'create']);
// Route::get('type-documents', [TypeDocumentController::class, 'getAll']);
// Route::patch('type-documents/{id}', [TypeDocumentController::class, 'update']);
// Route::delete('type-documents/{id}', [TypeDocumentController::class, 'delete']);

// Route::post('cms', [CMSController::class, 'create']);
// Route::get('cms', [CMSController::class, 'getAll']);
// Route::patch('cms/{id}', [CMSController::class, 'update']);
// Route::delete('cms/{id}', [CMSController::class, 'delete']);