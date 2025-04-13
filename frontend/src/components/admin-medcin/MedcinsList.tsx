import React, { useEffect, useState } from "react";
import MedcinsRow from "./MedcinsRow";
import MedcinsFilters from "./MedcinsFilters";
import { useNavigate } from "react-router";

type Medcin = {
    id: string;
    nom: string,
    prenom: string,
    email: string,
    numTelephone: string,
    dateNaissance: string,
    lieuNaissance: string,
    wilayaNaissance: string,
    sexe: string,
    nationalite: string,
    specialite: string,
    adresse: string,
    adresseService: string,
    created_at: string,
    updated_at: string
  };

const MedcinsList: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [medcins, setMedcins] = useState<Medcin[]>([])
  
  useEffect(() => {
    const getAllMedcins = async () => {
      try {
        setIsLoading(true); 
  
        const response = await fetch("http://127.0.0.1:8000/api/medecins");
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const medecinsData = await response.json();
        setMedcins(medecinsData);
  
      } catch (error: any) {
        setError(error.message)
        console.error("Failed to fetch medecins:", error);
      } finally {
        setIsLoading(false); 
      }
    }

    getAllMedcins()
  }, [])

        const [specialite, setSpecialite] = useState<string>('Tous');

        const handleFilterChange = (filters: { specialite: string }) => {
            setSpecialite(filters.specialite);
        };

        const filteredData = medcins.filter((medcin) => {
            const specialiteMatch = specialite === 'Tous' || medcin.specialite === specialite;
            return specialiteMatch
        });


        const handleDelete = (id: string) => {
            console.log(`Delete Employer with id: ${id}`);
          };
        
        const handleUpdate = (id: string) => {
          // console.log(`Update Employer with id: ${id}`);
          navigate(`/admin/medcin/update/${id}`)
        };

        if (isLoading) {
          return <div>Loading ...</div>
        }
      
        if (error) {
          return <div>somthing went wrong, try again && {error}</div>
        }

    return (
        <div>
          <MedcinsFilters 
              selectedSpecialite={specialite}
              onFilterChange={handleFilterChange}
          />
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Nom</th>
                  <th className="p-3 text-left">Matricule</th>
                  <th className="p-3 text-left">specialite</th> 
                  <th className="p-3 text-left">adresse service</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((medcin) => (
                  <MedcinsRow
                    key={medcin.id}
                    medcin={medcin}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
    )
}

export default MedcinsList