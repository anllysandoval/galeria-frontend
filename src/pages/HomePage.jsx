import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { isAuthenticated, login } = useAuth();

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
        <h1 className="text-5xl font-extrabold drop-shadow-md">
          Galería de Arte
        </h1>
        <p className="mt-4 text-xl font-medium drop-shadow-sm">
          Inicia sesión para continuar
        </p>
      </header>

      {/* Contenido */}
      <main className="flex-1 flex items-center justify-center px-6">
        <section className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-10 text-center border border-pink-100">
          <h2 className="text-3xl font-bold text-purple-300 mb-5">
            Bienvenido
          </h2>

          <p className="text-gray-500 mb-8 leading-relaxed">
            Descubre obras únicas de artistas de todo el mundo. Explora,
            colecciona y adquiere arte original.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/gallery"
              className="bg-cyan-200 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-cyan-300 transition"
            >
              Ver Galería
            </Link>

            {!isAuthenticated && (
              <button
                onClick={login}
                className="border-2 border-cyan-200 text-purple-300 font-bold px-8 py-3 rounded-full hover:bg-cyan-50 transition"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}