import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function ArtworkCard({ artwork }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info('Inicia sesión para agregar al carrito');
      return;
    }

    await addToCart(artwork._id);
    toast.success('Obra agregada al carrito');
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-pink-100 hover:shadow-2xl hover:-translate-y-1 transition">
      <div className="relative">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-64 object-cover"
        />

        <span className="absolute top-4 left-4 bg-pink-200 text-white font-bold px-4 py-2 rounded-full text-xs shadow-md">
          {artwork.category}
        </span>

        {!artwork.available && (
          <span className="absolute top-4 right-4 bg-red-100 text-red-500 font-bold px-4 py-2 rounded-full text-xs shadow-md">
            No disponible
          </span>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-extrabold text-purple-300 mb-2">
          {artwork.title}
        </h2>

        <p className="text-gray-500 mb-4">
          por <span className="font-semibold">{artwork.artist}</span>
        </p>

        <div className="flex items-center justify-between gap-4">
          <span className="font-extrabold text-xl text-gray-700">
            ${artwork.price.toLocaleString()}
          </span>

          <div className="flex gap-2">
            <Link
              to={`/artwork/${artwork._id}`}
              className="bg-white border-2 border-cyan-200 text-purple-300 font-bold px-4 py-2 rounded-full text-sm hover:bg-cyan-50 transition"
            >
              Ver
            </Link>

            {artwork.available && (
              <button
                onClick={handleAddToCart}
                className="bg-cyan-200 text-white font-bold px-4 py-2 rounded-full text-sm shadow-md hover:bg-cyan-300 transition"
              >
                + Carrito
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}