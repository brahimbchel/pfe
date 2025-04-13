import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router";

type MedcinFormValues = {
  nom: string,
  prenom: string,
  email: string,
  numTelephone: string,
  dateNaissance: string,
  lieuNaissance: string,
  wilayaNaissance: string,
  sexe: string,
  nationalite: string,
  typeSpecialite: string,
  adresse: string,
  adresseService: string,
};

const medcinSchema = yup.object({
  nom: yup.string().required("Nom est requis"),
  prenom: yup.string().required("Prenom est requis"),
  email: yup.string().email("Email invalide").required("Adresse email est requise"),
  numTelephone: yup.string().matches(/^\+?\d{10,15}$/, "Numéro de téléphone invalide").required("Téléphone est requis"),
  typeSpecialite: yup.string().required("Spécialité est requise"),
  adresse: yup.string().required("est requis"),
  adresseService: yup.string().required("est requis"),
  dateNaissance: yup.string().required("est requis"),
  lieuNaissance: yup.string().required("est requis"),
  wilayaNaissance: yup.string().required("est requis"),
  nationalite: yup.string().required("est requis"),
  sexe: yup.string().required("est requis"),
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
      // matricule: "",
      nom: "",
      prenom: "",
      email: "",
      numTelephone: "",

      typeSpecialite: "",
      adresse: "",
      adresseService: "",

      dateNaissance: "",
      lieuNaissance: "",
      wilayaNaissance: "",
      sexe: "",
      nationalite: "",
    },
  });

  const onSubmit: SubmitHandler<MedcinFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/medecins", {
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur lors de l'envoi:", errorData);
      } else {
        console.log("Employé ajouté avec succès !, data: ", data);
        reset();
        navigate("/admin/medcin");
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const specialities = [
    "Cardiologie",
    "Dermatologie",
    "Endocrinologie",
    "Gastro-entérologie",
    "Gynécologie",
    "Hématologie",
    "Médecine Interne",
    "Médecine Générale",
    "Néphrologie",
    "Oncologie",
    "Ophtalmologie",
    "ORL (Oto-Rhino-Laryngologie)",
    "Orthopédie",
    "Pédiatrie",
    "Psychiatrie",
    "Pneumologie",
    "Radiologie",
    "Rhumatologie",
    "Chirurgie Générale",
    "Chirurgie Cardiaque",
    "Chirurgie Orthopédique",
    "Chirurgie Esthétique",
    "Chirurgie Vasculaire",
    "Médecine du travail",
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Ajouter un Médecin</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* <div>
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
            </div> */}

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
                Prenom complet
              </label>
              <input
                {...register("prenom")}
                className={`input ${errors.prenom ? "input-error" : ""}`}
                placeholder="Prenom complet"
              />
              {/* {errors.nom && (
                <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>
              )} */}
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
                Telephone
              </label>
              <input
                {...register("numTelephone")}
                className={`input ${errors.numTelephone ? "input-error" : ""}`}
                placeholder="+213xXXXXXXXX"
              />
              {errors.numTelephone && (
                <p className="text-red-500 text-sm mt-1">{errors.numTelephone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spécialité
              </label>
              <select
                {...register("typeSpecialite")}
                className={`input ${errors.typeSpecialite ? "input-error" : ""}`}
              >
                <option value="">Sélectionnez une spécialité</option>
                {specialities.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.typeSpecialite && (
                <p className="text-red-500 text-sm mt-1">{errors.typeSpecialite.message}</p>
              )}
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

{/* form footer -------------- */}
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
