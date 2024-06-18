import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  Target: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Target }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  return <Target />;
};

export default PrivateRoute;
