import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProviver } from './context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProviver>
      <App />
    </AuthProviver>
  </React.StrictMode>
);