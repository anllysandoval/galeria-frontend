import axios from './axiosInstance';

export const getCartRequest = (token) =>
  axios.get('/cart', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCartRequest = (artworkId, token) =>
  axios.post(
    '/cart/add',
    { artworkId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

export const removeFromCartRequest = (artworkId, token) =>
  axios.delete(`/cart/remove/${artworkId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const clearCartRequest = (token) =>
  axios.delete('/cart/clear', {
    headers: { Authorization: `Bearer ${token}` },
  });
