// Welcome.js
import React from "react";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card shadow-lg p-5 rounded-3" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="mb-4 text-primary">Welcome!</h1>
        <p className="lead mb-4 text-secondary">You are successfully logged in.</p>
        <button 
          className="btn btn-danger w-100 py-2 mt-3"
          onClick={handleLogout}
          style={{ fontWeight: "bold" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
