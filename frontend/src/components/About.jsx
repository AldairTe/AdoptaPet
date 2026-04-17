import React from "react";

export default function About() {
  return (
    <section id="nosotros" className="py-16 bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Nuestra misión</h2>
          <p className="text-slate-600 mb-4">AdoptaPet promueve la adopción responsable mediante una plataforma que centraliza la información de refugios, facilita el proceso de adopción y provee herramientas analíticas para mejorar la gestión.</p>
          <ul className="list-disc pl-5 text-slate-600 space-y-2">
            <li>Conectar refugios con adoptantes.</li>
            <li>Reducir el tiempo promedio de permanencia de mascotas en refugios.</li>
            <li>Generar insights para campañas y políticas públicas.</li>
          </ul>
        </div>
        <div>
          <img src="/about-illustration.jpg" alt="Nosotros" className="rounded-2xl shadow-md object-cover w-full h-64" />
        </div>
      </div>
    </section>
  );
}
