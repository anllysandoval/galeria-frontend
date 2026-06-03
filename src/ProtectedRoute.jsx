import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <h1>Cargando...</h1>;
  if (!isAuthenticated && !isLoading) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
