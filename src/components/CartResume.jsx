import { IoCartOutline } from 'react-icons/io5';
import { GiConfirmed } from 'react-icons/gi';
import { useCart } from '../context/CartContext';

function CartResume({ onConfirm }) {
  const { cart, totalItems, totalPrice } = useCart();

  const subtotal = totalPrice;
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl shadow-md border border-pink-100 p-8">
        <h2 className="flex justify-between items-center text-3xl font-extrabold text-purple-300 mb-6">
          Resumen de Compra
          <span className="bg-pink-100 text-cyan-300 rounded-full p-3 shadow-inner">
            <IoCartOutline size={30} />
          </span>
        </h2>

        {cart.items && cart.items.length > 0 ? (
          <>
            <div className="overflow-x-auto rounded-2xl border border-pink-100">
              <table className="w-full text-sm">
                <thead className="bg-pink-50 text-purple-300">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-extrabold">Cant.</th>
                    <th className="px-4 py-3 font-extrabold">Obra</th>
                    <th className="px-4 py-3 font-extrabold">Precio</th>
                    <th className="px-4 py-3 font-extrabold text-right">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-600">
                  {cart.items.map((item) => (
                    <tr
                      key={item.artworkId}
                      className="border-t border-pink-100 hover:bg-cyan-50 transition"
                    >
                      <td className="px-4 py-3 font-semibold">
                        {item.quantity}
                      </td>

                      <td className="px-4 py-3 font-semibold">
                        {item.title}
                      </td>

                      <td className="px-4 py-3">
                        ${item.price.toLocaleString()}
                      </td>

                      <td className="px-4 py-3 text-right font-bold text-purple-300">
                        ${(item.quantity * item.price).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-pink-50 rounded-2xl border border-pink-100 mt-6 p-5 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total de obras</span>
                <span className="font-bold">{totalItems}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>IVA (16%)</span>
                <span className="font-bold">${iva.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xl font-extrabold text-gray-700 border-t border-pink-100 pt-3">
                <span>Total</span>
                <span className="text-purple-300">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button
                onClick={onConfirm}
                className="bg-cyan-200 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-cyan-300 transition flex items-center gap-2"
              >
                Confirmar
                <GiConfirmed size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="bg-pink-50 rounded-2xl border border-pink-100 py-8 text-center">
            <p className="text-gray-500">
              El carrito está vacío
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartResume;