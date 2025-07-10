import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../features/auth/AuthContext';

const PrivateRoute = ({ children, allowedRole }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <span className="loading loading-spinner text-secondary"></span>;

  // 🔐 Simple hardcoded role check (later you can fetch this from DB/backend)
  const isOrganizer = user?.email === "medicamporganizer@gmail.com";

  // 🔒 Role mismatch? Block access
  if (allowedRole === "organizer" && !isOrganizer) {
    return <Navigate to="/" replace />;
  }

  // 🔐 No user? Redirect to login
  return user ? children : <Navigate to="/join-us" state={{ from: location }} replace />;
};

export default PrivateRoute;
