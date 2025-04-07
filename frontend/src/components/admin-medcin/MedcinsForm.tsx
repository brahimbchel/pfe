
// const MedcinsForm = () => {
//     return (
//         <div>Form Medin</div>
//     )
// }

// export default MedcinsForm


import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router";

type MedcinFormValues = {
  matricule: string;
  nom: string;
  speciality: string;
  email: string;
  phone: string;
};

const medcinSchema = yup.object({
  matricule: yup.string().required("Matricule est requis"),
  nom: yup.string().required("Nom est requis"),
  speciality: yup.string().required("Spécialité est requise"),
  email: yup
    .string()
    .email("Email invalide")
    .required("Adresse email est requise"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Numéro de téléphone invalide")
    .required("Téléphone est requis"),
});

const MedcinsForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MedcinFormValues>({
    resolver: yupResolver(medcinSchema),
    defaultValues: {
      matricule: "",
      nom: "",
      speciality: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<MedcinFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Médecin enregistré:", data);
      reset();
      navigate("/admin/medcin");
    } finally {
      setIsSubmitting(false);
    }
  };

  const specialities = [
    "Cardiologue",
    "Dermatologue",
    "Neurologue",
    "Pédiatre",
    "Généraliste",
    "Chirurgien orthopédique",
    "Ophtalmologue",
    "Psychiatre",
    "Endocrinologue",
    "Oncologue",
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Ajouter un Médecin</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matricule
              </label>
              <input
                {...register("matricule")}
                className={`input ${errors.matricule ? "input-error" : ""}`}
                placeholder="Ex: MDC12345"
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
                className={`input ${errors.nom ? "input-error" : ""}`}
                placeholder="Nom complet"
              />
              {errors.nom && (
                <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spécialité
              </label>
              <select
                {...register("speciality")}
                className={`input ${errors.speciality ? "input-error" : ""}`}
              >
                <option value="">Sélectionnez une spécialité</option>
                {specialities.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.speciality && (
                <p className="text-red-500 text-sm mt-1">{errors.speciality.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className={`input ${errors.email ? "input-error" : ""}`}
                placeholder="exemple@domaine.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                {...register("phone")}
                className={`input ${errors.phone ? "input-error" : ""}`}
                placeholder="+213xXXXXXXXX"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
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
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150 disabled:opacity-50"
            >
              {isSubmitting ? "Enregistrement..." : "Ajouter Médecin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedcinsForm;
