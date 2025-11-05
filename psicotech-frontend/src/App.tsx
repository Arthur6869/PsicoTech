import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';  
import Register from './pages/Register'; 
import Feed from './pages/Feed';
import Following from './pages/Following';
import Members from './pages/Members';
import Courses from './pages/Courses';
import PsyIA from './pages/PsyIA';
import Initial from './pages/Initial';
import MainLayout from './components/MainLayout';

// Componente para proteger as rotas
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const location = useLocation();
  
  // Verifica se o token está no localStorage
  const token = localStorage.getItem('psicotech_token');
  
  // Se não estiver autenticado, redireciona para /login
  if (!token || token.trim() === '') {
    localStorage.removeItem('psicotech_token');
    localStorage.removeItem('psicotech_user');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  return element;
};

// Componente para a rota raiz que verifica autenticação
const RootRoute: React.FC = () => {
  const token = localStorage.getItem('psicotech_token');
  
  // Se autenticado, redireciona para o feed
  if (token && token.trim() !== '') {
    return <Navigate to="/fy" replace />;
  }
  
  // Se não autenticado, mostra a página inicial
  return <Initial />;
};

// Componente wrapper para garantir verificação na inicialização
const AppRoutes: React.FC = () => {
  useEffect(() => {
    // Limpa tokens vazios ou inválidos
    const token = localStorage.getItem('psicotech_token');
    if (token && (token.trim() === '' || token === 'null' || token === 'undefined')) {
      localStorage.removeItem('psicotech_token');
      localStorage.removeItem('psicotech_user');
    }
  }, []);

  return (
    <Routes>
      {/* Rota raiz - mostra Initial se não autenticado, redireciona para /fy se autenticado */}
      <Route path="/" element={<RootRoute />} />

      {/* Rotas públicas de autenticação */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Rotas protegidas - requerem autenticação */}
      <Route element={<PrivateRoute element={<MainLayout />} />}>
        <Route path="/fy" element={<Feed />} />
        <Route path="/following" element={<Following />} />
        <Route path="/members" element={<Members />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/psyia" element={<PsyIA />} />
      </Route>
      
      {/* Qualquer rota desconhecida */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
