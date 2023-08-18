import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes ({children}) {
  const user = JSON.parse(localStorage.getItem('roles'));
  if(!user) {
    return <Navigate to="/account/login" replace/>
  }
  return children
};
