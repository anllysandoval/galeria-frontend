import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { createUserRequest } from '../api/user';

export default function AuthCallbackPage() {
  const navigate = useNavigate();

  const {
    user,
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const hasCreated = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    const sync = async () => {
      console.log("AUTH:", {
        isAuthenticated,
        user
      });

      if (!isAuthenticated) {
        navigate('/');
        return;
      }

      try {
        if (
          user?.sub &&
          user?.email &&
          !hasCreated.current
        ) {
          const token = await getAccessTokenSilently({
  authorizationParams: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
});

console.log(token);

          await createUserRequest(
            {
              auth0Id: user.sub,
              email: user.email
            },
            token
          );

          hasCreated.current = true;
        }

        navigate('/gallery');

      } catch (error) {
        console.error('Error callback:', error);
      }
    };

    sync();
  }, [
    isLoading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    navigate
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Cargando...</p>
    </div>
  );
}