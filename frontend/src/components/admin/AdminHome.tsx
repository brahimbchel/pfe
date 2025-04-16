import { Link } from 'react-router';

const AdminHome = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Tableau de Bord Administrateur</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/cms"
          className="bg-gray-900 text-white p-5 rounded-xl shadow hover:bg-gray-800 transition"
        >
          <h2 className="text-xl font-semibold mb-1">📰 Gestion du CMS</h2>
          <p className="text-gray-300">Ajouter et gérer les contenus du site.</p>
        </Link>

        <Link
          to="/admin/rendez-vous"
          className="bg-gray-900 text-white p-5 rounded-xl shadow hover:bg-gray-800 transition"
        >
          <h2 className="text-xl font-semibold mb-1">📅 Rendez-vous</h2>
          <p className="text-gray-300">Voir ou planifier les rendez-vous.</p>
        </Link>

        <Link
          to="/admin/employers"
          className="bg-gray-900 text-white p-5 rounded-xl shadow hover:bg-gray-800 transition"
        >
          <h2 className="text-xl font-semibold mb-1">👥 Gestion des Employés</h2>
          <p className="text-gray-300">Liste, ajout et modification des employés.</p>
        </Link>

        <Link
          to="/admin/medcin"
          className="bg-gray-900 text-white p-5 rounded-xl shadow hover:bg-gray-800 transition"
        >
          <h2 className="text-xl font-semibold mb-1">👨‍⚕️ Gestion des Médecins</h2>
          <p className="text-gray-300">Ajouter, modifier ou supprimer un médecin.</p>
        </Link>

        {/* Uncomment when backend route is ready */}
        {/* <Link
          to="/admin/specialites"
          className="bg-gray-900 text-white p-5 rounded-xl shadow hover:bg-gray-800 transition"
        >
          <h2 className="text-xl font-semibold mb-1">🩺 Gestion des Spécialités</h2>
          <p className="text-gray-300">
            Ajouter ou supprimer les spécialités des médecins.
          </p>
        </Link> */}
        
      </div>
    </div>
  );
};

export default AdminHome;
