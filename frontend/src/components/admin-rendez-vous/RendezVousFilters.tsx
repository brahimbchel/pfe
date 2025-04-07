interface RendezVousFiltersProps {
  selectedType: string;
  selectedSpeciality: string;
  onFilterChange: (filters: { type: string; speciality: string }) => void;
}

const RendezVousFilters: React.FC<RendezVousFiltersProps> = ({
  selectedType,
  selectedSpeciality,
  onFilterChange,
}) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ type: e.target.value, speciality: selectedSpeciality });
  };

  const handleSpecialityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ type: selectedType, speciality: e.target.value });
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <label className="block text-sm font-medium text-gray-700">Type de Visite:</label>
        <select
          className="p-1 border rounded-md w-full sm:w-40"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="Tous">Tous</option>
          <option value="Périodique">Périodique</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <label className="block text-sm font-medium">Spécialité:</label>
        <select
          className="p-1 border rounded w-full sm:w-40"
          value={selectedSpeciality}
          onChange={handleSpecialityChange}
        >
          <option value="Toutes">Toutes</option>
          <option value="ORL">ORL</option>
          <option value="Cardiologie">Cardiologie</option>
        </select>
      </div>
    </div>
  );
};

export default RendezVousFilters