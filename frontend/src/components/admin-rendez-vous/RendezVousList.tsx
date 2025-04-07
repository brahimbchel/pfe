import React, { useState } from 'react';
import RendezVousFilters from './RendezVousFilters';
import RendezVousRow from './RendezVousRow';
import { useNavigate } from 'react-router';


// fix the architecteur later
type RendezVous = {

  // user info
  // userId: string
  nom: string;
  matricule: string;

  // medcin info
  medcin: string;  // medcinId , medsinNom, medsinSpeciality
  speciality: string;

  // rendv info
  id: string; // id rndv
  datetime: Date;
  type: string;
};

const RendezVousList: React.FC = () => {
  // Temporary mock data - later replace with API data.
  const mockData: RendezVous[] = [
    {
      id: 'RDV1',
      nom: 'Ibrahim Boucheloui',
      matricule: '202031067120',
      datetime: new Date('2024-03-29T14:30'),
      medcin: 'Dr. Yuio',
      speciality: 'ORL',
      type: 'Périodique',
    },
    {
      id: 'RDV2',
      nom: 'Tammer Daoud',
      matricule: '212131067120',
      datetime: new Date('2024-04-03T10:30'),
      medcin: 'Dr. Xuio',
      speciality: 'Cardiologie',
      type: 'Urgent',
    },
  ];

  // Filter state
  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>('Toutes');

  // Handle filter changes from the filter component
  const handleFilterChange = (filters: { type: string; speciality: string }) => {
    setSelectedType(filters.type);
    setSelectedSpeciality(filters.speciality);
  };

  // Filter the data according to selected filters
  const filteredData = mockData.filter((item) => {
    const typeMatch = selectedType === 'Tous' || item.type === selectedType;
    const specialityMatch = selectedSpeciality === 'Toutes' || item.speciality === selectedSpeciality;
    return typeMatch && specialityMatch;
  });


  const handleDelete = (id: string) => {
    console.log(`Delete item with id: ${id}`);
  };

  const navigate = useNavigate()

  const handleUpdate = (id: string) => {
    console.log(`Update item with id: ${id}`);
    navigate(`/admin/rendez-vous/update/${id}`)
  };

  return (
    <div className="p-4">
      <RendezVousFilters
        selectedType={selectedType}
        selectedSpeciality={selectedSpeciality}
        onFilterChange={handleFilterChange}
      />

    <div className="overflow-x-auto">
      <table className="table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left text-gray-700">Nom</th>
            <th className="p-3 text-left text-gray-700">Matricule</th>
            <th className="p-3 text-left text-gray-700">Date/Heure</th>
            <th className="p-3 text-left text-gray-700">Médecin</th>
            <th className="p-3 text-left text-gray-700">Spécialité</th>
            <th className="p-3 text-left text-gray-700">Type</th>
            <th className="p-3 text-left text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <RendezVousRow
              key={item.id}
              rendezVous={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>

    </div>
  );
};

export default RendezVousList;
