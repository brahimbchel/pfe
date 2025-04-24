import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import RowRendezVous from "./RowRendezVous";

type Visit = {
  id: string;
  MedecinId: string,
  EmployeId: string,
  dateVisite: string;
  type: string;
  cms_id: string;
  prescriptions?: string;
  observations?: string;
};

const ListRendezVous: React.FC = () => {
    const { medcinId } = useParams();
    const [visits, setVisits] = useState<Visit[]>([]);
    const [medcin, setMedcin] = useState();

    const fetchMedcin = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/medecins/${medcinId}`);
        const data = await response.json();
        setMedcin(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de medcin :', error);
      }
    };

    const fetchVisits = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/medecins/${medcinId}/visites-futures`);
        const data = await response.json();
        setVisits(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des visites :', error);
      }
    };

    useEffect(() => {  
      fetchMedcin();
      fetchVisits();
    }, []);
  
  return (
  <div className="p-6 m-2">

    ListRendezVous de {medcinId}

    <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-gray-700">Nom</th>
              {/* <th className="p-3 text-left text-gray-700">CMS id</th> */}
              <th className="p-3 text-left text-gray-700">Date/Heure</th>
              <th className="p-3 text-left text-gray-700">Médecin</th>
              <th className="p-3 text-left text-gray-700">Spécialité</th>
              <th className="p-3 text-left text-gray-700">Type</th>
              <th className="p-3 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {visits.length > 0 ? (
              visits.map((visit) => (
                  <RowRendezVous
                    key={visit.id}
                    rendezVous={visit}
                    nom_med={medcin?.nom}
                    specialite_med={medcin?.specialite}
                  />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-500">
                  Aucun rendez-vous trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

  </div>
  )
}

export default ListRendezVous