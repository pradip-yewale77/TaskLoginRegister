import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { LoginRegistration } from "./Component/LoginRegistration";
import { Welcome } from "./Component/Welcome";
import PageNotFound from "./Component/PageNotFound";
import Unauthorized from "./Component/Unauthorized";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegistration />} />
      
      {/* Protected Route */}
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
