// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PetDetail from "./pages/PetDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MisSolicitudes from "./pages/MisSolicitudes";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import SolicitudesAdmin from "./pages/Admin/Solicitudes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mascota/:id" element={<PetDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Ruta protegida: Mis Solicitudes (solo para usuarios logueados) */}
            <Route path="/mis-solicitudes" element={
              <ProtectedRoute>
                <MisSolicitudes />
              </ProtectedRoute>
            } />

            {/* Ruta protegida: Panel Admin (solo para administradores) */}
            <Route path="/admin/solicitudes" element={
              <AdminRoute>
                <SolicitudesAdmin />
              </AdminRoute>
            } />

            {/* Ejemplo de ruta protegida */}
            <Route path="/perfil" element={
              <ProtectedRoute>
                <div className="p-6">Mi perfil (próximamente)</div>
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}