import { Link } from 'react-router-dom';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-pink-100">
      <header className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
        <h1 className="text-5xl font-extrabold drop-shadow-md">
          Compra Exitosa
        </h1>
        <p className="mt-4 text-xl font-medium drop-shadow-sm">
          Gracias por apoyar el arte original
        </p>
      </header>

      <main className="flex items-center justify-center px-6 py-20">
        <section className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-pink-100">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-pink-100 flex items-center justify-center shadow-inner">
            <span className="text-5xl">🎉</span>
          </div>

          <h2 className="text-4xl font-extrabold text-purple-300 mb-4">
            ¡Compra Exitosa!
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Tu compra ha sido confirmada. ¡Gracias por adquirir arte original!
          </p>

          <Link
            to="/gallery"
            className="inline-block bg-cyan-200 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-cyan-300 transition"
          >
            Volver a la galería
          </Link>
        </section>
      </main>
    </div>
  );
}