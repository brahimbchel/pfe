import { useParams, useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

type MedcinFormData = {
    nom: string;
    matricule: string;
    speciality: string;
    email: string;
    phone: string;
  };

const schema = yup.object({
  nom: yup.string().required('Nom est requis'),
  matricule: yup.string().required('Matricule est requis'),
  speciality: yup.string().required('Spécialité est requise'),
  email: yup.string().email('Email invalide').required('Email est requis'),
  phone: yup.string().required('Téléphone est requis'),
});

const UpdateMedcinForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<MedcinFormData | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<MedcinFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Fetch Medcin by ID (mocked for now)
    const fetchMedcin = async () => {
      const fakeMedcin: MedcinFormData = {
        nom: "Dr. Ahmed Karim",
        matricule: "MEDCIN-001",
        speciality: "Cardiologie",
        email: "ahmed.karim@example.com",
        phone: "+213 661 112 233",
      };

      setInitialData(fakeMedcin);
      reset(fakeMedcin); 
    };

    fetchMedcin();
  }, [id, reset]);

  const onSubmit: SubmitHandler<MedcinFormData> = async (data) => {
    console.log("Updated Medcin:", data);
    // Send update to API here
    navigate('/admin/medcin');
  };

  if (!initialData) return <p className="p-4">Chargement...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Modifier Médecin</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="label">Nom</label>
              <input {...register('nom')} className="input" />
              {errors.nom && <p className="text-red-500">{errors.nom.message}</p>}
            </div>

            <div>
              <label className="label">Matricule</label>
              <input {...register('matricule')} className="input" />
              {errors.matricule && <p className="text-red-500">{errors.matricule.message}</p>}
            </div>

            <div>
              <label className="label">Spécialité</label>
              <input {...register('speciality')} className="input" />
              {errors.speciality && <p className="text-red-500">{errors.speciality.message}</p>}
            </div>

            <div>
              <label className="label">Email</label>
              <input {...register('email')} className="input" />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label">Téléphone</label>
              <input {...register('phone')} className="input" />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="btn-primary"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMedcinForm;
