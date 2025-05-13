import React from 'react';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

export const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h2 className="text-center">Welcome</h2>
        <p className="text-center">You have successfully logged in!</p>
        <button className="btn btn-primary w-100" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
