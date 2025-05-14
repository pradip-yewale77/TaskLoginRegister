// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

// Check if the user is authenticated (JWT stored in localStorage)
const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
