import { useEffect, useState } from "react";
import { useParams } from "react-router"; // Assuming react-router-dom v6+
// Import icons from lucide-react
import {
    Stethoscope,    // Specific for Medcin Specialty/Header
    Mail,
    Phone,
    MapPin,         // For addresses
    Building,       // For Service Address (Hospital/Clinic)
    CalendarDays,
    UserCircle2,    // For Personal Details section / Fallback Header
    Info,
    Clock,
    CheckCircle2,
    XCircle,
    Loader2,        // For loading spinner
    HeartPulse      // Alt icon for specialty if needed
} from 'lucide-react';

// --- Corrected Type Definition based on API response ---
type Medcin = {
    id: number; // API shows number
    nom: string;
    nomConjoint: string | null; // Present in API example
    prenom: string;
    email: string;
    numTelephone: string;
    dateNaissance: string; // Keep as string, format on display
    lieuNaissance: string;
    wilayaNaissance: string;
    adresse: string;
    wilaya: string; // Present in API example
    sexe: string;
    nationalite: string;
    statut: "actif" | "inactif" | string; // Present in API example
    specialite: string;
    adresseService: string;
    created_at: string; // Keep as string, format on display
    updated_at: string; // Keep as string, format on display
};

// --- Reusable Helper Component for Detail Items (same as before) ---
interface DetailItemProps {
    label: string;
    value: string | number | null | undefined;
    icon?: React.ElementType;
    className?: string;
    isStatus?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, icon: Icon, className = "", isStatus = false }) => {
    const displayValue = value !== null && value !== undefined && value !== "" ? value : <span className="text-gray-400 italic">N/A</span>;

    const renderValue = () => {
        if (isStatus) {
            const isActive = typeof value === 'string' && value.toLowerCase() === 'actif';
            return (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isActive ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
                    {displayValue}
                </span>
            );
        }
        // Format date strings if they look like standard date formats
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
             return <span className="text-gray-900">{new Date(value).toLocaleDateString('fr-DZ')}</span>; // Using fr-DZ locale example
        }
         // Format datetime strings
        if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(value)) {
            return <span className="text-gray-900">{new Date(value).toLocaleString('fr-DZ')}</span> // Using fr-DZ locale example
        }
        return <span className="text-gray-900">{displayValue}</span>;
    };

    return (
        <div className={`py-2 sm:grid sm:grid-cols-3 sm:gap-4 ${className}`}>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
                {Icon && <Icon className="h-5 w-5 mr-2 text-gray-400 stroke-current" strokeWidth={1.5} aria-hidden="true" />}
                {label}
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                {renderValue()}
            </dd>
        </div>
    );
};


// --- Main MedcinDetails Component ---
const MedcinDetails = () => {
    const { medcinId } = useParams<{ medcinId: string }>();
    const [medcin, setMedcin] = useState<Medcin | null>(null); // Initialize with null
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!medcinId) {
            setError("ID du médecin manquant dans l'URL.");
            setIsLoading(false);
            return;
        }

        const fetchMedcin = async () => {
            setIsLoading(true);
            setError(null);
            setMedcin(null); // Reset on new fetch

            try {
                // Simulate delay for testing
                // await new Promise(resolve => setTimeout(resolve, 1000));

                const response = await fetch(`http://127.0.0.1:8000/api/medecins/${medcinId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`Médecin non trouvé (ID: ${medcinId})`);
                    } else {
                         // Include status text for more context
                        throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
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
    }, [medcinId]); // Re-fetch if medcinId changes

    // --- Render Logic ---

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="text-center p-6">
                    <Loader2 className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" strokeWidth={2} />
                    <p className="text-lg font-medium text-gray-600">Chargement des détails du médecin...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 md:p-8 max-w-3xl mx-auto">
                 <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md" role="alert"> {/* Added rounded */}
                    <div className="flex">
                        <div className="py-1">
                            <XCircle className="h-6 w-6 text-red-500 mr-3 stroke-current" strokeWidth={2}/>
                        </div>
                        <div>
                            <p className="font-bold text-red-800">Erreur</p>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!medcin) {
        // Should ideally be caught by error state if fetch fails/404s, but good fallback.
        return (
            <div className="p-4 md:p-8 text-center text-gray-500 max-w-3xl mx-auto">
                Aucun détail de médecin trouvé pour l'ID: {medcinId}.
            </div>
        );
    }

    // --- Main Content Display ---
    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-white"> {/* Changed gradient */}
                    <div className="flex items-center space-x-4">
                        <Stethoscope className="h-16 w-16 text-white opacity-90 stroke-current" strokeWidth={1}/>
                        <div>
                            <h1 className="text-3xl font-bold">Dr. {medcin.prenom} {medcin.nom}</h1>
                            <p className="text-lg text-cyan-100">{medcin.specialite || 'Spécialité non spécifiée'}</p>
                        </div>
                    </div>
                </div>

                {/* Details Sections */}
                <div className="p-6 space-y-8">

                    {/* Section: Informations Professionnelles et Contact */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                            <Stethoscope className="h-6 w-6 mr-2 text-teal-600 stroke-current" strokeWidth={1.5}/> Informations Professionnelles et Contact
                        </h2>
                        <dl className="divide-y divide-gray-200">
                            <DetailItem label="Spécialité" value={medcin.specialite} icon={HeartPulse}/> {/* Repeating specialty for clarity */}
                            <DetailItem label="Adresse du Service" value={medcin.adresseService} icon={Building}/>
                            <DetailItem label="Email Professionnel" value={medcin.email} icon={Mail}/>
                            <DetailItem label="Téléphone Professionnel" value={medcin.numTelephone} icon={Phone}/>
                             <DetailItem label="Statut" value={medcin.statut} isStatus={true} />
                        </dl>
                    </section>

                    {/* Section: Informations Personnelles */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                           <UserCircle2 className="h-6 w-6 mr-2 text-teal-600 stroke-current" strokeWidth={1.5}/> Détails Personnels
                        </h2>
                        <dl className="divide-y divide-gray-200">
                            <DetailItem label="Date de Naissance" value={medcin.dateNaissance} icon={CalendarDays} />
                            <DetailItem label="Lieu de Naissance" value={medcin.lieuNaissance} icon={MapPin}/>
                            <DetailItem label="Wilaya de Naissance" value={medcin.wilayaNaissance} icon={MapPin}/>
                            <DetailItem label="Sexe" value={medcin.sexe} />
                            <DetailItem label="Nationalité" value={medcin.nationalite} />
                             <DetailItem label="Adresse Personnelle" value={medcin.adresse} icon={MapPin}/>
                            <DetailItem label="Wilaya (Résidence)" value={medcin.wilaya} icon={MapPin}/>
                            {/* Optionally display nomConjoint if needed, but often omitted */}
                            {/* {medcin.nomConjoint && <DetailItem label="Nom du Conjoint" value={medcin.nomConjoint} />} */}
                        </dl>
                    </section>

                    {/* Section: Informations Administratives */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                            <Info className="h-6 w-6 mr-2 text-teal-600 stroke-current" strokeWidth={1.5}/> Informations Administratives
                        </h2>
                        <dl className="divide-y divide-gray-200">
                            <DetailItem label="ID Médecin" value={medcin.id} />
                            <DetailItem label="Date de Création" value={medcin.created_at} icon={Clock} />
                            <DetailItem label="Dernière Mise à Jour" value={medcin.updated_at} icon={Clock} />
                        </dl>
                    </section>
                </div>

                {/* Optional Footer */}
                {/* <div className="p-4 bg-gray-50 border-t text-right">
                     <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Modifier</button>
                </div> */}
            </div>
        </div>
    );
};

export default MedcinDetails;





















// import { useEffect, useState } from "react";
// import { useParams } from "react-router";

// type Medcin = {
//     id: string;
//     nom: string,
//     prenom: string,
//     specialite: string,
//     adresseService: string,
  
//     email: string,
//     numTelephone: string,
//     dateNaissance: string,
//     lieuNaissance: string,
//     wilayaNaissance: string,
//     sexe: string,
//     nationalite: string,
//     adresse: string,
//     created_at: string,
//     updated_at: string
// };

// const MedcinDetails = () => {
//     const { medcinId } = useParams();
//     const [medcin, setMedcin] = useState<Medcin>()

//       // State to handle loading status
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   // State to handle potential errors
//   const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         // Fetch Medcin by ID 
//         const fetchMedcin = async () => {
//             setIsLoading(true); 
//             setError(null);

//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/api/medecins/${medcinId}`);
        
//                 if (!response.ok) {
//                   if (response.status === 404) {
//                     throw new Error(`Médecin non trouvé (ID: ${medcinId})`);
//                   } else {
//                     throw new Error(`Erreur HTTP: ${response.status}`);
//                   }
//                 }
        
//                 const medcinData: Medcin = await response.json();
//                 setMedcin(medcinData); 
        
//               } catch (err) {
//                 console.error("Erreur lors de la récupération du médecin:", err);
//                 setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
//               } finally {
//                 setIsLoading(false);
//               }
            
//         };
    
//         fetchMedcin();
//       }, [medcinId]);

//       if (isLoading) {
//         return (
//           <div className="p-4 text-center">
//             Chargement des détails du médecin...
//           </div>
//         );
//       }
    
//       // Display error message
//       if (error) {
//         return (
//           <div className="p-4 text-center text-red-600 bg-red-100 border border-red-400 rounded">
//             <strong>Erreur:</strong> {error}
//           </div>
//         );
//       }

//       if (!medcin) {
//         return (
//          <div className="p-4 text-center text-gray-600">
//            Aucun détail de médecin à afficher.
//          </div>
//        );
//      }
    
//      return (
//         <div className="p-4 md:p-8 font-sans max-w-2xl mx-auto"> {/* Added max-width and centering */}
//            {/* Page Title */}
//           <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
//             Détails du Médecin
//           </h1>
    
//           {/* Professional Information Section */}
//           <div className="mb-6 border-b pb-4 ">
//             <h2 className="text-xl font-semibold mb-3 text-blue-600">
//               Dr. {medcin.prenom} {medcin.nom}
//             </h2>
//             <p><span className="font-semibold">Spécialité:</span> {medcin.specialite || 'N/A'}</p>
//             <p><span className="font-semibold">Service / Hôpital:</span> {medcin.adresseService || 'N/A'}</p>
//             <p><span className="font-semibold">Email:</span> {medcin.email || 'N/A'}</p>
//             <p><span className="font-semibold">Téléphone:</span> {medcin.numTelephone || 'N/A'}</p>
//           </div>
    
//           {/* Personal Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-700">
//               Informations Personnelles
//             </h3>
//             <p><span className="font-semibold">Date de Naissance:</span> {medcin.dateNaissance || 'N/A'}</p>
//             <p><span className="font-semibold">Lieu de Naissance:</span> {medcin.lieuNaissance || 'N/A'}</p>
//             <p><span className="font-semibold">Wilaya de Naissance:</span> {medcin.wilayaNaissance || 'N/A'}</p>
//             <p><span className="font-semibold">Sexe:</span> {medcin.sexe || 'N/A'}</p>
//             <p><span className="font-semibold">Nationalité:</span> {medcin.nationalite || 'N/A'}</p>
//             <p><span className="font-semibold">Adresse Personnelle:</span> {medcin.adresse || 'N/A'}</p>
//           </div>
    
//            {/* Optional: Administrative info (can be added similarly if needed) */}
//            <div className="mt-6 pt-4 border-t">
//              <h3 className="text-lg font-semibold mb-3 text-gray-700">
//                Informations Administratives
//              </h3>
//              <p><span className="font-semibold">ID:</span> {medcin.id}</p>
//              <p><span className="font-semibold">Date de Création:</span> {new Date(medcin.created_at).toLocaleString()}</p>
//              <p><span className="font-semibold">Dernière Mise à Jour:</span> {new Date(medcin.updated_at).toLocaleString()}</p>
//            </div>
          
//         </div>
//       );

// }

// export default MedcinDetails
