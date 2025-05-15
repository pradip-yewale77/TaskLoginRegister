import React from "react";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    localStorage.clear();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg border-0" style={{ maxWidth: "400px" }}>
        <h2 className="text-center text-primary mb-3">Welcome to Dashboard</h2>
        <p className="text-muted text-center">Manage your account and explore features.</p>
        <button className="btn btn-danger w-100 mt-4" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
