// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Welcome } from "./Component/Welcome";
import PageNotFound from "./Component/PageNotFound";
import Unauthorized from "./Component/Unauthorized";
import Auth from "./Component/LoginRegistration";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        } 
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
