import { useParams, useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

  type MedcinFormData = {
    nom: string,
    prenom: string,
    email: string,
    numTelephone: string,
    dateNaissance: string,
    lieuNaissance: string,
    wilayaNaissance: string,
    sexe: string,
    nationalite: string,
    specialite: string,
    adresse: string,
    adresseService: string,
  };
  

const schema = yup.object({
  nom: yup.string().required("Nom est requis"),
  prenom: yup.string().required("Prenom est requis"),
  email: yup.string().email("Email invalide").required("Adresse email est requise"),
  numTelephone: yup.string().matches(/^\+?\d{10,15}$/, "Numéro de téléphone invalide").required("Téléphone est requis"),
  specialite: yup.string().required("Spécialité est requise"),
  adresse: yup.string().required("est requis"),
  adresseService: yup.string().required("est requis"),
  dateNaissance: yup.string().required("est requis"),
  lieuNaissance: yup.string().required("est requis"),
  wilayaNaissance: yup.string().required("est requis"),
  nationalite: yup.string().required("est requis"),
  sexe: yup.string().required("est requis"),
});

const UpdateMedcinForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<MedcinFormData | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<MedcinFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Fetch Medcin by ID 
    const fetchMedcin = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/medecins/${id}`)
      const medcinData = await response.json()

      setInitialData(medcinData);
      reset(medcinData); 
    };

    fetchMedcin();
  }, [id, reset]);

  const onSubmit: SubmitHandler<MedcinFormData> = async (data) => {
    console.log("Updated Medcin:", data);

            // Send update to API here
            setIsSubmitting(true);
            try {
              const response = await fetch(`http://127.0.0.1:8000/api/medecins/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              if (!response.ok) {
                const errorData = await response.json();
                console.error("Erreur lors de l'envoi:", errorData);
              } else {
                console.log("Employé ajouté avec succès !, data: ", data);
                reset();
                navigate("/admin/employers");
              }
            } catch (error) {
              console.error("Erreur:", error);
            } finally {
              setIsSubmitting(false);
            }

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
              <label className="label">prenom</label>
              <input {...register('prenom')} className="input" />
              {errors.prenom && <p className="text-red-500">{errors.prenom.message}</p>}
            </div>

            {/* <div>
              <label className="label">Matricule "ID"</label>
              <input {...register('id')} className="input" />
              {errors.id && <p className="text-red-500">{errors.id.message}</p>}
            </div> */}

            <div>
              <label className="label">Spécialité</label>
              <input {...register('specialite')} className="input" />
              {errors.specialite && <p className="text-red-500">{errors.specialite.message}</p>}
            </div>

            <div>
              <label className="label">Email</label>
              <input {...register('email')} className="input" />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label">Téléphone</label>
              <input {...register('numTelephone')} className="input" />
              {errors.numTelephone && <p className="text-red-500">{errors.numTelephone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              adresse
              </label>
              <input
                {...register("adresse")}
                className={`input ${errors.adresse ? 'input-error' : ''}`}
                placeholder="Entrez l'adresse"
              />
              {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse.message}</p>}
          </div>

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              adresse Service
              </label>
              <input
                {...register("adresseService")}
                className={`input ${errors.adresseService ? 'input-error' : ''}`}
                placeholder="Entrez l'adresseService"
              />
              {errors.adresseService && <p className="text-red-500 text-sm mt-1">{errors.adresseService.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            date Naissance
            </label>
            <input
              {...register("dateNaissance")}
              className={`input ${errors.dateNaissance ? 'input-error' : ''}`}
              placeholder="Entrez le numéro de dateNaissance"
            />
            {errors.dateNaissance && <p className="text-red-500 text-sm mt-1">{errors.dateNaissance.message}</p>}
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            lieu Naissance
            </label>
            <input
              {...register("lieuNaissance")}
              className={`input ${errors.lieuNaissance ? 'input-error' : ''}`}
              placeholder="Entrez le lieu de Naissance"
            />
            {errors.lieuNaissance && <p className="text-red-500 text-sm mt-1">{errors.lieuNaissance.message}</p>}
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            wilaya Naissance
            </label>
            <input
              {...register("wilayaNaissance")}
              className={`input ${errors.wilayaNaissance ? 'input-error' : ''}`}
              placeholder="Entrez la wilaya de Naissance"
            />
            {errors.wilayaNaissance && <p className="text-red-500 text-sm mt-1">{errors.wilayaNaissance.message}</p>}
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            sexe
            </label>
            <input
              {...register("sexe")}
              className={`input ${errors.sexe ? 'input-error' : ''}`}
              placeholder="Entrez le sexe"
            />
            {errors.sexe && <p className="text-red-500 text-sm mt-1">{errors.sexe.message}</p>}
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            nationalite
            </label>
            <input
              {...register("nationalite")}
              className={`input ${errors.nationalite ? 'input-error' : ''}`}
              placeholder="Entrez la nationalite"
            />
            {errors.nationalite && <p className="text-red-500 text-sm mt-1">{errors.nationalite.message}</p>}
        </div>

          </div>

          <div className="flex justify-end gap-3 mt-8">
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
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg border border-transparent hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50"
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMedcinForm;
