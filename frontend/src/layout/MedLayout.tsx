import { Outlet } from "react-router"
import MedNavbar from "../components/medcin/MedNavBar"

const MedLayout = () => {
  return (
        <div>
          <MedNavbar />
          <Outlet />
        </div>
  )
}

export default MedLayout