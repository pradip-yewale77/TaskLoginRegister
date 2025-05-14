// Unauthorized.js
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
      <div className="text-center p-5 border rounded shadow-lg" style={{ maxWidth: "600px" }}>
        <h2 className="text-danger mb-3">Unauthorized Access</h2>
        <p className="text-muted">You do not have permission to view this page.</p>
        <Link to="/" className="btn btn-primary mt-3">Go to Login</Link>
      </div>
    </div>
  );
};

export default Unauthorized;

