// import React from 'react'

import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

type Employer = {
  id: string;
  nom: string;
  matricule: string;
  post: string;
  email: string;
  phone: string;
  status: string;
};

interface EmployerRowProps {
  employer: Employer;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}


const EmployersRow: React.FC<EmployerRowProps> = ({ employer, onDelete, onUpdate }) => {
  const [showActions, setShowActions] = useState(false);

  const toggleActions = () => setShowActions((prev) => !prev);

  return (
    <tr className="hover:bg-gray-50 border-t">
      <td className="p-3">{employer.nom}</td>
      <td className="p-3">{employer.matricule}</td>
      <td className="p-3">{employer.post}</td>
      <td className="p-3">{employer.email}</td>
      <td className="p-3">{employer.phone}</td>
      <td className="p-3">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
          {employer.status}
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
                onDelete(employer.id);
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

export default EmployersRow