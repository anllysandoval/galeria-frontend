import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { createUserRequest, getUserRequest } from '../api/user';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe estar dentro de un AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const {
    isAuthenticated,
    isLoading: auth0Loading,
    user: auth0User,
    getAccessTokenSilently,
    logout: auth0Logout,
    loginWithRedirect,
  } = useAuth0();

  const [backendUser, setBackendUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ROLE_ADMIN = import.meta.env.VITE_ROLE_ADMIN;

  // Sincronizar usuario con el backend al autenticarse con Auth0
  useEffect(() => {
    const syncUser = async () => {
      if (auth0Loading) return;

      if (!isAuthenticated || !auth0User) {
        setBackendUser(null);
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently();

        // Crear usuario en el backend si no existe (idempotente)
        await createUserRequest(
          { auth0Id: auth0User.sub, email: auth0User.email },
          token
        );

        // Obtener datos completos del usuario (incluye role)
        const res = await getUserRequest(token);
        const userData = res.data;

        setBackendUser(userData);
        setIsAdmin(userData.role === ROLE_ADMIN);
      } catch (error) {
        console.log('Error sincronizando usuario:', error);
        setBackendUser(null);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    syncUser();
  }, [isAuthenticated, auth0Loading, auth0User, getAccessTokenSilently, ROLE_ADMIN]);

  const login = async () => {
  console.log("Botón login presionado");

  try {
    await loginWithRedirect();
  } catch (error) {
    console.error("ERROR LOGIN:", error);
  }
};

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
    setBackendUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        isLoading: auth0Loading || isLoading,
        user: backendUser,
        auth0User,
        isAdmin,
        getAccessTokenSilently,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
