import React, { useState } from "react";
import MedcinsRow from "./MedcinsRow";
import MedcinsFilters from "./MedcinsFilters";
import { useNavigate } from "react-router";

type Medcin = {
    id: string;
    nom: string;
    matricule: string;
    speciality: string;
    email: string;
    phone: string;
  };

const MedcinsList: React.FC = () => {
  const navigate = useNavigate();


    const medcins: Medcin[] = [
        {
          id: "MED1",
          nom: "Dr.Ahmed Benali",
          matricule: "MDC12345",
          speciality: "Cardiologist",
          email: "abenali@example.com",
          phone: "+213661234567",
        },
        {
          id: "MED2",
          nom: "Dr.Fatima Zeroual",
          matricule: "MDC12346",
          speciality: "Dermatologist",
          email: "fzeroual@example.com",
          phone: "+213662345678",
        },
        {
          id: "MED3",
          nom: "Dr.Samir Bouziid",
          matricule: "MDC12347",
          speciality: "Neurologist",
          email: "sbouzid@exMEDample.com",
          phone: "+213663456789",
        },
        {
          id: "MED4",
          nom: "Dr.Laila Mansouri",
          matricule: "MDC12348",
          speciality: "Pediatrician",
          email: "lmansouri@example.com",
          phone: "+213664567890",
        },
        {
          id: "MED5",
          nom: "Dr. Rachid Khellaf",
          matricule: "MDC12349",
          speciality: "Orthopedic Surgeon",
          email: "rkhellaf@example.com",
          phone: "+213665678901",
        },
      ];

        const [speciality, setSpeciality] = useState<string>('Tous');

        const handleFilterChange = (filters: { speciality: string }) => {
            setSpeciality(filters.speciality);
        };

        const filteredData = medcins.filter((medcin) => {
            const specialityMatch = speciality === 'Tous' || medcin.speciality === speciality;
            return specialityMatch
        });


        const handleDelete = (id: string) => {
            console.log(`Delete Employer with id: ${id}`);
          };
        
        const handleUpdate = (id: string) => {
          // console.log(`Update Employer with id: ${id}`);
          navigate(`/admin/medcin/update/${id}`)
        };


    return (
        <div>
          <MedcinsFilters 
              selectedSpeciality={speciality}
              onFilterChange={handleFilterChange}
          />
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Nom</th>
                  <th className="p-3 text-left">Matricule</th>
                  <th className="p-3 text-left">Speciality</th>
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