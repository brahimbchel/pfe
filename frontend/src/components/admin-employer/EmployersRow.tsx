import { PencilIcon } from "lucide-react";
import { useState } from "react";


type Employer = {
  id: number;
  matricule: string;
  poste: string;
  departement: string;
  statutEmploye: string;
  nom: string;
  prenom: string;
};

interface EmployerRowProps {
  employer: Employer;
  ajouteVisite: (id: number) => void;
  onUpdate: (id: number) => void;
  moreDetailes: (id: number) => void;
}


const EmployersRow: React.FC<EmployerRowProps> = ({ employer, ajouteVisite, onUpdate, moreDetailes }) => {
  const [showActions, setShowActions] = useState(false);

  const toggleActions = () => setShowActions((prev) => !prev);

  return (
    <tr className="hover:bg-gray-50 border-t">
  <td className="p-3">{employer.matricule}</td>
  <td className="p-3">{employer.nom}</td>
  <td className="p-3">{employer.prenom}</td>
  <td className="p-3">{employer.poste}</td>
  <td className="p-3">{employer.departement}</td>
  <td className="p-3"> <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{employer.statutEmploye}</span></td>
      

      <td className="p-3 relative">
        <button onClick={toggleActions} className="focus:outline-none">
          <span className="text-2xl p-4">⋮</span>
        </button>
        {showActions && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10 overflow-hidden">
            <button
              className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
              onClick={() => {
                onUpdate(employer.id);
                setShowActions(false);
              }}
            >
              <span className="flex items-center gap-2">
                <PencilIcon className="w-4 h-4" />
                Modifier
              </span>
            </button>

            <button
              onClick={() => {
                ajouteVisite(employer.id);
                setShowActions(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                {/* <Trash2Icon className="w-4 h-4" /> */}
                Ajoute Rendez-Vous
              </span>
            </button>

            <button
              onClick={() => {
                moreDetailes(employer.id);
                setShowActions(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                {/* <Trash2Icon className="w-4 h-4" /> */}
                Details
              </span>
            </button>

          </div>
        )}
      </td>
    </tr>
  )
}

export default EmployersRow