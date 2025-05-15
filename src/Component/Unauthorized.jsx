import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow-lg border-0"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="display-4 text-danger text-center">
          403 - Unauthorized
        </h2>
        <p className="lead text-center text-muted">
          You do not have permission to access this page.
        </p>
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={() => navigate("/")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
