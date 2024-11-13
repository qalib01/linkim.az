import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { UserProfileProvider } from './context/UserProfileProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProfileProvider>
        <App />
      </UserProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);