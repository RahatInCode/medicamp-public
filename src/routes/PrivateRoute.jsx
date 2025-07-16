import { Navigate, useLocation } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../features/auth/AuthContext';

import { useQuery } from "@tanstack/react-query";
import axios from "../api/axiosSecure";

const PrivateRoute = ({ children, allowedRole }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const { data: userData = {}, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (loading || roleLoading) return <span className="loading loading-spinner text-secondary"></span>;

  if (!user) return <Navigate to="/join-us" state={{ from: location }} replace />;

  if (allowedRole && userData?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default PrivateRoute