import { createContext, useState, useContext } from 'react';
import {
  getArtworksRequest,
  getArtworkByIdRequest,
  getCategoriesRequest,
  createArtworkRequest,
  updateArtworkRequest,
  updateArtworkWithoutImageRequest,
  deleteArtworkRequest,
} from '../api/artworks';
import { useAuth } from './AuthContext';

export const ArtworkContext = createContext();

export const useArtworks = () => {
  const context = useContext(ArtworkContext);
  if (!context) throw new Error('useArtworks debe estar dentro de un ArtworkProvider');
  return context;
};

export const ArtworkProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const { getAccessTokenSilently } = useAuth();

  const getArtworks = async (category) => {
    try {
      const res = await getArtworksRequest(category);
      setArtworks(res.data);
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al obtener obras']);
    }
  };

  const getArtworkById = async (id) => {
    try {
      const res = await getArtworkByIdRequest(id);
      return res.data;
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al obtener la obra']);
    }
  };

  const getCategories = async () => {
    try {
      const res = await getCategoriesRequest();
      setCategories(res.data);
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al obtener categorías']);
    }
  };

  const createArtwork = async (formData) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await createArtworkRequest(formData, token);
      setArtworks((prev) => [res.data, ...prev]);
      return res.data;
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al crear la obra']);
    }
  };

  const updateArtwork = async (id, formData) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await updateArtworkRequest(id, formData, token);
      setArtworks((prev) => prev.map((a) => (a._id === id ? res.data : a)));
      return res.data;
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al actualizar la obra']);
    }
  };

  const updateArtworkWithoutImage = async (id, data) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await updateArtworkWithoutImageRequest(id, data, token);
      setArtworks((prev) => prev.map((a) => (a._id === id ? res.data : a)));
      return res.data;
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al actualizar la obra']);
    }
  };

  const deleteArtwork = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      await deleteArtworkRequest(id, token);
      setArtworks((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      setErrors(error.response?.data?.message || ['Error al eliminar la obra']);
    }
  };

  return (
    <ArtworkContext.Provider
      value={{
        artworks,
        categories,
        errors,
        getArtworks,
        getArtworkById,
        getCategories,
        createArtwork,
        updateArtwork,
        updateArtworkWithoutImage,
        deleteArtwork,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};
