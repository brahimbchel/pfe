import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

type RendezVous = {
  id: string;
  dateVisite: string;
  type: string;
  medecin_nom: string;
  medecin_prenom: string;
  specialite: string;
  employe_nom: string;
  employe_prenom: string;
  employe_departement: string;
  employe_poste?: string;
};

interface Props {
  rendezVous: RendezVous;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}


const RendezVousRow: React.FC<Props> = ({ rendezVous, onDelete, onUpdate }) => {
  const [showActions, setShowActions] = useState(false);
  const toggleActions = () => setShowActions((prev) => !prev);

  // till get the cms/:id route from backend
  // const [cms, setCms] = useState('');

  // // get cms name from cms_id
  // useEffect(() => {
  //   const getCmsById = async () => {
  //     const res = await fetch(`http://127.0.0.1:8000/api/cms/${cms_id}`)
  //     const data = await res.json()

  //     setCms(data)
  //   }
  // }, [rendezVous.cms_id])


  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3">{rendezVous.employe_nom}</td>
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
      <td className="p-3">{rendezVous.medecin_nom}</td>
      <td className="p-3">{rendezVous.specialite}</td>
      <td className="p-3">
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-medium">
          {rendezVous.type}
        </span>
      </td>
      <td className="p-3 relative">
        <button onClick={toggleActions} className="focus:outline-none text-xl">
          ⋮
        </button>
        {showActions && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow z-10">
            <button
              onClick={() => {
                onUpdate(rendezVous.id);
                setShowActions(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 flex items-center gap-2"
            >
              <PencilIcon className="w-4 h-4" /> Modifier
            </button>
            <button
              onClick={() => {
                onDelete(rendezVous.id);
                setShowActions(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
            >
              <Trash2Icon className="w-4 h-4" /> Supprimer
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default RendezVousRow;
