import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function CartPage() {
  const {
    cart,
    totalItems,
    totalPrice,
    getCart,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  const handleRemove = async (artworkId) => {
    await removeFromCart(artworkId);
    toast.info('Obra eliminada del carrito');
  };

  const handleClear = async () => {
    await clearCart();
    toast.info('Carrito vaciado');
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-pink-100">
        <header className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
          <h1 className="text-5xl font-extrabold drop-shadow-md">
            Tu Carrito
          </h1>
        </header>

        <main className="flex flex-col items-center justify-center px-6 py-20">
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center max-w-md w-full border border-pink-100">
            <h2 className="text-3xl font-extrabold text-purple-300 mb-4">
              Carrito vacío
            </h2>

            <p className="text-gray-500 mb-8">
              Tu carrito está vacío.
            </p>

            <button
              onClick={() => navigate('/gallery')}
              className="bg-cyan-200 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-cyan-300 transition"
            >
              Ver Galería
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-100">
      <header className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
        <h1 className="text-5xl font-extrabold drop-shadow-md">
          Tu Carrito
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-end mb-5">
          <button
            onClick={handleClear}
            className="bg-white text-red-400 font-semibold px-5 py-2 rounded-full shadow-sm border border-pink-100 hover:bg-red-50 transition"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="space-y-5">
          {cart.items.map((item) => (
            <div
              key={item.artworkId}
              className="bg-white rounded-2xl shadow-md border border-pink-100 px-5 py-4 flex items-center gap-5"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-xl border border-gray-100"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-extrabold text-purple-300 mb-2">
                  {item.title}
                </h2>

                <p className="text-gray-600 text-sm">
                  Cantidad: {item.quantity}
                </p>

                <button
                  onClick={() => handleRemove(item.artworkId)}
                  className="mt-2 text-sm text-red-400 hover:text-red-600 transition"
                >
                  Eliminar
                </button>
              </div>

              <p className="text-purple-300 font-extrabold text-lg whitespace-nowrap">
                ${(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-md border border-pink-100 px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-gray-500 text-sm mb-1">
              {totalItems} obra(s)
            </p>

            <h2 className="text-2xl font-extrabold text-gray-700">
              Total:{' '}
              <span className="text-purple-300">
                ${totalPrice.toLocaleString()}
              </span>
            </h2>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="bg-cyan-200 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-cyan-300 transition"
          >
            Proceder al Pago
          </button>
        </div>
      </main>
    </div>
  );
}