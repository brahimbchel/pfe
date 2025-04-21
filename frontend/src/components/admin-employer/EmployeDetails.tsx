import { useEffect, useState } from "react";
import { useParams } from "react-router";
// Import icons from lucide-react
import {
    UserCircle2,     
    Briefcase,       
    GraduationCap,   
    IdCard,             
    CalendarDays,    
    MapPin,          
    Mail,            
    Phone,         
    Info,            
    CheckCircle2,    
    XCircle,         
    Clock,           
    Loader2          
} from 'lucide-react';

// --- Type Definition (Corrected based on API response) ---
type Employer = {
    id: number;
    nom: string;
    nomConjoint: string | null;
    prenom: string;
    email: string;
    numTelephone: string;
    matricule: string;
    dateNaissance: string;
    lieuNaissance: string;
    wilayaNaissance: string;
    adresse: string;
    wilaya: string;
    sexe: string;
    nationalite: string;
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
    serviceNational: string;
    statut: "actif" | "inactif" | string;
    created_at: string;
    updated_at: string;
};

// --- Helper Component for Detail Items ---
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
             return <span className="text-gray-900">{new Date(value).toLocaleDateString('fr-DZ')}</span>;
        }
        if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/.test(value)) {
            return <span className="text-gray-900">{new Date(value).toLocaleString('fr-DZ')}</span>
        }
        return <span className="text-gray-900">{displayValue}</span>;
    };

    return (
        <div className={`py-2 sm:grid sm:grid-cols-3 sm:gap-4 ${className}`}>
            <dt className="text-sm font-medium text-gray-500 flex items-center">
                {/* Lucide icons often use strokeWidth, adjust size with h/w */}
                {Icon && <Icon className="h-5 w-5 mr-2 text-gray-400 stroke-current" strokeWidth={1.5} aria-hidden="true" />}
                {label}
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                {renderValue()}
            </dd>
        </div>
    );
};


// --- Main Component ---
const EmployeDetails = () => {
    const { employeId } = useParams<{ employeId: string }>();
    const [employe, setEmploye] = useState<Employer | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!employeId) {
            setError("ID de l'employé manquant dans l'URL.");
            setIsLoading(false);
            return;
        }

        const fetchEmploye = async () => {
            setIsLoading(true);
            setError(null);
            setEmploye(null);

            try {
                // Simulate network delay for testing loader
                // await new Promise(resolve => setTimeout(resolve, 1500));

                const response = await fetch(`http://127.0.0.1:8000/api/employes/${employeId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`Employé non trouvé (ID: ${employeId})`);
                    } else {
                        throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
                    }
                }

                const employeData: Employer = await response.json();
                setEmploye(employeData);

            } catch (err) {
                console.error("Erreur lors de la récupération de l'employé:", err);
                setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmploye();
    }, [employeId]);

    // --- Render Logic ---

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="text-center p-6">
                    {/* Lucide Loader icon */}
                    <Loader2 className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" strokeWidth={2} />
                    <p className="text-lg font-medium text-gray-600">Chargement des détails de l'employé...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 md:p-8 max-w-3xl mx-auto">
                <div className="bg-red-50 border-l-4 border-red-400 p-4" role="alert">
                    <div className="flex">
                        <div className="py-1">
                            {/* Lucide Error icon */}
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

    if (!employe) {
        return (
            <div className="p-4 md:p-8 text-center text-gray-500 max-w-3xl mx-auto">
                Aucun détail d'employé à afficher pour l'ID: {employeId}.
            </div>
        );
    }

    // --- Main Content Display ---
    return (
        <div className="p-4 md:p-8 bg-gray-100 min-h-screen"> {/* Slightly lighter bg */}
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden"> {/* More shadow */}
                {/* Header Section */}
                <div className="bg-gray-900  p-6 text-white">
                    <div className="flex items-center space-x-4">
                        <UserCircle2 className="h-16 w-16 text-white opacity-90 stroke-current" strokeWidth={1}/>
                        <div>
                            <h1 className="text-3xl font-bold">{employe.prenom} {employe.nom}</h1>
                            <p className="text-lg text-blue-100">{employe.fonction || 'Fonction non spécifiée'}</p>
                        </div>
                    </div>
                </div>

                {/* Details Sections */}
                <div className="p-6 space-y-8"> {/* Increased space between sections */}

                    {/* Section: Identité et Contact */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                            <IdCard className="h-6 w-6 mr-2 text-blue-600 stroke-current" strokeWidth={1.5}/> Identité et Contact
                        </h2>
                        <dl className="divide-y divide-gray-200">
                            <DetailItem label="Nom Complet" value={`${employe.prenom} ${employe.nom}`} />
                            <DetailItem label="Email" value={employe.email} icon={Mail}/>
                            <DetailItem label="Téléphone" value={employe.numTelephone} icon={Phone}/>
                            <DetailItem label="Adresse" value={employe.adresse} icon={MapPin}/> {/* Changed Home to MapPin */}
                            <DetailItem label="Wilaya (Résidence)" value={employe.wilaya} icon={MapPin}/>
                        </dl>
                    </section>

                    {/* Section: Informations Professionnelles */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                            <Briefcase className="h-6 w-6 mr-2 text-blue-600 stroke-current" strokeWidth={1.5}/> Informations Professionnelles
                        </h2>
                        <dl className="divide-y divide-gray-200">
                            <DetailItem label="Matricule" value={employe.matricule} />
                            <DetailItem label="Fonction" value={employe.fonction} />
                            <DetailItem label="Poste" value={employe.poste} />
                            <DetailItem label="Département" value={employe.departement} />
                            <DetailItem label="Statut" value={employe.statut} isStatus={true} />
                        </dl>
                    </section>

                    {/* Section: Informations Personnelles */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                            <UserCircle2 className="h-6 w-6 mr-2 text-blue-600 stroke-current" strokeWidth={1.5}/> Détails Personnels
                        </h2>
                        <dl className="divide-y divide-gray-200">
                            <DetailItem label="Date de Naissance" value={employe.dateNaissance} icon={CalendarDays} />
                            <DetailItem label="Lieu de Naissance" value={employe.lieuNaissance} icon={MapPin}/>
                            <DetailItem label="Wilaya de Naissance" value={employe.wilayaNaissance} icon={MapPin}/>
                            <DetailItem label="Sexe" value={employe.sexe} />
                            <DetailItem label="Nationalité" value={employe.nationalite} />
                            <DetailItem label="Situation Familiale" value={employe.situationFamille} />
                            {employe.situationFamille?.toLowerCase() !== 'célibataire' && employe.nomConjoint && (
                                <DetailItem label="Nom du Conjoint" value={employe.nomConjoint} />
                            )}
                            <DetailItem label="Groupe Sanguin / RH" value={`${employe.groupeSanguin || 'N/A'} (${employe.rh || 'N/A'})`} />
                            <DetailItem label="Service National" value={employe.serviceNational} />
                            <DetailItem label="N° Sécurité Sociale" value={employe.numSecuSocial} />
                        </dl>
                    </section>

                    {/* Section: Formation et Qualifications */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                            <GraduationCap className="h-6 w-6 mr-2 text-blue-600 stroke-current" strokeWidth={1.5}/> Formation et Qualifications
                        </h2>
                        <dl className="divide-y divide-gray-200">
                            <DetailItem label="Formation Scolaire" value={employe.formationScolaire} />
                            <DetailItem label="Formation Professionnelle" value={employe.formationProfessionnelle} />
                            <DetailItem label="Qualification Professionnelle" value={employe.qualificationProfessionnelle} />
                        </dl>
                    </section>

                    {/* Section: Informations Administratives */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                            <Info className="h-6 w-6 mr-2 text-blue-600 stroke-current" strokeWidth={1.5}/> Informations Administratives
                        </h2>
                        <dl className="divide-y divide-gray-200">
                            <DetailItem label="ID Employé" value={employe.id} />
                            <DetailItem label="Date de Création" value={employe.created_at} icon={Clock} />
                            <DetailItem label="Dernière Mise à Jour" value={employe.updated_at} icon={Clock} />
                        </dl>
                    </section>
                </div>

                {/* Optional Footer */}
                 {/* <div className="p-4 bg-gray-50 border-t text-right">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Modifier</button>
                 </div> */}
            </div>
        </div>
    );
};

export default EmployeDetails;




































// import { useEffect, useState } from "react";
// import { useParams } from "react-router";

// // GET http://127.0.0.1:8000/api/employes/1
// // response:
// // {
// //   "id": 1,
// //   "nom": "Chaouchi",
// //   "nomConjoint": null,
// //   "prenom": "Fouzi",
// //   "email": "ff.chaouchi@gmail.com",
// //   "numTelephone": "0666345678",
// //   "matricule": "EMP103",
// //   "dateNaissance": "1990-12-15",
// //   "lieuNaissance": "Annaba",
// //   "wilayaNaissance": "Annaba",
// //   "adresse": "613 Rue Hamoud Boualem",
// //   "wilaya": "Chlef",
// //   "sexe": "masculin",
// //   "nationalite": "Algérienne",
// //   "fonction": "Chauffeur de train type YB-lourd",
// //   "poste": "Chauffeur",
// //   "departement": "Transport",
// //   "situationFamille": "Célibataire",
// //   "groupeSanguin": "A",
// //   "rh": "-",
// //   "formationScolaire": "Bac+3",
// //   "formationProfessionnelle": "Ingenieur Méchanique",
// //   "qualificationProfessionnelle": "Ingenieur Certifié",
// //   "numSecuSocial": "1288652390103",
// //   "serviceNational": "Dispensé",
// //   "statut": "actif",
// //   "created_at": "2025-04-19T09:06:30.000000Z",
// //   "updated_at": "2025-04-19T12:52:57.000000Z"
// // }

// type Employer = {
//     id: number;
//     matricule: string;
//     fonction: string;
//     poste: string;
//     departement: string;
  
//     situationFamille: string;
//     groupeSanguin: string;
//     rh: string;
//     formationScolaire: string;
//     formationProfessionnelle: string;
//     qualificationProfessionnelle: string;
//     numSecuSocial: string;
//     statut: string;
//     created_at: string;
//     updated_at: string;
//     serviceNational: string;
  
//     nom: string;
//     prenom: string;
//     email: string;
//     numTelephone: string;
//     dateNaissance: string;
//     lieuNaissance: string;
//     wilayaNaissance: string;
//     adresse: string;
//     sexe: string;
//     nationalite: string;
//   };

// const EmployeDetails = () => {
//     const { employeId } = useParams();
//     const [employe, setEmploye] = useState<Employer>()
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchEmploye = async () => {
//             setIsLoading(true); 
//             setError(null);

//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/api/employes/${employeId}`);
        
//                 if (!response.ok) {
//                   if (response.status === 404) {
//                     throw new Error(`Employe non trouvé (ID: ${employeId})`);
//                   } else {
//                     throw new Error(`Erreur HTTP: ${response.status}`);
//                   }
//                 }
        
//                 const employeData: Employer = await response.json();
//                 setEmploye(employeData); 
        
//               } catch (err) {
//                 console.error("Erreur lors de la récupération du médecin:", err);
//                 setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
//               } finally {
//                 setIsLoading(false);
//               }
            
//         };
    
//         fetchEmploye();
//       }, [employeId]);

//       if (isLoading) {
//         return (
//           <div className="p-4 text-center">
//             Chargement des détails du médecin...
//           </div>
//         );
//       }
    
//       if (error) {
//         return (
//           <div className="p-4 text-center text-red-600 bg-red-100 border border-red-400 rounded">
//             <strong>Erreur:</strong> {error}
//           </div>
//         );
//       }

//       if (!employe) {
//         return (
//          <div className="p-4 text-center text-gray-600">
//            Aucun détail de médecin à afficher.
//          </div>
//        );
//      }
    
//     //  return (
//     //     <div className="p-4 md:p-8 font-sans max-w-2xl mx-auto"> {/* Added max-width and centering */}
//     //        {/* Page Title */}
//     //       <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
//     //         Détails du Employe
//     //       </h1>
    
//     //       {/* Professional Information Section */}
//     //       <div className="mb-6 border-b pb-4 ">
//     //         <h2 className="text-xl font-semibold mb-3 text-blue-600">
//     //           Mr . {employe.prenom} {employe.nom}
//     //         </h2>
//     //         {/* <p><span className="font-semibold">Spécialité:</span> {employe.specialite || 'N/A'}</p>
//     //         <p><span className="font-semibold">Service / Hôpital:</span> {employe.adresseService || 'N/A'}</p> */}
//     //         <p><span className="font-semibold">Email:</span> {employe.email || 'N/A'}</p>
//     //         <p><span className="font-semibold">Téléphone:</span> {employe.numTelephone || 'N/A'}</p>
//     //       </div>
    
//     //       {/* Personal Information Section */}
//     //       <div>
//     //         <h3 className="text-lg font-semibold mb-3 text-gray-700">
//     //           Informations Personnelles
//     //         </h3>
//     //         <p><span className="font-semibold">Date de Naissance:</span> {employe.dateNaissance || 'N/A'}</p>
//     //         <p><span className="font-semibold">Lieu de Naissance:</span> {employe.lieuNaissance || 'N/A'}</p>
//     //         <p><span className="font-semibold">Wilaya de Naissance:</span> {employe.wilayaNaissance || 'N/A'}</p>
//     //         <p><span className="font-semibold">Sexe:</span> {employe.sexe || 'N/A'}</p>
//     //         <p><span className="font-semibold">Nationalité:</span> {employe.nationalite || 'N/A'}</p>
//     //         <p><span className="font-semibold">Adresse Personnelle:</span> {employe.adresse || 'N/A'}</p>
//     //       </div>
    
//     //        {/* Optional: Administrative info (can be added similarly if needed) */}
//     //        <div className="mt-6 pt-4 border-t">
//     //          <h3 className="text-lg font-semibold mb-3 text-gray-700">
//     //            Informations Administratives
//     //          </h3>
//     //          <p><span className="font-semibold">ID:</span> {employe.id}</p>
//     //          <p><span className="font-semibold">Date de Création:</span> {new Date(employe.created_at).toLocaleString()}</p>
//     //          <p><span className="font-semibold">Dernière Mise à Jour:</span> {new Date(employe.updated_at).toLocaleString()}</p>
//     //        </div>
          
//     //     </div>
//     //   );

//     return (
//       <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-6 text-center">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//             {employe.prenom} {employe.nom}
//           </h1>
//           <div className="flex items-center justify-center space-x-4">
//             <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//               {employe.matricule}
//             </span>
//             <span className={`px-3 py-1 rounded-full text-sm ${
//               employe.statut === 'actif' 
//                 ? 'bg-green-100 text-green-800' 
//                 : 'bg-red-100 text-red-800'
//             }`}>
//               {employe.statut}
//             </span>
//           </div>
//         </div>
  
//         {/* Grid Layout */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Personal Information Card */}
//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
//             <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
//               <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//               Informations Personnelles
//             </h2>
//             <dl className="space-y-3">
//               <InfoItem label="Date de Naissance" value={employe.dateNaissance} />
//               <InfoItem label="Lieu de Naissance" value={`${employe.lieuNaissance}, ${employe.wilayaNaissance}`} />
//               <InfoItem label="Sexe" value={employe.sexe} />
//               <InfoItem label="Nationalité" value={employe.nationalite} />
//               <InfoItem label="Situation Familiale" value={employe.situationFamille} />
//               <InfoItem label="Groupe Sanguin" value={`${employe.groupeSanguin}${employe.rh}`} />
//               <InfoItem label="Adresse" value={employe.adresse} />
//               <InfoItem label="Téléphone" value={employe.numTelephone} />
//               <InfoItem label="Email" value={employe.email} />
//             </dl>
//           </div>
  
//           {/* Professional Information Card */}
//           <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
//             <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
//               <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               Informations Professionnelles
//             </h2>
//             <dl className="space-y-3">
//               <InfoItem label="Fonction" value={employe.fonction} />
//               <InfoItem label="Poste" value={employe.poste} />
//               <InfoItem label="Département" value={employe.departement} />
//               <InfoItem label="Formation Scolaire" value={employe.formationScolaire} />
//               <InfoItem label="Formation Professionnelle" value={employe.formationProfessionnelle} />
//               <InfoItem label="Qualification" value={employe.qualificationProfessionnelle} />
//               <InfoItem label="Numéro Sécurité Sociale" value={employe.numSecuSocial} />
//               <InfoItem label="Service National" value={employe.serviceNational} />
//             </dl>
//           </div>
//         </div>
  
//         {/* Administrative Information */}
//         <div className="mt-6 bg-gray-50 rounded-lg p-6 border border-gray-100">
//           <h2 className="text-lg font-semibold mb-4 text-gray-700">
//             Informations Administratives
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//             <div>
//               <p className="text-gray-500">ID Employé</p>
//               <p className="font-medium">{employe.id}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Créé le</p>
//               <p className="font-medium">{new Date(employe.created_at).toLocaleDateString()}</p>
//             </div>
//             <div>
//               <p className="text-gray-500">Modifié le</p>
//               <p className="font-medium">{new Date(employe.updated_at).toLocaleDateString()}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// }

// const InfoItem = ({ label, value }: { label: string; value?: string | null }) => (
//   <div className="flex justify-between items-start">
//     <dt className="text-gray-500 pr-2">{label}</dt>
//     <dd className="text-gray-900 font-medium text-right flex-1">
//       {value || <span className="text-gray-400">N/A</span>}
//     </dd>
//   </div>
// );

// export default EmployeDetails