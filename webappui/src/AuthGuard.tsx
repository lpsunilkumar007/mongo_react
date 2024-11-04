// src/components/AuthGuard.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactElement;
}
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
 const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
