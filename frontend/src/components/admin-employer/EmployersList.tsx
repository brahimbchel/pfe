import React, { useState } from "react";
import EmployersFilters from "./EmployersFilters";
import EmployersRow from "./EmployersRow";

type Employer = {
  id: string;
  nom: string;
  matricule: string;
  post: string;
  email: string;
  phone: string;
  status: string;
};

const EmployersList: React.FC = () => {

  const mockData: Employer[] = [
    {
      id: "1a2b3c4d",
      nom: "Ali Ben Salem",
      matricule: "EMP1234567",
      post: "Software Engineer",
      email: "ali.bensalem@example.com",
      phone: "+213 650 123 456",
      status: "Active",
    },
    {
      id: "2b3c4d5e",
      nom: "Sofia Lamine",
      matricule: "EMP2345678",
      post: "Project Manager",
      email: "sofia.lamine@example.com",
      phone: "+213 770 987 654",
      status: "On Leave",
    },
    {
      id: "3c4d5e6f",
      nom: "Yassine Kacem",
      matricule: "EMP3456789",
      post: "HR Specialist",
      email: "yassine.kacem@example.com",
      phone: "+213 555 456 789",
      status: "Inactive",
    },
  ];

  // Filter state
  const [post, setPost] = useState<string>('Tous');

  // Handle filter changes from the filter component
  const handleFilterChange = (filters: { post: string }) => {
    setPost(filters.post);
  };

  // Filter the data according to selected filters
  const filteredData = mockData.filter((user) => {
    const postMatch = post === 'Tous' || user.post === post;
    return postMatch
  });

  const handleDelete = (id: string) => {
    console.log(`Delete Employer with id: ${id}`);
  };

  const handleUpdate = (id: string) => {
    console.log(`Update Employer with id: ${id}`);
  };


  return (
    <div>
      <EmployersFilters
        selectedPost={post}
        onFilterChange={handleFilterChange}
      />

      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Matricule</th>
            <th className="p-3 text-left">Post</th>
            <th className="p-3 text-left">phone</th>
            <th className="p-3 text-left">email</th>
            <th className="p-3 text-left">status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((employer) => (

            <EmployersRow key={employer.id}
              employer={employer}
              onDelete={handleDelete}
              onUpdate={handleUpdate} />
          ))}

        </tbody>
      </table>

    </div>
  )
}

export default EmployersList