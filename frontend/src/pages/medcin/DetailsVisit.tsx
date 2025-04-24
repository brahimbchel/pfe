import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
    ClipboardList,  
    User,           
    CalendarCheck,  
    PenSquare,     
    Building,       
    Save,
    Loader2,        
    XCircle,        
    Info,          
    ArrowLeft     
} from 'lucide-react';

type VisitFormValue = {
    prescriptions?: string;
    observations?: string;
}

type Visit = {
    id: string;
    MedecinId: string,
    EmployeId: string,
    dateVisite: string;
    type: string;
    cms_id: string;
    prescriptions?: string;
    observations?: string;
};

type Employe = {
    id: string;
    nom: string;
    prenom: string;
    matricule: string;
    numTelephone: string;
    email: string;
    sexe: string;
    groupeSanguin: string;
    rh: string;
    poste: string;
    fonction: string;
    departement: string;
};

const schema = yup.object({
    prescriptions: yup.string(), 
    observations: yup.string()
})

interface DetailItemProps {
    label: string;
    value: string | number | null | undefined;
    icon?: React.ElementType;
    className?: string;
    isStatus?: boolean; // Not used here, but keep for consistency if needed elsewhere
}


const DetailItem: React.FC<DetailItemProps> = ({ label, value, icon: Icon, className = "" }) => {
    const displayValue = value !== null && value !== undefined && value !== "" ? value : <span className="text-gray-400 italic">N/A</span>;

    const renderValue = () => {
        // Format date strings if they look like standard date formats
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
             return <span className="text-gray-900">{new Date(value).toLocaleDateString('fr-DZ')}</span>;
        }
        // Format datetime strings
        if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(value)) {
            return <span className="text-gray-900">{new Date(value).toLocaleString('fr-DZ')}</span>
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


const DetailsVisit = () => {
    const { visitId, medcinId } = useParams();
    const location = useLocation();
    // const { rendezVous } =  location.state as { rendezVous: Visit } || {};
    const navigate = useNavigate();

    const [rendezVous, setRendezVous] = useState<Visit | null>(null);
    const [employe, setEmploye] = useState<Employe | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<VisitFormValue>({
        resolver: yupResolver(schema),
        defaultValues: {
            prescriptions: "",
            observations: ""
        }
    })

    useEffect(() => {
        const state = location.state as { rendezVous: Visit } | undefined;
        if (!state || !state.rendezVous) {
             navigate(-1);
             setError("Données de visite manquantes. Impossible de charger les détails.");
             console.error("Location state missing 'rendezVous'.");
             setLoading(false);
             return;
        }

        const currentRendezVous = state.rendezVous;
        setRendezVous(currentRendezVous);
        // console.log(currentRendezVous)

        reset({
            prescriptions: currentRendezVous.prescriptions || "",
            observations: currentRendezVous.observations || ""
        });

        const getEmploye = async () => {
            setLoading(true);
            setError(null);
            try {
               

                if (!currentRendezVous?.EmployeId) {
                    throw new Error("ID de l'employé manquant dans les données de la visite.");
                }
                
                const response = await fetch(`http://127.0.0.1:8000/api/employes/${currentRendezVous.EmployeId}`);
                
                

                if (!response.ok) {
                    if (response.status === 404) {
                       throw new Error(`Employé non trouvé (ID: ${currentRendezVous.EmployeId})`);
                    } else {
                       throw new Error(`Échec de la récupération de l'employé (HTTP ${response.status})`);
                    }
               }
                
                const data = await response.json();
                setEmploye(data);
            } catch (err) {
                console.error("Erreur lors de la récupération de l'employé:", err);
                setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue lors de la récupération de l\'employé.');
            } finally {
                setLoading(false);
            }
        };

        getEmploye();
    }, [location.state, reset]);

    const onSubmit: SubmitHandler<VisitFormValue> = async (data) => {
        setIsSubmitting(true);
        // console.log("Données soumises:", data);
        // console.log("Pour la visite ID:", visitId);

        try {
            const responsePrescriptions = await fetch(`http://127.0.0.1:8000/api/visites/${visitId}/prescriptions`, {
                method: 'PATCH', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prescriptions: data.prescriptions,
                })
            });

            if (!responsePrescriptions.ok) {
                throw new Error(`Erreur lors de la mise à jour de la visite (HTTP ${responsePrescriptions.status})`);
            }

            // const resultPrescriptions = await responsePrescriptions.json();
            // console.log("Réponse de la mise à jour:", resultPrescriptions);
        } catch (err) {
             console.error("Erreur lors de la soumission:", err);
        } finally {
             setIsSubmitting(false);
        }

        try {
            const responseObservations = await fetch(`http://127.0.0.1:8000/api/visites/${visitId}/observations`, {
                method: 'PATCH', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    observations: data.observations,
                })
            });

            if (!responseObservations.ok) {
                throw new Error(`Erreur lors de la mise à jour de la visite (HTTP ${responseObservations.status})`);
            }

            // const resultObservations = await responseObservations.json();
            // console.log("Réponse de la mise à jour:", resultObservations);
        } catch (err) {
             console.error("Erreur lors de la soumission:", err);
        } finally {
             setIsSubmitting(false);
             navigate(`/medcin/visit/${medcinId}`)
        }
      };


      if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="text-center p-6">
                    <Loader2 className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4" strokeWidth={2} />
                    <p className="text-lg font-medium text-gray-600">Chargement des détails de la visite...</p>
                </div>
            </div>
        );
    }

    // Handle case where rendezVous state is missing even after initial check
    if (!rendezVous) {
         return (
             <div className="p-4 md:p-8 max-w-3xl mx-auto">
                 <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md" role="alert">
                     <div className="flex">
                         <div className="py-1">
                             <XCircle className="h-6 w-6 text-red-500 mr-3 stroke-current" strokeWidth={2}/>
                         </div>
                         <div>
                             <p className="font-bold text-red-800">Erreur Critique</p>
                             <p className="text-sm text-red-700">{error || "Impossible de charger les données de la visite."}</p>
                             <button onClick={() => navigate(-1)} className="mt-2 text-sm text-indigo-600 hover:underline">Retour</button>
                         </div>
                     </div>
                 </div>
             </div>
         );
    }

    // Display specific fetch error for employee if it occurred
     if (error && !employe) {
         return (
             <div className="p-4 md:p-8 max-w-3xl mx-auto">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md" role="alert"> {/* Warning color */}
                     <div className="flex">
                         <div className="py-1">
                             <Info className="h-6 w-6 text-yellow-500 mr-3 stroke-current" strokeWidth={2}/>
                         </div>
                         <div>
                             <p className="font-bold text-yellow-800">Erreur de Données</p>
                             <p className="text-sm text-yellow-700">Impossible de charger les détails de l'employé: {error}</p>
                             <p className="text-xs text-gray-600 mt-1">Les informations de la visite sont affichées, mais les détails du patient sont manquants.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
         );
     }


return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">

        {/* Optional Back Button */}
         <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            <ArrowLeft className="h-4 w-4 mr-2 stroke-current" strokeWidth={2}/>
            Retour
        </button>

        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-gray-900 p-6 text-white">
                <div className="flex items-center space-x-4">
                    <ClipboardList className="h-12 w-12 text-white opacity-90 stroke-current" strokeWidth={1}/>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Détails de la Visite Médicale</h1>
                        <p className="text-lg text-purple-100">
                            Le {rendezVous.dateVisite ? new Date(rendezVous.dateVisite).toLocaleDateString('fr-DZ', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date inconnue'} - Type: {rendezVous.type || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Details Sections */}
            <div className="p-6 space-y-8">

                {/* Section: Patient (Employé) */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                        <User className="h-6 w-6 mr-2 text-indigo-600 stroke-current" strokeWidth={1.5}/> Informations Patient (Employé)
                    </h2>
                    {employe ? (
                        <div className="divide-y divide-gray-200">
                            <DetailItem label="Nom Complet" value={`${employe.prenom} ${employe.nom}`} />
                            <DetailItem label="Matricule" value={employe.matricule} />
                            <DetailItem label="Contact" value={`Tél: ${employe.numTelephone || 'N/A'} | Email: ${employe.email || 'N/A'}`}/>
                            <DetailItem label="Sexe" value={employe.sexe} />
                            <DetailItem label="Groupe Sanguin" value={`${employe.groupeSanguin || 'N/A'} (${employe.rh || 'N/A'})`} />
                            <DetailItem label="Poste" value={employe.poste}  />
                            <DetailItem label="Fonction" value={employe.fonction} />
                            <DetailItem label="Département" value={employe.departement} />
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">Chargement des informations de l'employé ou erreur...</p>
                    )}
                </section>

                {/* Section: Détails de la Visite */}
                <section>
                     <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                        <CalendarCheck className="h-6 w-6 mr-2 text-indigo-600 stroke-current" strokeWidth={1.5}/> Détails de la Visite
                    </h2>
                    <div className="divide-y divide-gray-200">
                        <DetailItem label="Type de Visite" value={rendezVous.type} />
                        <DetailItem label="Date de Visite" value={rendezVous.dateVisite} icon={CalendarCheck} />
                        <DetailItem label="CMS ID" value={rendezVous.cms_id} icon={Building}/>
                        {/* <DetailItem label="Prescriptions (Existantes)" value={rendezVous.prescriptions || 'Aucune'}  />
                        <DetailItem label="Observations (Existantes)" value={rendezVous.observations || 'Aucune'}  /> */}
                    </div>
                </section>

                {/* Section: Consultation (Form) */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                       <PenSquare className="h-6 w-6 mr-2 text-indigo-600 stroke-current" strokeWidth={1.5}/> Consultation et Actions
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                        {/* Prescription Input */}
                        <div>
                            <label htmlFor="prescriptions" className="block text-sm font-medium text-gray-700 mb-1">
                                Prescriptions
                            </label>
                            <textarea
                                id="prescriptions"
                                {...register("prescriptions")}
                                rows={4}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.prescriptions ? 'border-red-500 ring-red-500' : ''}`}
                                placeholder="Doliprane 1000mg..."
                            />
                            {errors.prescriptions && <p className="text-red-600 text-xs mt-1">{errors.prescriptions.message}</p>}
                        </div>

                        {/* Observations Input */}
                        <div>
                            <label htmlFor="observations" className="block text-sm font-medium text-gray-700 mb-1">
                                Observations
                            </label>
                            <textarea
                                id="observations"
                                {...register("observations")}
                                rows={4}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.observations ? 'border-red-500 ring-red-500' : ''}`}
                                placeholder="Patient se plaint de maux de tête..."
                            />
                            {errors.observations && <p className="text-red-600 text-xs mt-1">{errors.observations.message}</p>}
                        </div>

                        {/* Submit Button and Feedback */}
                        <div className="flex items-center justify-between pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                        Enregistrement...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Enregistrer la Consultation
                                    </>
                                )}
                            </button>

                            {/* Submission Feedback Area */}
                            {/* <div className="text-sm">
                                {submitSuccess && <p className="text-green-600 font-medium">{submitSuccess}</p>}
                                {submitError && <p className="text-red-600 font-medium">{submitError}</p>}
                            </div> */}
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>
);
}

export default DetailsVisit
