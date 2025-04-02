import { Link } from "react-router"
import EmployersList from "../../components/admin-employer/EmployersList"

const Employers = () => {
  return (
    <div className="p-6 m-2 bg-gray-50">
      {/* Page header */}
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-xl shadow-sm">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">Liste des employer</h2>
          <p className="text-gray-500 mt-1">Gestion des employer</p>
        </div>

        <div className="flex items-center gap-6">

          <div className="text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
            <span className="font-medium">Date:</span> 10 / 02 / 2025
          </div>

          <Link
            to="/admin/employer/ajoute-employer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Créer un Employer
          </Link>

        </div>
      </div>

      {/* list des employers */}
      <EmployersList />
    </div>
  )
}

export default Employers