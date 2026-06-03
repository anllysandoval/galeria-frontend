import axios from './axiosInstance';

export const createOrderRequest = (order, token) =>
    axios.post('/order', order, { headers: { Authorization: `Bearer ${token}` } });

export const updateOrderStatusRequest = (id, status, token) =>
    axios.put(`/order/${id}`, status, { headers: { Authorization: `Bearer ${token}` } });

export const getAllOrdersRequest = (token) =>
    axios.get('/order', { headers: { Authorization: `Bearer ${token}` } });

export const getUserOrdersRequest = (token) =>
    axios.get('/order/getuserorders', { headers: { Authorization: `Bearer ${token}` } });

export const getOrderByIdRequest = (id, token) =>
    axios.get(`/order/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const deleteOrderRequest = (id, token) =>
    axios.delete(`/order/${id}`, { headers: { Authorization: `Bearer ${token}` } });