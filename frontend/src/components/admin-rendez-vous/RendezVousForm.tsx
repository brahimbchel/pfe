
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

type FormValues = {
  EmployeId: string;
  MedecinId: string;
  cms_id: string;
  type: string;
  dateVisite: Date;
};

const schema = yup.object({
  EmployeId: yup.string().required('Employé est requis'),
  MedecinId: yup.string().required('Médecin est requis'),
  cms_id: yup.string().required('CMS est requis'),
  type: yup.string().required('Type de consultation est requis'),
  dateVisite: yup.date()
    .required('Date et heure sont requises')
    .min(new Date(), 'La date ne peut pas être dans le passé')
    .typeError('Date invalide'),
});

const RendezVousForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [medcinsOptions, setMedcinsOptions] = useState<any[]>([]);
  const [cmsOptions, setCmsOptions] = useState<any[]>([]);

  const { employeId } = useParams();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      EmployeId: employeId || "",
      // other fields...
    }
  });


  useEffect(() => {
    const fetchMedcins = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/medecins");
      const data = await res.json();
      setMedcinsOptions(data);
    };

    const fetchCms = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/cms");
      const data = await res.json();
      setCmsOptions(data);
    };

    fetchMedcins();
    fetchCms();
  }, []);

  const typeOptions = [
    'Admission', 'Periodique', 'Spontané', 'Reprise',
    'Contrôle', 'AccidentDeTravail', 'ContreVisite', 'Réintégration'
  ];
  
  function formatDateToMySQL(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are 0-indexed
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    try {

      const formattedDate = formatDateToMySQL(data.dateVisite);
      // console.log("1 - ", data.dateVisite)  // Fri Apr 18 2025 10:00:00 GMT+0100 (Central European Standard Time)
      // console.log("2 - ", formattedDate)    // 2025-04-18 10:00:00

      const response = await fetch("http://127.0.0.1:8000/api/visites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...data,
          EmployeId: employeId,
          dateVisite: formattedDate
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur API:", errorData);
      } else {
        // console.log("Rendez-vous créé:", data);
        reset();
        navigate("/admin/rendez-vous");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Nouveau Rendez-Vous</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employé (ID)</label>
              <input
                {...register("EmployeId")}
                className={`input ${errors.EmployeId ? 'input-error' : ''}`}
                placeholder="Entrez l'identifiant de l'employé"
              />
              {errors.EmployeId && <p className="text-red-500 text-sm mt-1">{errors.EmployeId.message}</p>}
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Médecin</label>
              <select {...register("MedecinId")} className={`input ${errors.MedecinId ? 'input-error' : ''}`}>
                <option value="">Sélectionnez un médecin</option>
                {medcinsOptions.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.nom} {m.prenom} - {m.specialite}
                  </option>
                ))}
              </select>
              {errors.MedecinId && <p className="text-red-500 text-sm mt-1">{errors.MedecinId.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CMS</label>
              <select {...register("cms_id")} className={`input ${errors.cms_id ? 'input-error' : ''}`}>
                <option value="">Sélectionnez un CMS</option>
                {cmsOptions.map(cms => (
                  <option key={cms.id} value={cms.id}>{cms.nomCMS}</option>
                ))}
              </select>
              {errors.cms_id && <p className="text-red-500 text-sm mt-1">{errors.cms_id.message}</p>}
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date et heure de la visite</label>
              <input
                type="datetime-local"
                {...register("dateVisite", { valueAsDate: true })}
                className={`input ${errors.dateVisite ? 'input-error' : ''}`}
                min={new Date().toISOString().slice(0, 16)}
              />
              {errors.dateVisite && <p className="text-red-500 text-sm mt-1">{errors.dateVisite.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type de consultation</label>
              <select {...register("type")} className={`input ${errors.type ? 'input-error' : ''}`}>
                <option value="">Sélectionnez un type</option>
                {typeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
            </div>

          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Annuler
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi..." : "Créer le rendez-vous"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RendezVousForm;

