import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Medcin = {
    id: string;
    nom: string,
    prenom: string,
    specialite: string,
    adresseService: string,
  
    email: string,
    numTelephone: string,
    dateNaissance: string,
    lieuNaissance: string,
    wilayaNaissance: string,
    sexe: string,
    nationalite: string,
    adresse: string,
    created_at: string,
    updated_at: string
};

const MedcinDetails = () => {
    const { medcinId } = useParams();
    const [medcin, setMedcin] = useState<Medcin>()

      // State to handle loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to handle potential errors
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch Medcin by ID 
        const fetchMedcin = async () => {
            setIsLoading(true); 
            setError(null);

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/medecins/${medcinId}`);
        
                if (!response.ok) {
                  if (response.status === 404) {
                    throw new Error(`Médecin non trouvé (ID: ${medcinId})`);
                  } else {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                  }
                }
        
                const medcinData: Medcin = await response.json();
                setMedcin(medcinData); 
        
              } catch (err) {
                console.error("Erreur lors de la récupération du médecin:", err);
                setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
              } finally {
                setIsLoading(false);
              }
            
        };
    
        fetchMedcin();
      }, [medcinId]);

      if (isLoading) {
        return (
          <div className="p-4 text-center">
            Chargement des détails du médecin...
          </div>
        );
      }
    
      // Display error message
      if (error) {
        return (
          <div className="p-4 text-center text-red-600 bg-red-100 border border-red-400 rounded">
            <strong>Erreur:</strong> {error}
          </div>
        );
      }

      if (!medcin) {
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
              Dr. {medcin.prenom} {medcin.nom}
            </h2>
            <p><span className="font-semibold">Spécialité:</span> {medcin.specialite || 'N/A'}</p>
            <p><span className="font-semibold">Service / Hôpital:</span> {medcin.adresseService || 'N/A'}</p>
            <p><span className="font-semibold">Email:</span> {medcin.email || 'N/A'}</p>
            <p><span className="font-semibold">Téléphone:</span> {medcin.numTelephone || 'N/A'}</p>
          </div>
    
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Informations Personnelles
            </h3>
            <p><span className="font-semibold">Date de Naissance:</span> {medcin.dateNaissance || 'N/A'}</p>
            <p><span className="font-semibold">Lieu de Naissance:</span> {medcin.lieuNaissance || 'N/A'}</p>
            <p><span className="font-semibold">Wilaya de Naissance:</span> {medcin.wilayaNaissance || 'N/A'}</p>
            <p><span className="font-semibold">Sexe:</span> {medcin.sexe || 'N/A'}</p>
            <p><span className="font-semibold">Nationalité:</span> {medcin.nationalite || 'N/A'}</p>
            <p><span className="font-semibold">Adresse Personnelle:</span> {medcin.adresse || 'N/A'}</p>
          </div>
    
           {/* Optional: Administrative info (can be added similarly if needed) */}
           <div className="mt-6 pt-4 border-t">
             <h3 className="text-lg font-semibold mb-3 text-gray-700">
               Informations Administratives
             </h3>
             <p><span className="font-semibold">ID:</span> {medcin.id}</p>
             <p><span className="font-semibold">Date de Création:</span> {new Date(medcin.created_at).toLocaleString()}</p>
             <p><span className="font-semibold">Dernière Mise à Jour:</span> {new Date(medcin.updated_at).toLocaleString()}</p>
           </div>
          
        </div>
      );

}

export default MedcinDetails
