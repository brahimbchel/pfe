import React, { useState } from 'react';
import RendezVousFilters from './RendezVousFilters';
import RendezVousRow from './RendezVousRow';

type RendezVous = {
  id: string;
  nom: string;
  matricule: string;
  datetime: Date;
  medcin: string;
  speciality: string;
  type: string;
};

const RendezVousList: React.FC = () => {
  // Temporary mock data - later replace with API data.
  const mockData: RendezVous[] = [
    {
      id: '1',
      nom: 'Ibrahim Boucheloui',
      matricule: '202031067120',
      datetime: new Date('2024-03-29T14:30'),
      medcin: 'Dr. Yuio',
      speciality: 'ORL',
      type: 'Périodique',
    },
    {
      id: '2',
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

  const handleUpdate = (id: string) => {
    console.log(`Update item with id: ${id}`);
  };

  return (
    <div className="p-4">
      <RendezVousFilters
        selectedType={selectedType}
        selectedSpeciality={selectedSpeciality}
        onFilterChange={handleFilterChange}
      />

      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Matricule</th>
            <th className="p-3 text-left">Date/Heure</th>
            <th className="p-3 text-left">Médecin</th>
            <th className="p-3 text-left">Spécialité</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <RendezVousRow key={item.id}
              rendezVous={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RendezVousList;
