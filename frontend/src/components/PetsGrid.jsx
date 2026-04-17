import React, { useEffect, useState } from "react";
import PetCard from "./PetCard";

export default function PetsGrid() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL;
    fetch(`${api}/api/mascotas`)
      .then((res) => res.json())
      .then((data) => {
    console.log("Mascotas recibidas:", data);
        setPets(data);
      })
      .catch((err) => console.error("Error fetching pets", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = pets.filter(p => filter === "todos" ? true : p.especie === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button onClick={() => setFilter("todos")} className={`px-3 py-1 rounded-lg ${filter==="todos" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Todos</button>
          <button onClick={() => setFilter("perro")} className={`px-3 py-1 rounded-lg ${filter==="perro" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Perros</button>
          <button onClick={() => setFilter("gato")} className={`px-3 py-1 rounded-lg ${filter==="gato" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Gatos</button>
          <button onClick={() => setFilter("otro")} className={`px-3 py-1 rounded-lg ${filter==="otro" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Otros</button>
        </div>

        <div className="text-sm text-slate-500">{filtered.length} resultados</div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500">Cargando mascotas...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <PetCard key={p.idMascota} pet={p} />
          ))}
        </div>
      )}
    </div>
  );
}
