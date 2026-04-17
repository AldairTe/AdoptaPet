import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function Register() {
  const [form, setForm] = useState({ nombre: "", apellido: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      alert("Usuario registrado. Inicia sesión.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.error || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="nombre" value={form.nombre} onChange={onChange} className="w-full p-2 border rounded" placeholder="Nombre" />
        <input name="apellido" value={form.apellido} onChange={onChange} className="w-full p-2 border rounded" placeholder="Apellido" />
        <input name="email" value={form.email} onChange={onChange} className="w-full p-2 border rounded" placeholder="Email" />
        <input name="password" value={form.password} onChange={onChange} type="password" className="w-full p-2 border rounded" placeholder="Contraseña" />
        <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded">{loading ? "Registrando..." : "Registrar"}</button>
      </form>
    </div>
  );
}
