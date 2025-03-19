import { Outlet } from "react-router"
import NavBarEmp from "../components/NavBarEmp"

const EmpLayout = () => {
  return (
    <div>
      <NavBarEmp />
      <h1>EmpLayout</h1>
      <Outlet />
    </div>
  )
}

export default EmpLayout