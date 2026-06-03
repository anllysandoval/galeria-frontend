import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, login, logout, isLoading } =
    useAuth();

  const { totalItems } = useCart();

  if (isLoading) return null;

  return (
    <nav className="bg-white shadow-md border-b border-pink-100 px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <Link
        to="/gallery"
        className="text-2xl font-extrabold text-purple-300 hover:text-purple-400 transition"
      >
        🎨 Galería de Arte
      </Link>

      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        <Link
          to="/gallery"
          className="text-gray-600 font-semibold hover:text-purple-300 transition"
        >
          Galería
        </Link>

        {isAuthenticated && (
          <>
            <Link
              to="/cart"
              className="relative text-gray-600 font-semibold hover:text-purple-300 transition"
            >
              🛒 Carrito

              {totalItems > 0 && (
                <span className="absolute -top-3 -right-4 bg-pink-200 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/orders"
              className="text-gray-600 font-semibold hover:text-purple-300 transition"
            >
              📋 Mis Pedidos
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="text-gray-600 font-semibold hover:text-purple-300 transition"
              >
                Admin
              </Link>
            )}

            <span className="bg-pink-50 text-gray-500 text-sm font-semibold px-4 py-2 rounded-full border border-pink-100">
              {user?.name || user?.email}
            </span>

            <button
              onClick={logout}
              className="bg-white border-2 border-cyan-200 text-purple-300 font-bold px-5 py-2 rounded-full hover:bg-cyan-50 transition"
            >
              Cerrar sesión
            </button>
          </>
        )}

        {!isAuthenticated && (
          <button
            onClick={login}
            className="bg-cyan-200 text-white font-bold px-5 py-2 rounded-full shadow-md hover:bg-cyan-300 transition"
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  );
}