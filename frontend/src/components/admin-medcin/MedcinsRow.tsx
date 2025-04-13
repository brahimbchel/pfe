import { PencilIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";

type Medcin = {
  id: string;
  nom: string,
  prenom: string,
  email: string,
  numTelephone: string,
  dateNaissance: string,
  lieuNaissance: string,
  wilayaNaissance: string,
  sexe: string,
  nationalite: string,
  specialite: string,
  adresse: string,
  adresseService: string,
  created_at: string,
  updated_at: string
};

  interface MedcinRowProps {
    medcin: Medcin;
    onDelete: (id: string) => void;
    onUpdate: (id: string) => void;
  }
  

const MedcinsRow: React.FC<MedcinRowProps> = ({ medcin, onDelete, onUpdate }) => {
    const [showActions, setShowActions] = useState(false);
    
    const toggleActions = () => setShowActions((prev) => !prev);
    

    return (
        <tr className="hover:bg-gray-50 border-t">
            <td className="p-3">{medcin.nom}</td>
            <td className="p-3">{medcin.id}</td>
            <td className="p-3">{medcin.specialite}</td> 
            <td className="p-3">{medcin.adresseService}</td>
            <td className="p-3">{medcin.email}</td>
            <td className="p-3">{medcin.numTelephone}</td>

            <td className="p-3 relative">
        <button onClick={toggleActions} className="focus:outline-none">
          <span className="text-2xl p-4">⋮</span>
        </button>
        {showActions && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10 overflow-hidden">
            <button
              className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
              onClick={() => {
                onUpdate(medcin.id);
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
                onDelete(medcin.id);
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
    )
}

export default MedcinsRow