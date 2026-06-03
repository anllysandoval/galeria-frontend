import { useState, useEffect } from 'react';
import OrderStatus from './OrderStatus';

const selectOptions = [
  { label: 'Recibido', value: 'received' },
  { label: 'Confirmado', value: 'confirmed' },
  { label: 'Cancelado', value: 'cancelled' },
  { label: 'Entregado', value: 'delivered' },
];

function SelectOrderStatus({ status, onChange }) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const isDisabled = status === 'cancelled';

  useEffect(() => {
    if (selectedStatus !== status) {
      onChange(selectedStatus);
    }
  }, [selectedStatus]);

  return (
    <div className="flex items-center gap-2 text-xs">
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        disabled={isDisabled}
        className={`py-2 px-3 rounded-full border-2 font-bold outline-none transition ${
          isDisabled
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
            : 'bg-white text-purple-300 border-cyan-200 hover:bg-cyan-50 focus:border-purple-300'
        }`}
      >
        {selectOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <OrderStatus status={selectedStatus} showLabel={false} />
    </div>
  );
}

export default SelectOrderStatus;