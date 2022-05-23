import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { session } = useAuthContext();

  useEffect(() => {
    if (!session) {
      navigate(`/login?redirectTo=${location.pathname}`, { replace: true });
    }
  }, [location.pathname, session]);
};
