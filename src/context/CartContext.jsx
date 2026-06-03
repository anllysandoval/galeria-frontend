import { createContext, useState, useContext } from 'react';
import {
  getCartRequest,
  addToCartRequest,
  removeFromCartRequest,
  clearCartRequest,
} from '../api/cart';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe estar dentro de un CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [errors, setErrors] = useState([]);
  const { getAccessTokenSilently } = useAuth();

  const getCart = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await getCartRequest(token);
      setCart(res.data);
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al obtener el carrito']);
    }
  };

  const addToCart = async (artworkId) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await addToCartRequest(artworkId, token);
      setCart(res.data);
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al agregar al carrito']);
    }
  };

  const removeFromCart = async (artworkId) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await removeFromCartRequest(artworkId, token);
      setCart(res.data);
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al eliminar del carrito']);
    }
  };

  const clearCart = async () => {
    try {
      const token = await getAccessTokenSilently();
      await clearCartRequest(token);
      setCart({ items: [] });
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al vaciar el carrito']);
    }
  };

  const totalItems = cart.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice = cart.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        errors,
        totalItems,
        totalPrice,
        getCart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
