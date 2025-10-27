import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';  
import Register from './pages/Register'; 
import Feed from './pages/Feed'; // <-- NOVO: Importe o componente Feed
  

 // NOVO: Componente para proteger as rotas
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  // Verifica se o token está no localStorage
  const isAuthenticated = localStorage.getItem('psicotech_token');
  
  // Se estiver autenticado, renderiza o elemento; caso contrário, redireciona para /login
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/feed" element={<PrivateRoute element={<Feed />} />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;