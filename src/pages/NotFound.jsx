import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pink-100">
      <header className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
        <h1 className="text-5xl font-extrabold drop-shadow-md">
          Galería de Arte
        </h1>
        <p className="mt-4 text-xl font-medium drop-shadow-sm">
          Parece que esta obra no existe
        </p>
      </header>

      <main className="flex items-center justify-center px-6 py-20">
        <section className="bg-white rounded-3xl shadow-2xl border border-pink-100 p-10 text-center max-w-md w-full">
          <h2 className="text-8xl font-extrabold text-purple-300 mb-4">
            404
          </h2>

          <h3 className="text-3xl font-extrabold text-gray-700 mb-4">
            Página no encontrada
          </h3>

          <p className="text-gray-500 mb-8">
            La ruta que buscas no existe o fue movida.
          </p>

          <Link
            to="/"
            className="inline-block bg-cyan-200 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-cyan-300 transition"
          >
            Volver al inicio
          </Link>
        </section>
      </main>
    </div>
  );
}