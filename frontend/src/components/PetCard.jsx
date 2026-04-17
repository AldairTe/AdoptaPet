import React from "react";
import { useNavigate } from "react-router-dom";

export default function PetCard({ pet }) {
  const navigate = useNavigate();
  
  // Si por alguna razón el prop 'pet' no existe, no renderizar nada
  if (!pet) return null;

  const getImageSrc = () => {
    if (!pet.imagen) {
      return "/placeholder.png";
    }
    const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/${pet.imagen}`;
    return imageUrl;
  };

  const img = getImageSrc();

  const handleCardClick = () => {
    navigate(`/mascota/${pet.idMascota}`);
  };

  const handleAdoptClick = (e) => {
    e.stopPropagation(); // Evita que se dispare el click de la tarjeta
    navigate(`/mascota/${pet.idMascota}`);
  };

  return (
    <article 
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer transform hover:scale-105 duration-300"
    >
      <div className="h-48 w-full relative">
        <img
          src={img}
          alt={pet.nombre || "Mascota"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/placeholder.png";
          }}
        />
        {/* Badge de estado en la imagen */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
          pet.estado === "disponible" 
            ? "bg-green-500 text-white" 
            : "bg-red-500 text-white"
        }`}>
          {pet.estado === "disponible" ? "Disponible" : "Adoptado"}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800 hover:text-indigo-600 transition">
          {pet.nombre}
        </h3>
        <p className="text-sm text-slate-500 capitalize">
          {pet.especie} • {pet.raza || "Sin especificar"}
        </p>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {pet.descripcion}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            Click para ver más
          </span>

          <button
            onClick={handleAdoptClick}
            disabled={pet.estado !== "disponible"}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              pet.estado === "disponible"
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {pet.estado === "disponible"
              ? "Solicitar adopción"
              : "No disponible"}
          </button>
        </div>
      </div>
    </article>
  );
}