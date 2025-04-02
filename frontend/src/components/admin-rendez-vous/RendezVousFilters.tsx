
// --------------------------------------
// Filters Component
// --------------------------------------
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
    <div className="mb-6 flex gap-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-row items-center gap-2">
        <label className="block text-sm font-medium text-gray-700">Type de Visite:</label>
        <select
          className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="Tous">Tous</option>
          <option value="Périodique">Périodique</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div className="flex flex-row items-center gap-2">
        <label className="block text-sm font-medium">Spécialité:</label>
        <select
          className="p-1 border rounded"
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