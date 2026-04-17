import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function SolicitudesAdmin() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todas");
  const [procesando, setProcesando] = useState(null);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      const res = await api.get("/api/solicitudes");
      setSolicitudes(res.data);
    } catch (err) {
      console.error("Error al cargar solicitudes:", err);
      alert("Error al cargar solicitudes");
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (idSolicitud, nuevoEstado) => {
    if (!window.confirm(`¿Estás seguro de ${nuevoEstado === "aprobada" ? "APROBAR" : "RECHAZAR"} esta solicitud?`)) {
      return;
    }

    setProcesando(idSolicitud);
    try {
      await api.put(`/api/solicitudes/${idSolicitud}/estado`, { estado: nuevoEstado });
      alert(`Solicitud ${nuevoEstado === "aprobada" ? "aprobada" : "rechazada"} correctamente`);
      // Recargar solicitudes
      fetchSolicitudes();
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      alert("Error al actualizar la solicitud");
    } finally {
      setProcesando(null);
    }
  };

  const filtered = solicitudes.filter(s => {
    if (filter === "todas") return true;
    return s.estado === filter;
  });

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

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-4 font-medium">Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-800 mb-2">
            🔐 Panel de Administración
          </h1>
          <p className="text-gray-600">
            Gestiona todas las solicitudes de adopción
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl font-black text-blue-600 mb-2">
              {solicitudes.length}
            </div>
            <div className="text-gray-600 font-medium">Total</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl font-black text-yellow-600 mb-2">
              {solicitudes.filter(s => s.estado === "pendiente").length}
            </div>
            <div className="text-gray-600 font-medium">Pendientes</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl font-black text-green-600 mb-2">
              {solicitudes.filter(s => s.estado === "aprobada").length}
            </div>
            <div className="text-gray-600 font-medium">Aprobadas</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl font-black text-red-600 mb-2">
              {solicitudes.filter(s => s.estado === "rechazada").length}
            </div>
            <div className="text-gray-600 font-medium">Rechazadas</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {["todas", "pendiente", "aprobada", "rechazada"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 ${
                filter === f
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                  : "bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-400"
              }`}
            >
              {f === "todas" ? "Todas" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Lista de solicitudes */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No hay solicitudes {filter !== "todas" ? filter + "s" : ""}
            </h2>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((solicitud) => (
              <div
                key={solicitud.idSolicitud}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Imagen de la mascota */}
                    <div className="w-full lg:w-48 h-48 flex-shrink-0">
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
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-1">
                            {solicitud.nombreMascota || "Mascota"}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {solicitud.especieMascota} • {solicitud.razaMascota || "Sin especificar"}
                          </p>
                          <p className="text-sm text-gray-500">
                            ID Solicitud: #{solicitud.idSolicitud}
                          </p>
                        </div>

                        {/* Badge de estado */}
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getEstadoBadge(
                            solicitud.estado
                          )}`}
                        >
                          {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
                        </span>
                      </div>

                      {/* Información del solicitante */}
                      <div className="bg-blue-50 rounded-xl p-4 mb-4">
                        <p className="text-sm font-semibold text-blue-900 mb-2">
                          👤 Solicitante:
                        </p>
                        <p className="text-blue-800 font-medium">
                          {solicitud.nombreUsuario} {solicitud.apellidoUsuario}
                        </p>
                        <p className="text-blue-700 text-sm">
                          📧 {solicitud.emailUsuario}
                        </p>
                        {solicitud.telefonoUsuario && (
                          <p className="text-blue-700 text-sm">
                            📱 {solicitud.telefonoUsuario}
                          </p>
                        )}
                      </div>

                      {/* Mensaje del solicitante */}
                      {solicitud.mensaje && (
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            💬 Mensaje del solicitante:
                          </p>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {solicitud.mensaje}
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                          📅 {formatFecha(solicitud.fechaSolicitud)}
                        </div>

                        {/* Botones de acción */}
                        {solicitud.estado === "pendiente" && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => cambiarEstado(solicitud.idSolicitud, "aprobada")}
                              disabled={procesando === solicitud.idSolicitud}
                              className={`px-6 py-3 rounded-full font-bold text-sm shadow-lg transition transform hover:scale-105 ${
                                procesando === solicitud.idSolicitud
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-green-500 text-white hover:bg-green-600"
                              }`}
                            >
                              {procesando === solicitud.idSolicitud ? "Procesando..." : "✅ Aprobar"}
                            </button>
                            <button
                              onClick={() => cambiarEstado(solicitud.idSolicitud, "rechazada")}
                              disabled={procesando === solicitud.idSolicitud}
                              className={`px-6 py-3 rounded-full font-bold text-sm shadow-lg transition transform hover:scale-105 ${
                                procesando === solicitud.idSolicitud
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-red-500 text-white hover:bg-red-600"
                              }`}
                            >
                              {procesando === solicitud.idSolicitud ? "Procesando..." : "❌ Rechazar"}
                            </button>
                          </div>
                        )}

                        {solicitud.estado === "aprobada" && (
                          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                            <p className="text-green-700 font-semibold text-sm">
                              ✅ Solicitud aprobada
                            </p>
                          </div>
                        )}

                        {solicitud.estado === "rechazada" && (
                          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                            <p className="text-red-700 font-semibold text-sm">
                              ❌ Solicitud rechazada
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
      </div>
    </div>
  );
}