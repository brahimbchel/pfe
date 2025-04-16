import React, { useEffect, useState } from "react";
import EmployersFilters from "./EmployersFilters";
import EmployersRow from "./EmployersRow";
import { useNavigate } from "react-router";

type Employer = {
  id: number;
  matricule: string;
  fonction: string;
  poste: string;
  departement: string;

  situationFamille: string;
  groupeSanguin: string;
  rh: string;
  formationScolaire: string;
  formationProfessionnelle: string;
  qualificationProfessionnelle: string;
  numSecuSocial: string;
  statutEmploye: string;
  created_at: string;
  updated_at: string;

  nom: string;
  prenom: string;
  email: string;
  numTelephone: string;
  dateNaissance: string;
  lieuNaissance: string;
  wilayaNaissance: string;
  adresse: string;
  sexe: string;
  nationalite: string;
};

const EmployersList: React.FC = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [employers, setEmployers] = useState<Employer[]>([]);

  useEffect(() => {

    const fetchEmployers = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("http://127.0.0.1:8000/api/employes")
        const employersData  = await response.json()
        setEmployers(employersData )
      } catch (error: any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployers()
  }, [])


  // Filter state
  const [post, setPost] = useState<string>('Tous');  // post de travaille

  // Handle filter changes from the filter component
  const handleFilterChange = (filters: { post: string }) => {
    setPost(filters.post);
  };

  // Filter the data according to selected filters
  const filteredData = employers.filter((user) => {
    const postMatch = post === 'Tous' || user.poste === post;
    return postMatch
  });

  const handleAjouteVisite = (id: number) => {
    // console.log(`Delete Employer with id: ${id}`);
    navigate(`/admin/rendez-vous/ajoute-rendez-vous/${id}`)
  };

  const handleUpdate = (id: number) => {
    // console.log(`Update Employer with id: ${id}`);
    navigate(`/admin/employers/update/${id}`)
  };

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (error) {
    return <div>somthing went wrong, try again && {error}</div>
  }

  return (
    <div>
      <EmployersFilters
        selectedPost={post}
        onFilterChange={handleFilterChange}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Matricule</th>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Prénom</th>
            <th className="p-3 text-left">Sexe</th>
            <th className="p-3 text-left">Date de Naissance</th>
            <th className="p-3 text-left">Lieu de Naissance</th>
            <th className="p-3 text-left">Adresse</th>
            <th className="p-3 text-left">Téléphone</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

          <tbody>
            {filteredData.map((employer) => (
              <EmployersRow
                key={employer.id}
                employer={employer}
                ajouteVisite={handleAjouteVisite}
                onUpdate={handleUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default EmployersList