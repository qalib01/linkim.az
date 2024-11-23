import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { UserProfileProvider } from './context/UserProfileProvider';
import { SideNavProvider } from './context/SideNavProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProfileProvider>
        <SideNavProvider>
          <App />
        </SideNavProvider>
      </UserProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);