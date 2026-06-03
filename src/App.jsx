import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ArtworkProvider } from './context/ArtworkContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import AdminPage from './pages/AdminPage';
import AuthCallbackPage from './auth/AuthCallbackPage';
import NotFound from './pages/NotFound';
import { OrdersProvider } from './context/OrderContext';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <BrowserRouter>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: `${window.location.origin}/auth-callback`,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        }}
      >
        <AuthProvider>
          <ArtworkProvider>
            <CartProvider>
              <OrdersProvider>
              <Navbar />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                limit={3}
                hideProgressBar={false}
                theme="light"
              />
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
                <Route path="/auth-callback" element={<AuthCallbackPage />} />

                {/* Rutas protegidas (requieren login) */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                  <Route path='/orders' element={<OrdersPage/>} />
                </Route>

                {/* Rutas solo admin */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </OrdersProvider>
            </CartProvider>
          </ArtworkProvider>
        </AuthProvider>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;
