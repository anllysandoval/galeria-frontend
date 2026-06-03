import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
    createOrderRequest,
    updateOrderStatusRequest,
    getAllOrdersRequest,
    getUserOrdersRequest,
    getOrderByIdRequest,
    deleteOrderRequest,
} from '../api/orders';
import { toast } from 'react-toastify';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrders debe estar dentro de un OrdersProvider');
    return context;
};

export function OrdersProvider({ children }) {
    const { isAdmin, getAccessTokenSilently } = useAuth();
    const [orders, setOrders] = useState([]);
    const [errors, setErrors] = useState([]);

    const getOrders = async () => {
        try {
            const token = await getAccessTokenSilently();
            const res = isAdmin
                ? await getAllOrdersRequest(token)
                : await getUserOrdersRequest(token);
            setOrders(res.data);
        } catch (error) {
            toast.error('Error al obtener órdenes');
        }
    };

    const createOrder = async (order) => {
        try {
            const token = await getAccessTokenSilently();
            await createOrderRequest(order, token);
            await getOrders();
            toast.success('¡Orden creada correctamente!');
        } catch (error) {
            console.log(error.response?.data);
            toast.error('Error al crear la orden');
            setErrors(error.response?.data?.message || ['Error desconocido']);
        }
    };

    const updateStatusOrder = async (id, status) => {
        try {
            const token = await getAccessTokenSilently();
            await updateOrderStatusRequest(id, status, token);
            await getOrders();
            toast.success(`Estado actualizado a: ${status.status}`);
        } catch (error) {
            toast.error('Error al actualizar el estado de la orden');
            setErrors(error.response?.data?.message || ['Error desconocido']);
        }
    };

    const getOrderById = async (id) => {
        try {
            const token = await getAccessTokenSilently();
            const res = await getOrderByIdRequest(id, token);
            return res.data;
        } catch (error) {
            toast.error('Error al obtener la orden');
        }
    };

    const deleteOrder = async (id) => {
        try {
            const token = await getAccessTokenSilently();
            await deleteOrderRequest(id, token);
            await getOrders();
            toast.success('Orden eliminada correctamente');
        } catch (error) {
            toast.error('Error al eliminar la orden');
        }
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => setErrors([]), 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <OrderContext.Provider value={{
            orders, errors,
            getOrders, createOrder,
            updateStatusOrder, getOrderById, deleteOrder,
        }}>
            {children}
        </OrderContext.Provider>
    );
}
