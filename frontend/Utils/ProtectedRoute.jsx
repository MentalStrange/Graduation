/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../src/Context/AuthenticationContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  // if (!allowedRoles.includes(user.role)) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};