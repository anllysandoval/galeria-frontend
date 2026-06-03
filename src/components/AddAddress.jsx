import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '../schemas/addressSchema';
import { IoPersonOutline } from 'react-icons/io5';
import { FaRegAddressCard } from 'react-icons/fa';
import { MdPhoneIphone } from 'react-icons/md';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function AddAddress({ onBack, onConfirm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const onSubmit = handleSubmit((values) => {
    setFormValues(values);
    setIsModalOpen(true);
  });

  const handleConfirm = () => {
    setIsModalOpen(false);
    onConfirm(formValues);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl shadow-md border border-pink-100 p-8">
        <h1 className="text-3xl font-extrabold text-purple-300 mb-6 text-center">
          Dirección de Envío
        </h1>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="text-sm font-bold text-purple-300 block mb-2 pl-1">
              Nombre completo
            </label>

            <div className="relative flex">
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 border-2 border-cyan-200 rounded-full text-gray-700 bg-white outline-none focus:border-purple-300 transition"
                placeholder="Nombre completo"
                {...register('name')}
              />

              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-cyan-300 pointer-events-none">
                <IoPersonOutline size={20} />
              </div>
            </div>

            {errors.name && (
              <p className="text-red-400 text-sm mt-2 pl-2">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Dirección */}
          <div>
            <label className="text-sm font-bold text-purple-300 block mb-2 pl-1">
              Dirección
            </label>

            <div className="relative flex">
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 border-2 border-cyan-200 rounded-full text-gray-700 bg-white outline-none focus:border-purple-300 transition"
                placeholder="Calle, número, colonia, ciudad"
                {...register('address')}
              />

              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-cyan-300 pointer-events-none">
                <FaRegAddressCard size={20} />
              </div>
            </div>

            {errors.address && (
              <p className="text-red-400 text-sm mt-2 pl-2">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-sm font-bold text-purple-300 block mb-2 pl-1">
              Teléfono
            </label>

            <div className="relative flex">
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 border-2 border-cyan-200 rounded-full text-gray-700 bg-white outline-none focus:border-purple-300 transition"
                placeholder="10 dígitos"
                {...register('phone')}
              />

              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-cyan-300 pointer-events-none">
                <MdPhoneIphone size={20} />
              </div>
            </div>

            {errors.phone && (
              <p className="text-red-400 text-sm mt-2 pl-2">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={onBack}
              className="bg-white border-2 border-cyan-200 text-purple-300 font-bold py-3 px-6 rounded-full hover:bg-cyan-50 transition flex items-center justify-center gap-2"
            >
              <GrFormPreviousLink size={22} />
              Método de pago
            </button>

            <button
              type="submit"
              className="bg-cyan-200 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-cyan-300 transition flex items-center justify-center gap-2"
            >
              Finalizar pedido
              <GrFormNextLink size={22} />
            </button>
          </div>
        </form>

        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          title="Confirmar pedido"
          text="¿Estás seguro que deseas confirmar este pedido? Esta acción no se puede deshacer."
          btnAccept="Confirmar"
          btnCancel="Cancelar"
        />
      </div>
    </div>
  );
}

export default AddAddress;