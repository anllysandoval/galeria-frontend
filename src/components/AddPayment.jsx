import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema, validateCard } from '../schemas/paymentSchema';
import { IoCardOutline, IoPersonOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';
import { FaCcMastercard } from 'react-icons/fa6';
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function AddPayment({ onBack, onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: { paymentMethod: 'pickup' },
  });

  const [paymentType, setPaymentType] = useState('pickup');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const paymentMethod = watch('paymentMethod');
  const cardNumber = watch('cardNumber');
  const expirationDate = watch('expirationDate');

  const handlePaymentMethodChange = (method) => {
    setValue('paymentMethod', method);
    setPaymentType(method);
  };

  const onSubmit = (data) => {
    if (paymentMethod === 'card') {
      onNext(
        {
          paymentMethod: 'card',
          cardDetails: {
            cardName: data.cardName,
            cardNumber: data.cardNumber,
            expirationDate: data.expirationDate,
            ccv: data.ccv,
          },
        },
        'address'
      );
    } else {
      onNext(
        {
          paymentMethod: 'pickup',
          userName: data.userName,
        },
        'confirm'
      );
    }
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(' ').slice(0, 19) : '';
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setValue('cardNumber', formatted);
    trigger('cardNumber');
  };

  const handleDateChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    const formatted =
      val.length >= 3 ? `${val.slice(0, 2)}/${val.slice(2)}` : val;

    setValue('expirationDate', formatted);
    trigger('expirationDate');
  };

  const isCardValid = cardNumber && validateCard(cardNumber);

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl shadow-md border border-pink-100 p-8">
        <h1 className="text-3xl font-extrabold text-purple-300 mb-6 text-center">
          Método de Pago
        </h1>

        {/* Selector de método */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <label
            className={`cursor-pointer rounded-2xl border-2 px-5 py-4 transition shadow-sm ${
              paymentMethod === 'pickup'
                ? 'border-cyan-200 bg-cyan-50'
                : 'border-pink-100 bg-white hover:bg-pink-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                value="pickup"
                checked={paymentMethod === 'pickup'}
                {...register('paymentMethod')}
                onClick={() => handlePaymentMethodChange('pickup')}
                className="h-4 w-4 accent-cyan-300"
              />

              <span className="font-bold text-gray-700">
                Recoger en galería
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-2 pl-7">
              Paga y recoge tu obra directamente en la galería.
            </p>
          </label>

          <label
            className={`cursor-pointer rounded-2xl border-2 px-5 py-4 transition shadow-sm ${
              paymentMethod === 'card'
                ? 'border-cyan-200 bg-cyan-50'
                : 'border-pink-100 bg-white hover:bg-pink-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                {...register('paymentMethod')}
                onClick={() => handlePaymentMethodChange('card')}
                className="h-4 w-4 accent-cyan-300"
              />

              <span className="font-bold text-gray-700">
                Pago con tarjeta
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-2 pl-7">
              Ingresa los datos de tu tarjeta y dirección de envío.
            </p>
          </label>
        </div>

        {/* Formulario tarjeta */}
        {paymentType === 'card' && (
          <div className="bg-pink-50 rounded-3xl border border-pink-100 p-6 mb-6">
            <h2 className="text-2xl font-extrabold text-purple-300 mb-5">
              Datos de la tarjeta
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-bold text-purple-300 block mb-2 pl-1">
                  Número de tarjeta
                </label>

                <div className="relative flex">
                  <input
                    type="text"
                    {...register('cardNumber')}
                    className="w-full pl-11 pr-4 py-3 border-2 border-cyan-200 rounded-full text-gray-700 bg-white outline-none focus:border-purple-300 transition"
                    placeholder="1234 5678 9012 3456"
                    onChange={handleCardNumberChange}
                    value={cardNumber || ''}
                  />

                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-cyan-300 pointer-events-none">
                    <IoCardOutline size={20} />
                  </div>
                </div>

                {isCardValid && (
                  <p className="text-green-500 text-sm font-semibold mt-2 pl-2">
                    Tarjeta válida
                  </p>
                )}

                {errors?.cardNumber && (
                  <p className="text-red-400 text-sm mt-2 pl-2">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-purple-300 block mb-2 pl-1">
                  Nombre en la tarjeta
                </label>

                <div className="relative flex">
                  <input
                    type="text"
                    {...register('cardName')}
                    className="w-full pl-11 pr-4 py-3 border-2 border-cyan-200 rounded-full text-gray-700 bg-white outline-none focus:border-purple-300 transition"
                    placeholder="Nombre en la tarjeta"
                  />

                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-cyan-300 pointer-events-none">
                    <IoPersonOutline size={20} />
                  </div>
                </div>

                {errors?.cardName && (
                  <p className="text-red-400 text-sm mt-2 pl-2">
                    {errors.cardName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-purple-300 block mb-2 pl-1">
                  Fecha de expiración (MM/YY)
                </label>

                <div className="relative flex">
                  <input
                    type="text"
                    {...register('expirationDate')}
                    className="w-full pl-11 pr-4 py-3 border-2 border-cyan-200 rounded-full text-gray-700 bg-white outline-none focus:border-purple-300 transition"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={expirationDate || ''}
                    onChange={handleDateChange}
                    onBlur={() => trigger('expirationDate')}
                  />

                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-cyan-300 pointer-events-none">
                    <BsCalendar2Date size={20} />
                  </div>
                </div>

                {errors?.expirationDate && (
                  <p className="text-red-400 text-sm mt-2 pl-2">
                    {errors.expirationDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-bold text-purple-300 block mb-2 pl-1">
                  CCV
                </label>

                <div className="relative flex">
                  <input
                    type="text"
                    {...register('ccv')}
                    className="w-full pl-11 pr-4 py-3 border-2 border-cyan-200 rounded-full text-gray-700 bg-white outline-none focus:border-purple-300 transition"
                    placeholder="123"
                    maxLength={3}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 3);
                      setValue('ccv', val);
                      trigger('ccv');
                    }}
                  />

                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-cyan-300 pointer-events-none">
                    <FaCcMastercard size={20} />
                  </div>
                </div>

                {errors?.ccv && (
                  <p className="text-red-400 text-sm mt-2 pl-2">
                    {errors.ccv.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Formulario recoger en galería */}
        {paymentType === 'pickup' && (
          <div className="bg-pink-50 rounded-3xl border border-pink-100 p-6 mb-6">
            <label className="text-sm font-bold text-purple-300 block mb-2 pl-1">
              Nombre de quien recoge
            </label>

            <div className="relative flex">
              <input
                type="text"
                {...register('userName')}
                className="w-full pl-11 pr-4 py-3 border-2 border-cyan-200 rounded-full text-gray-700 bg-white outline-none focus:border-purple-300 transition"
                placeholder="Nombre completo"
              />

              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-cyan-300 pointer-events-none">
                <IoPersonOutline size={20} />
              </div>
            </div>

            {errors?.userName && (
              <p className="text-red-400 text-sm mt-2 pl-2">
                {errors.userName.message}
              </p>
            )}
          </div>
        )}

        {/* Botones de navegación */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={onBack}
            type="button"
            className="bg-white border-2 border-cyan-200 text-purple-300 font-bold py-3 px-6 rounded-full hover:bg-cyan-50 transition flex items-center justify-center gap-2"
          >
            <GrFormPreviousLink size={22} />
            Revisar orden
          </button>

          <button
            type="button"
            onClick={() => {
              if (paymentType === 'pickup') {
                setIsModalOpen(true);
              } else {
                handleSubmit(onSubmit)();
              }
            }}
            className="bg-cyan-200 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-cyan-300 transition flex items-center justify-center gap-2"
          >
            {paymentType === 'pickup'
              ? 'Finalizar pedido'
              : 'Agregar dirección'}
            <GrFormNextLink size={22} />
          </button>
        </div>

        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            setIsModalOpen(false);
            handleSubmit(onSubmit)();
          }}
          title="Confirmar pedido"
          text="¿Estás seguro que deseas confirmar este pedido? Esta acción no se puede deshacer."
          btnAccept="Confirmar"
          btnCancel="Cancelar"
        />
      </div>
    </div>
  );
}

export default AddPayment;