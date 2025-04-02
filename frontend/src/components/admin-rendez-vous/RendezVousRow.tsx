import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

type RendezVous = {
  id: string;
  nom: string;
  matricule: string;
  datetime: Date;
  medcin: string;
  speciality: string;
  type: string;
};

interface RendezVousRowProps {
  rendezVous: RendezVous;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

const RendezVousRow: React.FC<RendezVousRowProps> = ({ rendezVous, onDelete, onUpdate }) => {
  const [showActions, setShowActions] = useState(false);

  const toggleActions = () => setShowActions((prev) => !prev);

  return (
    <tr className="hover:bg-gray-50 border-t">
      <td className="p-3">{rendezVous.nom}</td>
      <td className="p-3">{rendezVous.matricule}</td>
      <td className="p-3">
        {new Date(rendezVous.datetime).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </td>
      <td className="p-3">{rendezVous.medcin}</td>
      <td className="p-3">{rendezVous.speciality}</td>
      <td className="p-3">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
          {rendezVous.type}
        </span>
      </td>

      <td className="p-3 relative">
        <button onClick={toggleActions} className="focus:outline-none">
          <span className="text-2xl p-4">⋮</span>
        </button>
        {showActions && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10 overflow-hidden">
            <button
              className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
              onClick={() => {
                onUpdate(rendezVous.id);
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
                onDelete(rendezVous.id);
                setShowActions(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <span className="flex items-center gap-2">
                <Trash2Icon className="w-4 h-4" />
                Delete
              </span>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default RendezVousRow