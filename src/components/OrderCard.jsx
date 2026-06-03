import { useState } from 'react';
import {
  IoReceiptOutline,
  IoCartOutline,
  IoStorefrontOutline,
  IoRocketOutline,
  IoTrashBinOutline,
} from 'react-icons/io5';
import { MdOutlineCancel } from 'react-icons/md';
import OrderStatus from './OrderStatus';
import SelectOrderStatus from './SelectOrderStatus';
import ConfirmModal from './ConfirmModal';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const formDate = (dateString) =>
  new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

function OrderCard({ order }) {
  const [activeTab, setActiveTab] = useState('info');
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const { updateStatusOrder, deleteOrder } = useOrders();
  const { isAdmin } = useAuth();

  if (!order) {
    return (
      <div className="bg-white rounded-3xl shadow-md border border-pink-100 p-6 text-center text-gray-500">
        No hay datos en la orden
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    if (order.status === 'delivered' && newStatus === 'cancelled') {
      toast.error('No se puede cancelar una orden ya entregada');
      return;
    }

    updateStatusOrder(order._id, { status: newStatus });
  };

  const tabs = [
    {
      label: 'Información',
      value: 'info',
      icon: <IoReceiptOutline size={16} className="mr-1" />,
      content: (
        <div className="space-y-3 p-5 text-sm text-gray-600">
          <div className="flex justify-between gap-4">
            <span className="font-bold text-gray-700">ID:</span>
            <span className="truncate text-gray-500">{order._id}</span>
          </div>

          <div className="flex justify-between items-center gap-4">
            <span className="font-bold text-gray-700">Estado:</span>
            {isAdmin ? (
              <SelectOrderStatus
                status={order.status}
                onChange={handleStatusChange}
              />
            ) : (
              <OrderStatus status={order.status} showLabel />
            )}
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-bold text-gray-700">Total de obras:</span>
            <span>{order.totalProducts}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-bold text-gray-700">Subtotal:</span>
            <span>${Number(order.subTotal).toFixed(2)}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-bold text-gray-700">IVA:</span>
            <span>${Number(order.iva).toFixed(2)}</span>
          </div>

          <div className="flex justify-between gap-4 border-t border-pink-100 pt-3 text-lg font-extrabold">
            <span className="text-gray-700">Total:</span>
            <span className="text-purple-300">
              ${Number(order.total).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-bold text-gray-700">Fecha:</span>
            <span className="text-right">{formDate(order.createdAt)}</span>
          </div>
        </div>
      ),
    },
    {
      label: 'Obras',
      value: 'items',
      icon: <IoCartOutline size={16} className="mr-1" />,
      content: (
        <div className="p-5 text-sm">
          {order.items && order.items.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-pink-100">
              <table className="w-full">
                <thead className="bg-pink-50 text-purple-300">
                  <tr className="text-left">
                    <th className="px-3 py-3 font-extrabold">Cant.</th>
                    <th className="px-3 py-3 font-extrabold">Obra</th>
                    <th className="px-3 py-3 font-extrabold">Precio</th>
                    <th className="px-3 py-3 font-extrabold text-right">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-600">
                  {order.items.map((item, i) => (
                    <tr
                      key={i}
                      className="border-t border-pink-100 hover:bg-cyan-50 transition"
                    >
                      <td className="px-3 py-3 font-semibold">
                        {item.quantity}
                      </td>

                      <td className="px-3 py-3 font-semibold">
                        {item.title || item.artworkId}
                      </td>

                      <td className="px-3 py-3">
                        ${Number(item.price).toLocaleString()}
                      </td>

                      <td className="px-3 py-3 text-right font-bold text-purple-300">
                        ${(item.quantity * item.price).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="bg-pink-50 rounded-2xl border border-pink-100 py-6 text-center text-gray-500">
              No hay obras en este pedido
            </p>
          )}
        </div>
      ),
    },
    {
      label: 'Pago',
      value: 'payment',
      icon: <IoStorefrontOutline size={16} className="mr-1" />,
      content: (
        <div className="p-5 text-sm space-y-3 text-gray-600">
          {order.paymentMethod.method === 'card' ? (
            <>
              <div className="flex justify-between gap-4">
                <span className="font-bold text-gray-700">Tipo:</span>
                <span className="text-right">Tarjeta de crédito/débito</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-bold text-gray-700">Número:</span>
                <span className="text-right">
                  {order.paymentMethod.cardDetails?.cardNumber}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-bold text-gray-700">Nombre:</span>
                <span className="text-right">
                  {order.paymentMethod.cardDetails?.cardName}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-bold text-gray-700">Vence:</span>
                <span>{order.paymentMethod.cardDetails?.expirationDate}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between gap-4">
                <span className="font-bold text-gray-700">Tipo:</span>
                <span>Recoger en galería</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="font-bold text-gray-700">Nombre:</span>
                <span className="text-right">
                  {order.paymentMethod.userName}
                </span>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  if (
    order.paymentMethod.method === 'card' &&
    order.paymentMethod.shippingAddress
  ) {
    tabs.push({
      label: 'Envío',
      value: 'shipping',
      icon: <IoRocketOutline size={16} className="mr-1" />,
      content: (
        <div className="p-5 text-sm space-y-3 text-gray-600">
          <div className="flex justify-between gap-4">
            <span className="font-bold text-gray-700">Nombre:</span>
            <span className="text-right">
              {order.paymentMethod.shippingAddress.name}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-bold text-gray-700">Dirección:</span>
            <span className="text-right">
              {order.paymentMethod.shippingAddress.address}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-bold text-gray-700">Teléfono:</span>
            <span>{order.paymentMethod.shippingAddress.phone}</span>
          </div>
        </div>
      ),
    });
  }

  return (
    <div className="w-full bg-white shadow-lg rounded-3xl overflow-hidden border border-pink-100 hover:shadow-2xl transition">
      <div className="flex justify-between items-center px-5 py-4 border-b border-pink-100 bg-white">
        <h2 className="text-lg font-extrabold text-purple-300">
          Pedido #{order._id.slice(-6).toUpperCase()}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setIsCancelModal(true)}
            className="bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded-full transition"
            title="Cancelar orden"
          >
            <MdOutlineCancel size={18} />
          </button>

          {isAdmin && order.status === 'cancelled' && (
            <button
              onClick={() => setIsDeleteModal(true)}
              className="bg-pink-100 hover:bg-pink-200 text-purple-300 p-2 rounded-full transition"
              title="Eliminar orden"
            >
              <IoTrashBinOutline size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex border-b border-pink-100 overflow-x-auto bg-pink-50">
        {tabs.map(({ label, value, icon }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={`px-4 py-3 text-xs font-bold flex items-center whitespace-nowrap transition ${
              activeTab === value
                ? 'bg-white text-purple-300 border-b-2 border-cyan-200'
                : 'text-gray-500 hover:text-purple-300 hover:bg-white'
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white">
        {tabs.find((t) => t.value === activeTab)?.content}
      </div>

      <ConfirmModal
        isOpen={isCancelModal}
        onClose={() => setIsCancelModal(false)}
        onConfirm={() => {
          setIsCancelModal(false);
          updateStatusOrder(order._id, { status: 'cancelled' });
        }}
        title="Cancelar pedido"
        text="¿Estás seguro que deseas cancelar este pedido? Esta acción no se puede deshacer."
        btnAccept="Confirmar"
        btnCancel="Cancelar"
      />

      <ConfirmModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        onConfirm={() => {
          setIsDeleteModal(false);
          deleteOrder(order._id);
        }}
        title="Eliminar pedido"
        text="¿Estás seguro que deseas eliminar este pedido?"
        btnAccept="Eliminar"
        btnCancel="Cancelar"
      />
    </div>
  );
}

export default OrderCard;