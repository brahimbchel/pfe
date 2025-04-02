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
    <div className="mb-6 flex gap-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-row items-center gap-2">
        <label className="block text-sm font-medium text-gray-700">Type de Visite:</label>
        <select
          className="px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
  )
}

export default EmployersFilters