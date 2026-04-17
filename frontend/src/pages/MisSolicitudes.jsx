import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getCurrentUser } from "../services/auth";

export default function MisSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchSolicitudes = async () => {
      try {
        const res = await api.get("/api/solicitudes");
        // Filtrar solo las solicitudes del usuario actual
        const misSolicitudes = res.data.filter(s => s.idUsuario === user.idUsuario);
        setSolicitudes(misSolicitudes);
      } catch (err) {
        console.error("Error al cargar solicitudes:", err);
        alert("Error al cargar tus solicitudes");
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, [user, navigate]);

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "aprobada":
        return "bg-green-100 text-green-800 border-green-300";
      case "rechazada":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "pendiente":
        return "⏳";
      case "aprobada":
        return "✅";
      case "rechazada":
        return "❌";
      default:
        return "📋";
    }
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-4 font-medium">Cargando tus solicitudes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-800 mb-2">
            Mis Solicitudes de Adopción
          </h1>
          <p className="text-gray-600">
            Aquí puedes ver el estado de todas tus solicitudes
          </p>
        </div>

        {/* Lista de solicitudes */}
        {solicitudes.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🐾</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No tienes solicitudes aún
            </h2>
            <p className="text-gray-600 mb-6">
              Explora nuestras mascotas disponibles y encuentra a tu compañero ideal
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold rounded-full hover:shadow-lg transition transform hover:scale-105"
            >
              Ver mascotas disponibles
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {solicitudes.map((solicitud) => (
              <div
                key={solicitud.idSolicitud}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Imagen de la mascota */}
                    <div className="w-full md:w-48 h-48 flex-shrink-0">
                      <img
                        src={
                          solicitud.imagenMascota
                            ? `${import.meta.env.VITE_API_URL}/uploads/${solicitud.imagenMascota}`
                            : "/placeholder.png"
                        }
                        alt={solicitud.nombreMascota}
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                          e.target.src = "/placeholder.png";
                        }}
                      />
                    </div>

                    {/* Información */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-1">
                            {solicitud.nombreMascota || "Mascota"}
                          </h3>
                          <p className="text-gray-600">
                            {solicitud.especieMascota} • {solicitud.razaMascota || "Sin especificar"}
                          </p>
                        </div>

                        {/* Badge de estado */}
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getEstadoBadge(
                            solicitud.estado
                          )}`}
                        >
                          {getEstadoIcon(solicitud.estado)}{" "}
                          {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
                        </span>
                      </div>

                      {/* Mensaje */}
                      {solicitud.mensaje && (
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Tu mensaje:
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {solicitud.mensaje}
                          </p>
                        </div>
                      )}

                      {/* Footer con fecha y acciones */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                          📅 Solicitado el {formatFecha(solicitud.fechaSolicitud)}
                        </div>

                        {solicitud.estado === "aprobada" && (
                          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                            <p className="text-green-700 font-semibold text-sm">
                              🎉 ¡Felicidades! Tu solicitud fue aprobada
                            </p>
                          </div>
                        )}

                        {solicitud.estado === "rechazada" && (
                          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                            <p className="text-red-700 font-semibold text-sm">
                              Lo sentimos, esta solicitud no fue aprobada
                            </p>
                          </div>
                        )}

                        {solicitud.estado === "pendiente" && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
                            <p className="text-yellow-700 font-semibold text-sm">
                              ⏳ En revisión por el refugio
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estadísticas */}
        {solicitudes.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">
                {solicitudes.length}
              </div>
              <div className="text-gray-600 font-medium">Total de solicitudes</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl font-black text-green-600 mb-2">
                {solicitudes.filter(s => s.estado === "aprobada").length}
              </div>
              <div className="text-gray-600 font-medium">Aprobadas</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl font-black text-yellow-600 mb-2">
                {solicitudes.filter(s => s.estado === "pendiente").length}
              </div>
              <div className="text-gray-600 font-medium">Pendientes</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}