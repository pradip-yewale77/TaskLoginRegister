import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light text-center p-4">
      <div className="card p-5 shadow-lg">
        <div className="mb-4">
          <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
        </div>
        <h1 className=" fw-bold mb-2">404 - Page Not Found</h1>
        <p className="text-muted mb-4">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">Go back to LoginPage</Link>
      </div>
    </div>
  );
}
