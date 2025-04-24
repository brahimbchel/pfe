import { useEffect, useState } from "react";
import { Link } from "react-router";

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

  interface Props {
    rendezVous: Visit;
    nom_med: string
    specialite_med: string
  }
  

const RowRendezVous: React.FC<Props> = ({ rendezVous, nom_med, specialite_med }) => {
    const [employe, setEmploye] = useState();

    useEffect(() => {
        const fetchEmp = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:8000/api/employes/${rendezVous?.EmployeId}`);
            const data = await response.json();
            setEmploye(data);
          } catch (error) {
            console.error('Erreur lors de la récupération de medcin :', error);
          }
        };
    
        fetchEmp();
  
      }, []);
      
  return (
    <tr className="border-t hover:bg-gray-50">
        <td className="p-3">{employe?.nom}</td>
        {/* <td className="p-3">{cms.nomCMS}</td> */}
        <td className="p-3">
            {new Date(rendezVous.dateVisite).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            })}
        </td>
        <td className="p-3">{nom_med}</td>
        <td className="p-3">{specialite_med}</td>
        <td className="p-3">
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">
            {rendezVous.type}
            </span>
        </td>
        <td className="text-white">
            <Link
                to={`${rendezVous.id}`}
                state={{ rendezVous }}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
            >
                Detail
            </Link>
        </td>
    </tr>
  )
}

export default RowRendezVous
