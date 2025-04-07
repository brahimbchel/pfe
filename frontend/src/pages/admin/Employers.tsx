import EmployersList from "../../components/admin-employer/EmployersList"
import PageHeaderAdmin from "../../components/PageHeaderAdmin"

const Employers = () => {
  return (
    <div className="p-6 m-2 bg-gray-50">
      <PageHeaderAdmin
        title="Liste des employer"
        description="Gestion des employer"
        buttonText="Créer un Employer"
        buttonLink="/admin/rendez-vous/ajoute-rendez-vous"
      />
      <EmployersList />
    </div>
  )
}

export default Employers