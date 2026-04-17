import React, { useEffect, useState } from "react";
import PetCard from "../components/PetCard";

export default function Home() {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL;
    fetch(`${api}/api/mascotas`)
      .then(res => res.json())
      .then(data => setMascotas(data))
      .catch(err => console.error("Error al cargar mascotas:", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = mascotas.filter(p =>
    filter === "todos" ? true : p.especie === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section - Mejorado */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 text-white min-h-[600px] flex items-center">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-green-500 rounded-full opacity-40"></div>
        
        <div className="relative z-10 container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left space-y-6">
            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              Adopta<span className="text-yellow-300">!</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/90">
              🐾 Conecta. Protege. Adopta.
            </p>
            <p className="text-lg text-white/80 max-w-md">
              Dale un hogar a quien te está esperando.  
              <span className="font-semibold"> ¡Adopta a tu nuevo mejor amigo!</span>
            </p>
            <div className="flex gap-4">
              <a
                href="#mascotas"
                className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transition transform hover:scale-105"
              >
                Explorar Ahora
              </a>
              <a
                href="#nosotros"
                className="inline-block px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition transform hover:scale-105"
              >
                Saber Más
              </a>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="relative z-10">
              <img
                src="/hero-pets.webp"
                alt="Happy pet"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Quote Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            NADIE DIJO QUE SERÍA FÁCIL, SÓLO DIJERON{" "}
            <span className="text-pink-600">QUE VALDRÍA LA PENA.</span>
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Adoptar puede ser desafiante, pero el amor que recibirás es invaluable.
            Cada mascota merece una segunda oportunidad.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition">
              Leer Más
            </button>
            <button className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition">
              Donar
            </button>
          </div>
        </div>
      </section>

      {/* Mascotas Section - Rediseñada */}
      <section id="mascotas" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            🐶 Encuentra a tu nuevo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">
              mejor amigo
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cada mascota tiene una historia única y está esperando convertirse en parte de la tuya
          </p>
        </div>

        {/* Filtros mejorados */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {["todos", "perro", "gato", "otro"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 ${
                filter === f
                  ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg"
                  : "bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-400"
              }`}
            >
              {f === "todos" ? "Todos" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4 font-medium">Cargando mascotas...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <p className="text-gray-500 text-xl">😢 No hay mascotas disponibles en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map(p => (
              <PetCard key={p.idMascota} pet={p} />
            ))}
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center text-gray-800 mb-16">
            ¿Por qué adoptar con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">
              nosotros?
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                ❤️
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Amor Garantizado</h3>
              <p className="text-gray-600">
                Todas nuestras mascotas están listas para dar y recibir amor incondicional
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                🏥
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Salud Certificada</h3>
              <p className="text-gray-600">
                Todas las mascotas están vacunadas y han pasado controles veterinarios
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                🤝
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Apoyo Continuo</h3>
              <p className="text-gray-600">
                Te acompañamos en todo el proceso y después de la adopción
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Rediseñada */}
      <section id="nosotros" className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/pet_1.jpg"
                alt="Mascota feliz 1"
                className="rounded-3xl shadow-lg w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="20"%3EMascota 1%3C/text%3E%3C/svg%3E';
                }}
              />
              <img
                src="/pet_2.jpg"
                alt="Mascota feliz 2"
                className="rounded-3xl shadow-lg w-full h-64 object-cover mt-8"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-size="20"%3EMascota 2%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
              🏡 Sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">nosotros</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Somos una plataforma dedicada con pasión a conectar mascotas en busca de un hogar 
              con personas que quieran darles amor y cuidado. Creemos que cada animal merece 
              una segunda oportunidad.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Trabajamos de cerca con refugios locales y voluntarios comprometidos para asegurar 
              que cada adopción sea un proceso seguro, transparente y feliz para todos los involucrados.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-4xl font-black text-orange-500">500+</div>
                <div className="text-gray-600 font-medium">Adopciones</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-pink-500">50+</div>
                <div className="text-gray-600 font-medium">Refugios</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-purple-500">1000+</div>
                <div className="text-gray-600 font-medium">Familias Felices</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eco-Friendly Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-400 to-cyan-500 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-black mb-6 leading-tight">
              FOR PETS THAT LOVE{" "}
              <span className="text-yellow-300">THE PLANET</span>
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Promovemos prácticas sostenibles y eco-amigables en el cuidado de mascotas.
              Porque un planeta saludable significa mascotas saludables.
            </p>
            <button className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition transform hover:scale-105">
              Conoce Más
            </button>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
              <div className="text-8xl mb-4">🌍</div>
              <p className="text-2xl font-bold">Cuidamos el planeta</p>
              <p className="text-white/80 mt-2">Para las futuras generaciones</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Rediseñada */}
      <section id="contacto" className="py-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            📬 ¿Listo para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">
              adoptar?
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Contáctanos y te ayudaremos a encontrar tu compañero perfecto
          </p>
        </div>
        
        <form className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder="Nombre completo"
              className="border-2 border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border-2 border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 transition"
            />
          </div>
          <input
            type="tel"
            placeholder="Teléfono"
            className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 mb-6 focus:outline-none focus:border-orange-500 transition"
          />
          <textarea
            placeholder="Cuéntanos por qué quieres adoptar..."
            className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 mb-6 focus:outline-none focus:border-orange-500 transition"
            rows={5}
          />
          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Enviar Mensaje 💌
          </button>
        </form>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-black mb-4">
            Únete a #Adoption
          </h3>
          <p className="text-gray-300 mb-8">
            Recibe noticias sobre nuevas mascotas disponibles y consejos de cuidado
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-pink-500"
            />
            <button className="px-8 py-4 bg-pink-600 rounded-full font-bold hover:bg-pink-500 transition">
              →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}