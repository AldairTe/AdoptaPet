import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { getCurrentUser } from "../services/auth";

export default function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await api.get(`/api/mascotas/${id}`);
        setPet(res.data);
      } catch (err) {
        console.error("Error al cargar mascota:", err);
        if (err.response?.status === 404) {
          setPet(null);
        } else {
          alert("Error al cargar la información de la mascota");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  const solicitar = async () => {
    const user = getCurrentUser();
    console.log("Usuario actual:", user); // DEBUG
    
    if (!user) {
      alert("Debes iniciar sesión para solicitar una adopción");
      navigate("/login");
      return;
    }

    if (!mensaje.trim()) {
      alert("Por favor, escribe un mensaje explicando por qué quieres adoptar");
      return;
    }

    setSending(true);
    try {
      const payload = { 
        idUsuario: user.idUsuario, 
        idMascota: pet.idMascota, 
        mensaje 
      };
      console.log("Enviando solicitud:", payload); // DEBUG
      
      await api.post("/api/solicitudes", payload);
      alert("¡Solicitud enviada con éxito! El refugio revisará tu solicitud y te contactará pronto.");
      navigate("/");
    } catch (err) {
      console.error("Error completo:", err); // DEBUG
      const errorMsg = err?.response?.data?.error || err?.message || "Error al enviar solicitud";
      alert(`Error: ${errorMsg}`);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-4 font-medium">Cargando información...</p>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center bg-white p-12 rounded-3xl shadow-xl">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mascota no encontrada</h2>
          <p className="text-gray-600 mb-6">Lo sentimos, esta mascota no existe o fue eliminada.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const getImageSrc = () => {
    if (!pet.imagen) return "/placeholder.png";
    return `${import.meta.env.VITE_API_URL}/uploads/${pet.imagen}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Botón volver */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition font-medium"
        >
          <span className="text-xl">←</span> Volver a mascotas
        </button>

        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Imagen */}
            <div className="relative h-96 md:h-auto">
              <img
                className="w-full h-full object-cover"
                src={getImageSrc()}
                alt={pet.nombre}
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
              {/* Badge de estado */}
              <div className={`absolute top-6 right-6 px-4 py-2 rounded-full font-bold text-sm shadow-lg ${
                pet.estado === "disponible" 
                  ? "bg-green-500 text-white" 
                  : "bg-red-500 text-white"
              }`}>
                {pet.estado === "disponible" ? "✓ Disponible" : "✗ No disponible"}
              </div>
            </div>

            {/* Información */}
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-3">
                  {pet.nombre}
                </h1>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="px-4 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold capitalize">
                    {pet.especie}
                  </span>
                  {pet.raza && (
                    <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold capitalize">
                      {pet.raza}
                    </span>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Sobre {pet.nombre}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {pet.descripcion || "Sin descripción disponible."}
                </p>
              </div>

              {/* Características adicionales */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Edad</p>
                  <p className="text-lg font-bold text-gray-800">{pet.edad ? `${pet.edad} años` : "No especificada"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Sexo</p>
                  <p className="text-lg font-bold text-gray-800 capitalize">
                    {pet.sexo === 'macho' ? '♂️ Macho' : pet.sexo === 'hembra' ? '♀️ Hembra' : 'No especificado'}
                  </p>
                </div>
              </div>

              {/* Información del Refugio */}
              {pet.nombreRefugio && (
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    🏠 Refugio
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🏢</span>
                      <div>
                        <p className="font-bold text-gray-800">{pet.nombreRefugio}</p>
                        {pet.encargadoRefugio && (
                          <p className="text-sm text-gray-600">Encargado: {pet.encargadoRefugio}</p>
                        )}
                      </div>
                    </div>
                    {pet.direccionRefugio && (
                      <div className="flex items-start gap-3">
                        <span className="text-xl">📍</span>
                        <p className="text-gray-700">{pet.direccionRefugio}</p>
                      </div>
                    )}
                    {pet.telefonoRefugio && (
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📞</span>
                        <a href={`tel:${pet.telefonoRefugio}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          {pet.telefonoRefugio}
                        </a>
                      </div>
                    )}
                    {pet.emailRefugio && (
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📧</span>
                        <a href={`mailto:${pet.emailRefugio}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          {pet.emailRefugio}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Sección de adopción */}
              {pet.estado === "disponible" ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    ¿Quieres adoptar a {pet.nombre}?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cuéntanos por qué serías un buen hogar para {pet.nombre}. 
                    Incluye tu experiencia con mascotas y cómo cuidarías de él/ella.
                  </p>
                  
                  <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Ejemplo: Me gustaría adoptar a Luna porque tengo experiencia con perros y un jardín grande donde podrá jugar..."
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 transition min-h-[150px] resize-none"
                    rows={6}
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={solicitar}
                      disabled={sending}
                      className={`flex-1 px-6 py-4 rounded-2xl font-bold text-lg shadow-lg transition transform ${
                        sending 
                          ? "bg-gray-400 cursor-not-allowed" 
                          : "bg-gradient-to-r from-orange-500 to-pink-600 text-white hover:shadow-xl hover:scale-105"
                      }`}
                    >
                      {sending ? "Enviando..." : "💌 Enviar Solicitud"}
                    </button>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-bold">📋 Nota:</span> Debes iniciar sesión para enviar una solicitud de adopción.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-red-800 mb-2">
                    {pet.nombre} ya no está disponible
                  </h3>
                  <p className="text-red-700">
                    Esta mascota ya encontró un hogar. ¡Pero hay muchas otras esperando por ti!
                  </p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition"
                  >
                    Ver otras mascotas
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-3">🏥</div>
            <h4 className="font-bold text-gray-800 mb-2">Salud garantizada</h4>
            <p className="text-sm text-gray-600">Todas las mascotas están vacunadas y desparasitadas</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h4 className="font-bold text-gray-800 mb-2">Apoyo continuo</h4>
            <p className="text-sm text-gray-600">Te acompañamos durante todo el proceso de adopción</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-3">❤️</div>
            <h4 className="font-bold text-gray-800 mb-2">Adopción responsable</h4>
            <p className="text-sm text-gray-600">Verificamos que cada mascota encuentre el hogar perfecto</p>
          </div>
        </div>
      </div>
    </div>
  );
}