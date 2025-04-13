import React from 'react'

interface MedcinFiltersProps {
    selectedSpecialite: string;
    onFilterChange: (filters: { specialite: string }) => void;
  }

  
const MedcinsFilters: React.FC<MedcinFiltersProps> = ({selectedSpecialite, onFilterChange}) => {
    const handlespecialiteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({ specialite: e.target.value });
      };

    return (
      <div className="mb-6 flex flex-col sm:flex-row gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700">Type de Visite:</label>
          <select
            className="p-1 border rounded-md w-full sm:w-40"
            value={selectedSpecialite}
          onChange={handlespecialiteChange}
        >
            <option value="Tous">Tous</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="General Practitioner">General Practitioner</option>
            <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="Oncologist">Oncologist</option>

          </select>
        </div>
  
        
      </div>
    );
}

export default MedcinsFilters