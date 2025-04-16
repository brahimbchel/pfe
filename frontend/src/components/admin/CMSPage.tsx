// import { useEffect, useState } from "react";

// type CMS = {
//   id: number;
//   nomCMS: string;
//   created_at: string;
//   updated_at: string;
// };

// const CMSPage = () => {
//   const [cmsList, setCmsList] = useState<CMS[]>([]);
//   const [newCMS, setNewCMS] = useState({ nomCMS: "" });
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [editValue, setEditValue] = useState("");

//   const fetchCMS = async () => {
//     const res = await fetch("http://localhost:8000/api/cms");
//     const data = await res.json();
//     setCmsList(data);
//   };

//   useEffect(() => {
//     fetchCMS();
//   }, []);

//   const handleCreate = async () => {
//     if (!newCMS.nomCMS.trim()) return;
//     await fetch("http://localhost:8000/api/cms", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newCMS),
//     });
//     setNewCMS({ nomCMS: "" });
//     fetchCMS();
//   };

//   const handleDelete = async (id: number) => {
//     await fetch(`http://localhost:8000/api/cms/${id}`, { method: "DELETE" });
//     fetchCMS();
//   };

//   const handleEdit = (cms: CMS) => {
//     setEditingId(cms.id);
//     setEditValue(cms.nomCMS);
//   };

//   const handleUpdate = async (id: number) => {
//     await fetch(`http://localhost:8000/api/cms/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ nomCMS: editValue }),
//     });
//     setEditingId(null);
//     setEditValue("");
//     fetchCMS();
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-gray-900 mb-6">📰 Gestion du CMS</h1>

//       {/* Create New CMS */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un nouveau CMS</h2>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <input
//             type="text"
//             placeholder="Titre du contenu"
//             className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={newCMS.nomCMS}
//             onChange={(e) => setNewCMS({ ...newCMS, nomCMS: e.target.value })}
//           />
//           <button
//             onClick={handleCreate}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             Ajouter
//           </button>
//         </div>
//       </div>

//       {/* CMS List */}
//       <div className="space-y-4">
//         {cmsList.length === 0 ? (
//           <p className="text-gray-500 text-center">Aucun contenu CMS trouvé.</p>
//         ) : (
//           cmsList.map((cms) => (
//             <div
//               key={cms.id}
//               className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
//             >
//               {editingId === cms.id ? (
//                 <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                   <input
//                     type="text"
//                     value={editValue}
//                     onChange={(e) => setEditValue(e.target.value)}
//                     className="border border-gray-300 rounded p-2 w-full"
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleUpdate(cms.id)}
//                       className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     >
//                       Enregistrer
//                     </button>
//                     <button
//                       onClick={() => setEditingId(null)}
//                       className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                     >
//                       Annuler
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//                   <div>
//                     <h2 className="font-semibold text-gray-900">{cms.nomCMS}</h2>
//                     <p className="text-sm text-gray-500">
//                       Créé le {new Date(cms.created_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => handleEdit(cms)}
//                       className="text-blue-600 hover:underline font-medium"
//                     >
//                       Modifier
//                     </button>
//                     <button
//                       onClick={() => handleDelete(cms.id)}
//                       className="text-red-600 hover:underline font-medium"
//                     >
//                       Supprimer
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CMSPage;

import { useEffect, useState } from "react";

type CMS = {
  id: number;
  nomCMS: string;
  created_at: string;
  updated_at: string;
};

const CMSPage = () => {
  const [cmsList, setCmsList] = useState<CMS[]>([]);
  const [newCMS, setNewCMS] = useState({ nomCMS: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);

  const fetchCMS = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/cms");
      const data = await res.json();
      setCmsList(data);
    } catch (err) {
      console.error("Error fetching CMS:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCMS();
  }, []);

  const handleCreate = async () => {
    if (!newCMS.nomCMS.trim()) return;
    setCreating(true);
    await fetch("http://localhost:8000/api/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCMS),
    });
    setNewCMS({ nomCMS: "" });
    await fetchCMS();
    setCreating(false);
  };

  const handleDelete = async (id: number) => {
    setActionLoadingId(id);
    await fetch(`http://localhost:8000/api/cms/${id}`, { method: "DELETE" });
    await fetchCMS();
    setActionLoadingId(null);
  };

  const handleEdit = (cms: CMS) => {
    setEditingId(cms.id);
    setEditValue(cms.nomCMS);
  };

  const handleUpdate = async (id: number) => {
    setActionLoadingId(id);
    await fetch(`http://localhost:8000/api/cms/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomCMS: editValue }),
    });
    setEditingId(null);
    setEditValue("");
    await fetchCMS();
    setActionLoadingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">📰 Gestion du CMS</h1>

      {/* Create New CMS */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un nouveau CMS</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Titre du contenu"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newCMS.nomCMS}
            onChange={(e) => setNewCMS({ ...newCMS, nomCMS: e.target.value })}
            disabled={creating}
          />
          <button
            onClick={handleCreate}
            disabled={creating}
            className={`${
              creating ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-3 rounded-lg transition`}
          >
            {creating ? "Ajout..." : "Ajouter"}
          </button>
        </div>
      </div>

      {/* CMS List */}
      {loading ? (
        <div className="text-center text-gray-600 py-10">Chargement des données...</div>
      ) : (
        <div className="space-y-4">
          {cmsList.length === 0 ? (
            <p className="text-gray-500 text-center">Aucun contenu CMS trouvé.</p>
          ) : (
            cmsList.map((cms) => (
              <div
                key={cms.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                {editingId === cms.id ? (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border border-gray-300 rounded p-2 w-fit"
                      disabled={actionLoadingId === cms.id}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(cms.id)}
                        disabled={actionLoadingId === cms.id}
                        className={`${
                          actionLoadingId === cms.id ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
                        } text-white px-4 py-2 rounded w-fit`}
                      >
                        {actionLoadingId === cms.id ? "Mise-à-jour" : "Enregistrer"}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        disabled={actionLoadingId === cms.id}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <h2 className="font-semibold text-gray-900">{cms.nomCMS}</h2>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(cms)}
                        className="text-blue-600 hover:underline font-medium"
                        disabled={actionLoadingId === cms.id}
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(cms.id)}
                        className="text-red-600 hover:underline font-medium"
                        disabled={actionLoadingId === cms.id}
                      >
                        {actionLoadingId === cms.id ? "Suppression..." : "Supprimer"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CMSPage;
