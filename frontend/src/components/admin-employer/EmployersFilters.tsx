import React from 'react'

//  feat/frontend-forms

interface EmployersFiltersProps {
  selectedPost: string;
  onFilterChange: (filters: { post: string }) => void;
}

const EmployersFilters: React.FC<EmployersFiltersProps> = ({ selectedPost, onFilterChange }) => {

  const handlePostChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ post: e.target.value });
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <label className="block text-sm font-medium text-gray-700">Type de Visite:</label>
        <select
          className="p-1 border rounded-md w-full sm:w-40"
          value={selectedPost}
          onChange={handlePostChange}
        >
          <option value="Tous">Tous</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Project Manager">Project Manager</option>
          <option value="HR Specialist">HR Specialist</option>

        </select>
      </div>
    </div>
  );

}

export default EmployersFilters