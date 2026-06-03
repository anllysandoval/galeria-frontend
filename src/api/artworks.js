import axios from './axiosInstance';

// Rutas públicas (sin token)
export const getArtworksRequest = (category) =>
  axios.get(category ? `/artworks?category=${category}` : '/artworks');

export const getArtworkByIdRequest = (id) => axios.get(`/artworks/${id}`);

export const getCategoriesRequest = () => axios.get('/artworks/categories');

// Rutas admin (requieren token Auth0)
export const createArtworkRequest = (formData, token) =>
  axios.post('/artworks', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateArtworkRequest = (id, formData, token) =>
  axios.put(`/artworks/updatewithimage/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateArtworkWithoutImageRequest = (id, data, token) =>
  axios.put(`/artworks/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteArtworkRequest = (id, token) =>
  axios.delete(`/artworks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
