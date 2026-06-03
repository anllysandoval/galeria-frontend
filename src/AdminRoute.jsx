import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function AdminRoute() {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();

  if (isLoading) return <h1>Cargando...</h1>;
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (!isAdmin) return <Navigate to="/gallery" replace />;

  return <Outlet />;
}

export default AdminRoute;
