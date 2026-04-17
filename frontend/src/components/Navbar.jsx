import React, { useState } from "react";
import { getCurrentUser, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
              🐾
            </div>
            <div>
              <div className="text-lg font-bold text-slate-800">AdoptaPet</div>
              <div className="text-xs text-slate-500">Conecta. Protege. Adopta.</div>
            </div>
          </a>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#mascotas" className="text-slate-600 hover:text-orange-600 font-medium transition">
              Mascotas
            </a>
            <a href="/#nosotros" className="text-slate-600 hover:text-orange-600 font-medium transition">
              Nosotros
            </a>
            <a href="/#contacto" className="text-slate-600 hover:text-orange-600 font-medium transition">
              Contacto
            </a>

            {/* Si hay usuario logueado */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700">
                  👋 Hola, {user.nombre}
                </span>

                {/* Enlace para usuarios adoptantes */}
                {user.tipo === "adoptante" && (
                  <a
                    href="/mis-solicitudes"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full font-semibold text-sm hover:shadow-lg transition transform hover:scale-105"
                  >
                    📋 Mis Solicitudes
                  </a>
                )}

                {/* Enlace para administradores */}
                {user.tipo === "administrador" && (
                  <a
                    href="/admin/solicitudes"
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full font-semibold text-sm hover:shadow-lg transition transform hover:scale-105"
                  >
                    🔐 Panel Admin
                  </a>
                )}

                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-gray-100 text-slate-700 rounded-full hover:bg-gray-200 text-sm font-medium transition"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <a
                  href="/login"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full shadow-md hover:shadow-lg font-semibold text-sm transition transform hover:scale-105"
                >
                  Iniciar sesión
                </a>
                <a
                  href="/register"
                  className="px-5 py-2 border-2 border-orange-500 text-orange-600 rounded-full hover:bg-orange-50 font-semibold text-sm transition"
                >
                  Registrarse
                </a>
              </div>
            )}
          </nav>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a 
              href="/#mascotas" 
              className="block text-slate-700 font-medium hover:text-orange-600 transition"
              onClick={() => setOpen(false)}
            >
              🐾 Mascotas
            </a>
            <a 
              href="/#nosotros" 
              className="block text-slate-700 font-medium hover:text-orange-600 transition"
              onClick={() => setOpen(false)}
            >
              🏡 Nosotros
            </a>
            <a 
              href="/#contacto" 
              className="block text-slate-700 font-medium hover:text-orange-600 transition"
              onClick={() => setOpen(false)}
            >
              📬 Contacto
            </a>

            {user ? (
              <>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600 mb-3">👋 Hola, {user.nombre}</p>
                  
                  {/* Para usuarios adoptantes */}
                  {user.tipo === "adoptante" && (
                    <a
                      href="/mis-solicitudes"
                      className="block mb-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg text-center font-semibold"
                      onClick={() => setOpen(false)}
                    >
                      📋 Mis Solicitudes
                    </a>
                  )}

                  {/* Para administradores */}
                  {user.tipo === "administrador" && (
                    <a
                      href="/admin/solicitudes"
                      className="block mb-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-center font-semibold"
                      onClick={() => setOpen(false)}
                    >
                      🔐 Panel Admin
                    </a>
                  )}

                  <button
                    onClick={onLogout}
                    className="block w-full bg-gray-100 text-slate-700 rounded-lg py-2 text-center font-medium hover:bg-gray-200 transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-3 border-t space-y-2">
                <a
                  href="/login"
                  className="block px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg text-center font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Iniciar sesión
                </a>
                <a
                  href="/register"
                  className="block px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-lg text-center font-semibold hover:bg-orange-50 transition"
                  onClick={() => setOpen(false)}
                >
                  Registrarse
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}