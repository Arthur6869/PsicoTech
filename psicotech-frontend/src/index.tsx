import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Importe o provider do Google OAuth

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
if (!googleClientId) {
  throw new Error('VITE_GOOGLE_CLIENT_ID is not defined');
}
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
  </React.StrictMode>
);