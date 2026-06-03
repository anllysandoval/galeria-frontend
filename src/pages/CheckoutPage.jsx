import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import CartResume from '../components/CartResume';
import AddPayment from '../components/AddPayment';
import AddAddress from '../components/AddAddress';

// Pasos: 1=resumen, 2=pago, 3=dirección (solo con tarjeta)
const STEPS = ['Resumen', 'Método de pago', 'Dirección de envío'];

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();

  const [step, setStep] = useState(1);
  const [paymentData, setPaymentData] = useState(null);

  const subtotal = totalPrice;
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  const handleResumeConfirm = () => setStep(2);

  const handlePaymentNext = (payment, nextStep) => {
    setPaymentData(payment);

    if (nextStep === 'address') {
      setStep(3);
    } else {
      finalizeSale(payment, null);
    }
  };

  const handleAddressConfirm = (address) => {
    finalizeSale(paymentData, address);
  };

  const finalizeSale = async (payment, address) => {
    const paymentMethod =
      payment.paymentMethod === 'card'
        ? {
            method: 'card',
            cardDetails: payment.cardDetails,
            shippingAddress: address,
          }
        : {
            method: 'pickup',
            userName: payment.userName,
          };

    const orderData = {
      items: cart.items.map((item) => ({
        artworkId: item.artworkId,
        title: item.title,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
        price: item.price,
      })),
      paymentMethod,
      totalProducts: totalItems,
      subTotal: parseFloat(subtotal.toFixed(2)),
      iva: parseFloat(iva.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      status: 'received',
    };

    await createOrder(orderData);
    await clearCart();
    navigate('/checkout/success');
  };

  const activeStep = step - 1;

  const visibleSteps =
    paymentData?.paymentMethod === 'pickup' ? STEPS.slice(0, 2) : STEPS;

  return (
    <div className="min-h-screen bg-pink-100">
      <header className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
        <h1 className="text-5xl font-extrabold drop-shadow-md">
          Checkout
        </h1>
        <p className="mt-4 text-xl font-medium drop-shadow-sm">
          Completa tu compra de forma segura
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <section className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-10">
            {visibleSteps.map((label, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center relative"
              >
                <div
                  className={`w-11 h-11 flex items-center justify-center rounded-full text-white font-extrabold z-10 shadow-md transition ${
                    activeStep >= index
                      ? 'bg-cyan-200'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>

                <span
                  className={`text-xs mt-2 text-center font-bold ${
                    activeStep >= index ? 'text-purple-300' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>

                {index < visibleSteps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-1 ${
                      activeStep > index ? 'bg-cyan-200' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Contenido por paso */}
          <div className="bg-pink-50 rounded-3xl border border-pink-100 p-6">
            {step === 1 && <CartResume onConfirm={handleResumeConfirm} />}

            {step === 2 && (
              <AddPayment
                onBack={() => setStep(1)}
                onNext={handlePaymentNext}
              />
            )}

            {step === 3 && (
              <AddAddress
                onBack={() => setStep(2)}
                onConfirm={handleAddressConfirm}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default CheckoutPage;