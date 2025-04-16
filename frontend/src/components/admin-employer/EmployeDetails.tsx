import { useEffect, useState } from "react";
import { useParams } from "react-router";

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

const EmployeDetails = () => {
    const { employeId } = useParams();
    const [employe, setEmploye] = useState<Employer>()
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmploye = async () => {
            setIsLoading(true); 
            setError(null);

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/employes/${employeId}`);
        
                if (!response.ok) {
                  if (response.status === 404) {
                    throw new Error(`Employe non trouvé (ID: ${employeId})`);
                  } else {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                  }
                }
        
                const employeData: Employer = await response.json();
                setEmploye(employeData); 
        
              } catch (err) {
                console.error("Erreur lors de la récupération du médecin:", err);
                setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
              } finally {
                setIsLoading(false);
              }
            
        };
    
        fetchEmploye();
      }, [employeId]);

      if (isLoading) {
        return (
          <div className="p-4 text-center">
            Chargement des détails du médecin...
          </div>
        );
      }
    
      if (error) {
        return (
          <div className="p-4 text-center text-red-600 bg-red-100 border border-red-400 rounded">
            <strong>Erreur:</strong> {error}
          </div>
        );
      }

      if (!employe) {
        return (
         <div className="p-4 text-center text-gray-600">
           Aucun détail de médecin à afficher.
         </div>
       );
     }
    
     return (
        <div className="p-4 md:p-8 font-sans max-w-2xl mx-auto"> {/* Added max-width and centering */}
           {/* Page Title */}
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
            Détails du Médecin
          </h1>
    
          {/* Professional Information Section */}
          <div className="mb-6 border-b pb-4 ">
            <h2 className="text-xl font-semibold mb-3 text-blue-600">
              Dr. {employe.prenom} {employe.nom}
            </h2>
            {/* <p><span className="font-semibold">Spécialité:</span> {employe.specialite || 'N/A'}</p>
            <p><span className="font-semibold">Service / Hôpital:</span> {employe.adresseService || 'N/A'}</p> */}
            <p><span className="font-semibold">Email:</span> {employe.email || 'N/A'}</p>
            <p><span className="font-semibold">Téléphone:</span> {employe.numTelephone || 'N/A'}</p>
          </div>
    
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Informations Personnelles
            </h3>
            <p><span className="font-semibold">Date de Naissance:</span> {employe.dateNaissance || 'N/A'}</p>
            <p><span className="font-semibold">Lieu de Naissance:</span> {employe.lieuNaissance || 'N/A'}</p>
            <p><span className="font-semibold">Wilaya de Naissance:</span> {employe.wilayaNaissance || 'N/A'}</p>
            <p><span className="font-semibold">Sexe:</span> {employe.sexe || 'N/A'}</p>
            <p><span className="font-semibold">Nationalité:</span> {employe.nationalite || 'N/A'}</p>
            <p><span className="font-semibold">Adresse Personnelle:</span> {employe.adresse || 'N/A'}</p>
          </div>
    
           {/* Optional: Administrative info (can be added similarly if needed) */}
           <div className="mt-6 pt-4 border-t">
             <h3 className="text-lg font-semibold mb-3 text-gray-700">
               Informations Administratives
             </h3>
             <p><span className="font-semibold">ID:</span> {employe.id}</p>
             <p><span className="font-semibold">Date de Création:</span> {new Date(employe.created_at).toLocaleString()}</p>
             <p><span className="font-semibold">Dernière Mise à Jour:</span> {new Date(employe.updated_at).toLocaleString()}</p>
           </div>
          
        </div>
      );

}

export default EmployeDetails
