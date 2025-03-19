import { Route, Routes } from 'react-router'
import './App.css'
import MainLayout from './layout/MainLaout'
import Home from './pages/Home'
import AuthLayout from './layout/AuthLaout'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound404 from './pages/NotFound404'
import AdminLayout from './layout/AdminLayout'
import RendezVous from './pages/admin/RendezVous'
import MedcinList from './pages/admin/MedcinList'
import EmployersList from './pages/admin/EmployersList'
import EmpHomePAge from './pages/employer/EmpHomePAge'
import EmpProfile from './pages/employer/EmpProfile'
import EmpLayout from './layout/EmpLayout'
import MedLayout from './layout/MedLayout'
import ListRendezVous from './pages/medcin/ListRendezVous'
import EmpRendezVous from './pages/medcin/EmpRendezVous'

function App() {

  return (
    <>

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="" element={<Home />} />
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route path="" element={<RendezVous />} />
          <Route path="medcin-list" element={<MedcinList />} />
          <Route path="employers-list" element={<EmployersList />} />
        </Route>

        <Route path="medcin" element={<MedLayout />}>
          <Route path="" element={<ListRendezVous />} />
          <Route path="employer/:id" element={<EmpRendezVous />} />
        </Route>

        <Route path="employer" element={<EmpLayout />}>
          <Route path="" element={<EmpHomePAge />} />
          <Route path="profile" element={<EmpProfile />} />
        </Route>

        <Route path="*" element={<NotFound404 />} />

      </Routes>
    </>
  )
}

export default App
