// src/Component/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken"); // Token from login
  const location = useLocation();
  // If token does not exist, redirect to unauthorized
  if (!token) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and trying to access /login, redirect to /dashboard
  if (location.pathname === "/" || location.pathname === "/login") {
    return <Navigate to="/dashboard" replace />;
  }

  // If token exists, allow access to the child component
  return children;
};


export default ProtectedRoute;
