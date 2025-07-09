import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <span className="loading loading-spinner text-secondary"></span>

  return user ? children : <Navigate to="/signIn" state={{ from: location }} replace />;
};


export default PrivateRoute;