import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { LoginRegistration } from './Component/LoginRegistration';
import { Welcome } from './Component/Welcome';

function App() {
  return (
    <div>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<LoginRegistration/>} />

        {/* Example: After login you could route to a Dashboard or Home */}
        <Route path="/dashboard" element={<Welcome/>} />
      </Routes>
    </div>
  );
}

export default App;
