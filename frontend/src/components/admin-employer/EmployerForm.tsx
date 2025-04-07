
// const EmployerForm = () => {
//     return (
//         <div>Form Medin</div>
//     )
// }

// export default EmployerForm


import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react';
import { useNavigate } from 'react-router';

type EmployerFormValues = {
  nom: string;
  matricule: string;
  post: string;
  email: string;
  phone: string;
  status: string;
};

const schema = yup.object({
  nom: yup.string().required('Nom est requis'),
  matricule: yup.string().required('Matricule est requis'),
  post: yup.string().required('Poste est requis'),
  email: yup.string().email('Email invalide').required('Email est requis'),
  phone: yup.string().required('Téléphone est requis'),
  status: yup.string().required('Statut est requis'),
});

const EmployersForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployerFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      nom: "",
      matricule: "",
      post: "",
      email: "",
      phone: "",
      status: "actif",
    },
  });

  const onSubmit: SubmitHandler<EmployerFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      console.log("Employer created:", data);
      reset();
      navigate('/admin/employers');
    } finally {
      setIsSubmitting(false);
    }
  };

//   const statusOptions = [
//     { value: 'actif', label: 'Actif' },
//     { value: 'inactif', label: 'Inactif' },
//   ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un Employé</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                {...register("nom")}
                className={`input ${errors.nom ? 'input-error' : ''}`}
                placeholder="Entrez le nom complet"
              />
              {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matricule
              </label>
              <input
                {...register("matricule")}
                className={`input ${errors.matricule ? 'input-error' : ''}`}
                placeholder="Entrez le matricule"
              />
              {errors.matricule && <p className="text-red-500 text-sm mt-1">{errors.matricule.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poste
              </label>
              <input
                {...register("post")}
                className={`input ${errors.post ? 'input-error' : ''}`}
                placeholder="Entrez le poste"
              />
              {errors.post && <p className="text-red-500 text-sm mt-1">{errors.post.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`input ${errors.email ? 'input-error' : ''}`}
                placeholder="example@domaine.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                {...register("phone")}
                className={`input ${errors.phone ? 'input-error' : ''}`}
                placeholder="Entrez le numéro de téléphone"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                {...register("status")}
                className={`input ${errors.status ? 'input-error' : ''}`}
              >
                <option value="">Sélectionnez un statut</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
            </div> */}

          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg border border-transparent hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50"
            >
              {isSubmitting ? 'Enregistrement...' : 'Ajouter l’employé'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployersForm;
