import axios from './axiosInstance';

export const createUserRequest = (user, token) =>
  axios.post('/user', user, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const getUserRequest = (token) =>
  axios.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

export const updateUserRequest = (data, token) =>
  axios.put('/user', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
