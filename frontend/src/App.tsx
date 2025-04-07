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
          <Route path="rendez-vous">
            <Route index element={<RendezVous />} />
            <Route path="ajoute-rendez-vous" element={<RendezVousForm />} />
            <Route path="update/:id" element={<UpdateRendezVousForm />} />
          </Route>

          <Route path="medcin">
            <Route index element={<Medcins />} />
            <Route path="ajoute-medcin" element={<MedcinsForm /> } />
            <Route path="update/:id" element={<UpdateMedcinForm />} />
          </Route>

          <Route path="employers">
            <Route index element={<Employers />} />
            <Route path="ajoute-employer" element={<EmployerForm /> } />
            <Route path="update/:id" element={<UpdateEmployerForm />} />
          </Route>

        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={["medcin"]} />}>
        <Route path="medcin" element={<ProtectedRoute element={<MedLayout />} />}>
          <Route path="" element={<ListRendezVous />} />
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
