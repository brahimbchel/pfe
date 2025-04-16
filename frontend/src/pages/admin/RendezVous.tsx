import RendezVousList from "../../components/admin-rendez-vous/RendezVousList";
import PageHeaderAdmin from "../../components/PageHeaderAdmin";

const RendezVous = () => {

  return (
    <div className="p-6 m-2 bg-gray-50">
      <PageHeaderAdmin
        title="Liste des rendez-vous"
        description="Gestion des rendez-vous médicaux"
        buttonText=""
        buttonLink=""
      />

      <RendezVousList />

    </div>
  );
};

export default RendezVous;
