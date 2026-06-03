import { useEffect, useState } from 'react';
import { useOrders } from '../context/OrderContext';
import OrderCard from '../components/OrderCard';

function OrdersPage() {
  const { orders, getOrders } = useOrders();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      await getOrders();
      setLoading(false);
    };

    fetch();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-100 flex items-center justify-center">
        <p className="bg-white text-purple-300 font-bold px-8 py-4 rounded-2xl shadow-md">
          Cargando órdenes...
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-pink-100">
        <header className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
          <h1 className="text-5xl font-extrabold drop-shadow-md">
            Mis Pedidos
          </h1>
          <p className="mt-4 text-xl font-medium drop-shadow-sm">
            Consulta el historial de tus compras
          </p>
        </header>

        <main className="flex items-center justify-center px-6 py-20">
          <section className="bg-white rounded-3xl shadow-2xl border border-pink-100 p-10 text-center max-w-md w-full">
            <h2 className="text-3xl font-extrabold text-purple-300 mb-4">
              Sin pedidos
            </h2>

            <p className="text-gray-500 text-lg">
              No hay órdenes para mostrar.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-100">
      <header className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
        <h1 className="text-5xl font-extrabold drop-shadow-md">
          Mis Pedidos
        </h1>
        <p className="mt-4 text-xl font-medium drop-shadow-sm">
          Consulta el historial de tus compras
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default OrdersPage;