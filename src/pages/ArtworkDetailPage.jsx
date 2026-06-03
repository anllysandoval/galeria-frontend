import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArtworks } from '../context/ArtworkContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function ArtworkDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArtworkById } = useArtworks();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      const data = await getArtworkById(id);
      setArtwork(data);
      setLoading(false);
    };

    fetchArtwork();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info('Inicia sesión para agregar al carrito');
      return;
    }

    await addToCart(artwork._id);
    toast.success('Obra agregada al carrito');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-100 flex items-center justify-center">
        <p className="bg-white text-purple-300 font-bold px-8 py-4 rounded-2xl shadow-md">
          Cargando...
        </p>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-pink-100 flex items-center justify-center">
        <p className="bg-white text-red-400 font-bold px-8 py-4 rounded-2xl shadow-md">
          Obra no encontrada.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
        <h1 className="text-5xl font-extrabold uppercase tracking-wide drop-shadow-md">
          Detalle de Obra
        </h1>
        <p className="mt-4 text-xl font-medium drop-shadow-sm">
          Explora la historia y belleza de esta pieza
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-pink-100">
          <div className="bg-pink-50">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full min-h-[420px] object-cover"
            />
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="inline-block w-fit bg-pink-200 text-white font-bold px-4 py-2 rounded-full text-sm mb-5">
              {artwork.category}
            </span>

            <h2 className="text-4xl font-extrabold text-purple-300 mb-3">
              {artwork.title}
            </h2>

            <p className="text-gray-500 text-lg mb-5">
              por <span className="font-semibold">{artwork.artist}</span>
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              {artwork.description}
            </p>

            <p className="text-4xl font-extrabold text-purple-300 mb-8">
              ${artwork.price.toLocaleString()}
            </p>

            {artwork.available ? (
              <button
                onClick={handleAddToCart}
                className="bg-cyan-200 text-white font-bold py-3 rounded-full shadow-md hover:bg-cyan-300 transition"
              >
                Agregar al carrito
              </button>
            ) : (
              <p className="bg-red-100 text-red-500 font-semibold text-center py-3 rounded-full border border-red-200">
                Esta obra no está disponible
              </p>
            )}

            <button
              onClick={() => navigate('/gallery')}
              className="mt-5 text-purple-300 font-bold hover:text-purple-400 transition"
            >
              ← Volver a la galería
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}