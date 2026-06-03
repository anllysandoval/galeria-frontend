import { FaBox, FaCheckCircle, FaTimesCircle, FaTruck } from 'react-icons/fa';

const statusConfig = {
  received: {
    icon: FaBox,
    color: 'text-cyan-300',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    label: 'Recibido',
  },
  confirmed: {
    icon: FaCheckCircle,
    color: 'text-green-400',
    bg: 'bg-green-50',
    border: 'border-green-200',
    label: 'Confirmado',
  },
  cancelled: {
    icon: FaTimesCircle,
    color: 'text-red-400',
    bg: 'bg-red-50',
    border: 'border-red-200',
    label: 'Cancelado',
  },
  delivered: {
    icon: FaTruck,
    color: 'text-purple-300',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    label: 'Entregado',
  },
};

function OrderStatus({ status, showLabel }) {
  const config = statusConfig[status] || statusConfig.received;
  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-bold ${config.bg} ${config.border} ${config.color}`}
    >
      <IconComponent size={16} />

      {showLabel && <span>{config.label}</span>}
    </span>
  );
}

export default OrderStatus;