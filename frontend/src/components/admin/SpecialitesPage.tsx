// !!! api/specialites does not work !!!

import { useEffect, useState } from "react";

type Specialite = {
  id: number;
  nom: string;
};

const SpecialitesPage = () => {
  const [specialites, setSpecialites] = useState<Specialite[]>([]);
  const [newSpecialite, setNewSpecialite] = useState("");

  const fetchSpecialites = async () => {
    const res = await fetch("http://localhost:8000/api/specialites");
    const data = await res.json();
    setSpecialites(data);
  };

  useEffect(() => {
    fetchSpecialites();
  }, []);

  const handleCreate = async () => {
    await fetch("http://localhost:8000/api/specialites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom: newSpecialite }),
    });
    setNewSpecialite("");
    fetchSpecialites();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/api/specialites/${id}`, {
      method: "DELETE",
    });
    fetchSpecialites();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Spécialités</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Nom de spécialité"
          className="border p-2 flex-1"
          value={newSpecialite}
          onChange={(e) => setNewSpecialite(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <ul>
        {specialites.map((spec) => (
          <li
            key={spec.id}
            className="border p-3 mb-2 flex justify-between rounded"
          >
            <span>{spec.nom}</span>
            <button
              onClick={() => handleDelete(spec.id)}
              className="text-red-500 hover:underline"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialitesPage;
