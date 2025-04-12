import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react';
import { useNavigate } from 'react-router';

type EmployerFormValues = {
  matricule: string;
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
  statutEmploye: string;

  nom: string;
  prenom: string;
  email: string;
  numTelephone: string;
  dateNaissance: string;
  lieuNaissance: string;
  wilayaNaissance: string;
  adresse: string;
  wilaya: string;
  sexe: string;
  nationalite: string;

  serviceNational: string;
};

const schema = yup.object({
  matricule: yup.string().required(),
  fonction: yup.string().required(),
  poste: yup.string().required(),
  departement: yup.string().required(),

  situationFamille: yup.string().required(),
  groupeSanguin: yup.string().required(),
  rh: yup.string().required(),
  formationScolaire: yup.string().required(),
  formationProfessionnelle: yup.string().required(),
  qualificationProfessionnelle: yup.string().required(),
  numSecuSocial: yup.string().required(),
  statutEmploye: yup.string().required(),

  nom: yup.string().required(),
  prenom: yup.string().required(),
  email: yup.string().email().required(),
  numTelephone: yup.string().required(),
  dateNaissance: yup.string().required(),
  lieuNaissance: yup.string().required(),
  wilayaNaissance: yup.string().required(),
  adresse: yup.string().required(),
  wilaya: yup.string().required(), 
  sexe: yup.string().required(),
  nationalite: yup.string().required(),
  serviceNational: yup.string().required(),
});

const EmployersForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployerFormValues>({
    resolver: yupResolver(schema),

    defaultValues: {
      matricule: "",
      fonction: "",
      poste: "",
      departement: "",
    
      situationFamille: "",
      groupeSanguin: "",
      rh: "",
      formationScolaire: "",
      formationProfessionnelle: "",
      qualificationProfessionnelle: "",
      numSecuSocial: "",
      statutEmploye: "actif",
    
      nom: "",
      prenom: "",
      email: "",
      numTelephone: "",
      dateNaissance: "",
      lieuNaissance: "",
      wilayaNaissance: "",
      adresse: "",
      wilaya: "",
      sexe: "",
      nationalite: "",
      serviceNational: "Dispensé",
    },

  });

  const onSubmit: SubmitHandler<EmployerFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/employes/", {
        method: "POST",
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
        Nom
      </label>
      <input
        {...register("nom")}
        className={`input ${errors.nom ? 'input-error' : ''}`}
        placeholder="Entrez le nom"
      />
      {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Prénom
      </label>
      <input
        {...register("prenom")}
        className={`input ${errors.prenom ? 'input-error' : ''}`}
        placeholder="Entrez le prénom"
      />
      {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>}
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
        {...register("poste")}
        className={`input ${errors.poste ? 'input-error' : ''}`}
        placeholder="Entrez le poste"
      />
      {errors.poste && <p className="text-red-500 text-sm mt-1">{errors.poste.message}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Fonction
      </label>
      <input
        {...register("fonction")}
        className={`input ${errors.fonction ? 'input-error' : ''}`}
        placeholder="Entrez la fonction"
      />
      {errors.fonction && <p className="text-red-500 text-sm mt-1">{errors.fonction.message}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Département
      </label>
      <input
        {...register("departement")}
        className={`input ${errors.departement ? 'input-error' : ''}`}
        placeholder="Entrez le département"
      />
      {errors.departement && <p className="text-red-500 text-sm mt-1">{errors.departement.message}</p>}
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
        {...register("numTelephone")}
        className={`input ${errors.numTelephone ? 'input-error' : ''}`}
        placeholder="Entrez le numéro de téléphone"
      />
      {errors.numTelephone && <p className="text-red-500 text-sm mt-1">{errors.numTelephone.message}</p>}
    </div>
 

    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        numSecuSocial
        </label>
        <input
          {...register("numSecuSocial")}
          className={`input ${errors.numSecuSocial ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de numSecuSocial"
        />
        {errors.numSecuSocial && <p className="text-red-500 text-sm mt-1">{errors.numSecuSocial.message}</p>}
    </div>

    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        dateNaissance
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
        lieuNaissance
        </label>
        <input
          {...register("lieuNaissance")}
          className={`input ${errors.lieuNaissance ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de lieuNaissance"
        />
        {errors.lieuNaissance && <p className="text-red-500 text-sm mt-1">{errors.lieuNaissance.message}</p>}
    </div>

    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        wilayaNaissance
        </label>
        <input
          {...register("wilayaNaissance")}
          className={`input ${errors.wilayaNaissance ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de wilayaNaissance"
        />
        {errors.wilayaNaissance && <p className="text-red-500 text-sm mt-1">{errors.wilayaNaissance.message}</p>}
    </div>

    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        adresse
        </label>
        <input
          {...register("adresse")}
          className={`input ${errors.adresse ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de adresse"
        />
        {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse.message}</p>}
    </div>

    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        sexe
        </label>
        <input
          {...register("sexe")}
          className={`input ${errors.sexe ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de sexe"
        />
        {errors.sexe && <p className="text-red-500 text-sm mt-1">{errors.sexe.message}</p>}
    </div>

    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        wilaya
        </label>
        <input
          {...register("wilaya")}
          className={`input ${errors.wilaya ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de wilaya"
        />
        {errors.wilaya && <p className="text-red-500 text-sm mt-1">{errors.wilaya.message}</p>}
    </div>

    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        nationalite
        </label>
        <input
          {...register("nationalite")}
          className={`input ${errors.nationalite ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de nationalite"
        />
        {errors.nationalite && <p className="text-red-500 text-sm mt-1">{errors.nationalite.message}</p>}
    </div>

    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        situationFamille
        </label>
        <input
          {...register("situationFamille")}
          className={`input ${errors.situationFamille ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de situationFamille"
        />
        {errors.situationFamille && <p className="text-red-500 text-sm mt-1">{errors.situationFamille.message}</p>}
    </div>
    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        groupeSanguin
        </label>
        <input
          {...register("groupeSanguin")}
          className={`input ${errors.groupeSanguin ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de groupeSanguin"
        />
        {errors.groupeSanguin && <p className="text-red-500 text-sm mt-1">{errors.groupeSanguin.message}</p>}
    </div>
    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        rh
        </label>
        <input
          {...register("rh")}
          className={`input ${errors.rh ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de rh"
        />
        {errors.rh && <p className="text-red-500 text-sm mt-1">{errors.rh.message}</p>}
    </div>
    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        formationScolaire
        </label>
        <input
          {...register("formationScolaire")}
          className={`input ${errors.formationScolaire ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de formationScolaire"
        />
        {errors.formationScolaire && <p className="text-red-500 text-sm mt-1">{errors.formationScolaire.message}</p>}
    </div>
    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        formationProfessionnelle
        </label>
        <input
          {...register("formationProfessionnelle")}
          className={`input ${errors.formationProfessionnelle ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de formationProfessionnelle"
        />
        {errors.formationProfessionnelle && <p className="text-red-500 text-sm mt-1">{errors.formationProfessionnelle.message}</p>}
    </div>
    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        qualificationProfessionnelle
        </label>
        <input
          {...register("qualificationProfessionnelle")}
          className={`input ${errors.qualificationProfessionnelle ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de qualificationProfessionnelle"
        />
        {errors.qualificationProfessionnelle && <p className="text-red-500 text-sm mt-1">{errors.qualificationProfessionnelle.message}</p>}
    </div>
    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        serviceNational
        </label>
        <input
          {...register("serviceNational")}
          className={`input ${errors.serviceNational ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de serviceNational"
        />
        {errors.serviceNational && <p className="text-red-500 text-sm mt-1">{errors.serviceNational.message}</p>}
    </div>
    
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
        statutEmploye
        </label>
        <input
          {...register("statutEmploye")}
          className={`input ${errors.statutEmploye ? 'input-error' : ''}`}
          placeholder="Entrez le numéro de statutEmploye"
        />
        {errors.statutEmploye && <p className="text-red-500 text-sm mt-1">{errors.statutEmploye.message}</p>}
    </div>

  </div>



  {/* -------------------------- Form footer ---------------------- */}
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
