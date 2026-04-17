import React from "react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 to-sky-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">Encuentra una nueva oportunidad para una vida feliz</h1>
          <p className="text-lg sm:text-xl text-indigo-100 mb-6">AdoptaPet conecta refugios y adoptantes con información, seguimiento y análisis para mejorar las tasas de adopción.</p>
          <div className="flex gap-3">
            <a href="#mascotas" className="inline-flex items-center px-5 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:opacity-95">Buscar mascotas</a>
            <a href="#nosotros" className="inline-flex items-center px-4 py-3 border border-white/30 rounded-lg text-white hover:bg-white/10">Conócenos</a>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 shadow-lg">
            <img src="/hero-pets.jpg" alt="Mascotas" className="w-full rounded-2xl object-cover h-64 sm:h-72" />
            <div className="mt-4 text-sm text-indigo-100">Comparte, adopta y cambia vidas. Cada adopción cuenta.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
