import { Link } from "react-router"
import MedcinsList from "../../components/admin-medcin/MedcinsList"

const Medcins = () => {
  
  return (
    <div className="p-6 m-2 bg-gray-50">
      <div className="flex justify-between items-center mb-6 bg-white px-6 py-4 rounded-xl shadow-sm">
      
      <div>
          <h2 className="text-2xl font-bold text-gray-800">Liste des Medcins</h2>
          <p className="text-gray-500 mt-1">Gestion des Medcins</p>
        </div>

        <div className="flex items-center gap-6">

          <Link
            to="/admin/medcin/ajoute-medcin"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Créer un Medcin  
          </Link>

        </div>

      </div>

      {/* the list of medcin */}

      <MedcinsList />
    </div>
  )
}

export default Medcins