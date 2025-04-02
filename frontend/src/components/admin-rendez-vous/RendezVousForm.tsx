import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react';
import { useNavigate } from 'react-router';

type FormValues = {
  matricule: string;
  nom: string;
  datetime: Date
  medcin: string;
  type: string;
};

const schema = yup.object({
  matricule: yup.string().required('Matricule est requis'),
  nom: yup.string().required('Nom est requis'),
  datetime: yup.date()
    .required('Date et heure sont requises')
    .min(new Date(), 'La date ne peut pas être dans le passé')
    .typeError('Veuillez entrer une date et heure valides'),
  medcin: yup.string().required('Médecin est requis'),
  type: yup.string().required('Type de consultation est requis'),
})

const RendezVousForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      matricule: "",
      nom: "",
      datetime: undefined,
      medcin: "",
      type: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      reset();
      navigate('/admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const doctorOptions = [
    { value: 'dr1', label: 'Dr. Sophie Martin - Cardiologie' },
    { value: 'dr2', label: 'Dr. Jean Dupont - Dermatologie' },
    { value: 'dr3', label: 'Dr. Marie Curie - Radiologie' },
  ];

  const typeOptions = [
    'Consultation générale',
    'Suivi de traitement',
    'Urgence',
    'Contrôle annuel'
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Nouveau Rendez-Vous Médical</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matricule
              </label>
              <input
                {...register("matricule")}
                className={`input ${errors.matricule ? 'input-error' : ''}`}
                placeholder="Entrez votre matricule"
              />
              {errors.matricule && (
                <p className="text-red-500 text-sm mt-1">{errors.matricule.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                {...register("nom")}
                className={`input ${errors.nom ? 'input-error' : ''}`}
                placeholder="Entrez votre nom complet"
              />
              {errors.nom && (
                <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date et heure du rendez-vous
              </label>
              <input
                type="datetime-local"
                {...register("datetime", { valueAsDate: true })}
                className={`input ${errors.datetime ? 'input-error' : ''}`}
                min={new Date().toISOString().slice(0, 16)}
              />
              {errors.datetime && (
                <p className="text-red-500 text-sm mt-1">{errors.datetime.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Médecin / Spécialité
              </label>
              <select
                {...register("medcin")}
                className={`input ${errors.medcin ? 'input-error' : ''}`}
              >
                <option value="">Sélectionnez un médecin</option>
                {doctorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.medcin && (
                <p className="text-red-500 text-sm mt-1">{errors.medcin.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de consultation
              </label>
              <select
                {...register("type")}
                className={`input ${errors.type ? 'input-error' : ''}`}
              >
                <option value="">Sélectionnez le type</option>
                {typeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg border border-transparent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
            >
              {isSubmitting ? (
                'Envoi en cours... '
              ) : (
                'Confirmer le rendez-vous '
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RendezVousForm;