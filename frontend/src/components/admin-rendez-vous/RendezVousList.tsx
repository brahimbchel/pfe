import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import RendezVousRow from './RendezVousRow';

type Visit = {
  id: string;
  dateVisite: string;
  type: string;
  medecin_nom: string;
  medecin_prenom: string;
  specialite: string;
  employe_nom: string;
  employe_prenom: string;
  employe_departement: string;
  employe_poste?: string;
};

const RendezVousList: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/visites');
        const data = await response.json();
        setVisits(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des visites :', error);
      }
    };

    fetchVisits();
  }, []);

  const handleDelete = (id: string) => {
    console.log(`Delete visit with id: ${id}`);
    // TODO: implement delete logic
  };

  const handleUpdate = (id: string) => {
    navigate(`/admin/rendez-vous/update/${id}`);
  };

  return (
    <div className="p-4">
      {/* Filter Component Placeholder */}
      {/* <RendezVousFilters onFilterChange={handleFilterChange} /> */}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-gray-700">Nom</th>
              {/* <th className="p-3 text-left text-gray-700">CMS id</th> */}
              <th className="p-3 text-left text-gray-700">Date/Heure</th>
              <th className="p-3 text-left text-gray-700">Médecin</th>
              <th className="p-3 text-left text-gray-700">Spécialité</th>
              <th className="p-3 text-left text-gray-700">Type</th>
              <th className="p-3 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {visits.length > 0 ? (
              visits.map((visit) => (
                <RendezVousRow
                  key={visit.id}
                  rendezVous={visit}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-500">
                  Aucun rendez-vous trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RendezVousList;






// import React, { useEffect, useState } from 'react';
// import RendezVousFilters from './RendezVousFilters';
// import RendezVousRow from './RendezVousRow';
// import { useNavigate } from 'react-router';


// // body in the POST request to create a visit
// // {
// //   "dateVisite": "2025-04-01 10:00:00",
// //   "MedecinId":"3",
// //   "EmployeId":"1",
// //   "cms_id":"2",
// //   "type":"AccidentDeTravail"
// // }


// // type in type visit body:
// // const ADMISSION = 'Admission';
// // const PERIODIQUE = 'Periodique';
// // const SPONTANE = 'Spontané';
// // const REPRISE = 'Reprise';
// // const CONTROLE = 'Contrôle';
// // const ACCIDENT_DE_TRAVAIL = 'AccidentDeTravail';
// // const CONTRE_VISITE = 'ContreVisite';
// // const REINTEGRATION = 'Réintégration';


// // fix the architecteur later
// type RendezVous = {

//   // user info
//   // userId: string
//   nom: string;
//   matricule: string;

//   // medcin info
//   medcin: string;  // medcinId , medsinNom, medsinSpeciality
//   speciality: string;

//   // rendv info
//   id: string; // id rndv
//   datetime: Date;
//   type: string;
// };

// type Visit = {
//   id: string,
//   dateVisite: string,
//   type:  string,
//   cms_id: string,
//   prescriptions?:  string,
//   observations?:  string,
//   medecin_nom:  string,
//   medecin_prenom:  string,
//   medecin_numTelephone:  string,
//   specialite:  string,
//   employe_nom:  string,
//   employe_prenom:  string,
//   employe_numTelephone:  string,
//   employe_departement:  string,
//   employe_poste?:  string
// }

// const RendezVousList: React.FC = () => {
//   const [visits, setVisits] = useState<Visit>()

//   // const [selectedType, setSelectedType] = useState<string>('Tous');
//   // const [selectedSpeciality, setSelectedSpeciality] = useState<string>('Toutes');

//   useEffect(() => {
//     const getAllVisits = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/visites`)
//         const visitData = await response.json()

//         setVisits(visitData)
//       } catch (error) {
//         console.log(error)
//       } finally {

//       }
//     }

//     getAllVisits()
    
//   }, [])


//   // Handle filter changes from the filter component
//   // const handleFilterChange = (filters: { type: string; speciality: string }) => {
//   //   setSelectedType(filters.type);
//   //   setSelectedSpeciality(filters.speciality);
//   // };

//   // // Filter the data according to selected filters
//   // const filteredData = mockData.filter((item) => {
//   //   const typeMatch = selectedType === 'Tous' || item.type === selectedType;
//   //   const specialityMatch = selectedSpeciality === 'Toutes' || item.speciality === selectedSpeciality;
//   //   return typeMatch && specialityMatch;
//   // });


//   const handleDelete = (id: string) => {
//     console.log(`Delete item with id: ${id}`);
//   };

//   const navigate = useNavigate()

//   const handleUpdate = (id: string) => {
//     console.log(`Update item with id: ${id}`);
//     navigate(`/admin/rendez-vous/update/${id}`)
//   };

//   return (
//     <div className="p-4">
//       {/* <RendezVousFilters
//         selectedType={selectedType}
//         selectedSpeciality={selectedSpeciality}
//         onFilterChange={handleFilterChange}
//       /> */}

//     <div className="">
//       <table className="w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="p-3 text-left text-gray-700">Nom</th>
//             <th className="p-3 text-left text-gray-700">Matricule</th>
//             <th className="p-3 text-left text-gray-700">Date/Heure</th>
//             <th className="p-3 text-left text-gray-700">Médecin</th>
//             <th className="p-3 text-left text-gray-700">Spécialité</th>
//             <th className="p-3 text-left text-gray-700">Type</th>
//             <th className="p-3 text-left text-gray-700">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {visits.map((item) => (
//             <RendezVousRow
//               key={item.id}
//               rendezVous={item}
//               onDelete={handleDelete}
//               onUpdate={handleUpdate}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>

//     </div>
//   );
// };

// export default RendezVousList;
