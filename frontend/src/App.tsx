import { Route, Routes } from 'react-router'
import './App.css'
import MainLayout from './layout/MainLaout'
import Home from './pages/Home'
import AuthLayout from './layout/AuthLaout'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound404 from './pages/NotFound404'
import AdminLayout from './layout/AdminLayout'
import Medcin from './pages/admin/Medcin'
import Employers from './pages/admin/Employers'
import RendezVous from './pages/admin/RendezVous'

function App() {

  return (
    <>

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route path="medcin" element={<Medcin />} />
          <Route path="employers" element={<Employers />} />
          <Route path="rendez-vous" element={<RendezVous />} />
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound404 />} />

      </Routes>
    </>
  )
}

export default App
