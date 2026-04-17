import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <div className="text-lg font-bold">AdoptaPet</div>
          <div className="text-sm text-slate-400">Conecta. Protege. Adopta.</div>
        </div>
        <div className="flex gap-4">
          <a className="text-slate-300 hover:text-white" href="#" aria-label="Facebook">Facebook</a>
          <a className="text-slate-300 hover:text-white" href="#" aria-label="Instagram">Instagram</a>
          <a className="text-slate-300 hover:text-white" href="#" aria-label="Twitter">Twitter</a>
        </div>
      </div>
      <div className="bg-slate-900 text-slate-500 text-sm text-center py-3">© {new Date().getFullYear()} AdoptaPet. Todos los derechos reservados.</div>
    </footer>
  );
}
