import { Navigate, Outlet, useLocation } from 'react-router-dom';

import FullPageLoader from '../components/common/FullPageLoader';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <FullPageLoader label="Checking your session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

