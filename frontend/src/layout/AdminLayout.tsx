import { Outlet } from "react-router"
import NavbarAdmin from "../components/NavBarAdmin"

const AdminLayout = () => {
  return (
    <div>
      <NavbarAdmin />
      <h1>AdminLayout</h1>
      <Outlet />
    </div>
  )
}

export default AdminLayout