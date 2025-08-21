import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useLoginStore from '../store/useLoginStore';


const ProtectedRoute = () => {
  const { isLoggedIn } = useLoginStore();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;