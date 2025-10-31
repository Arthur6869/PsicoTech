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
import MainLayout from './components/MainLayout';

// Componente para proteger as rotas
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const location = useLocation();
  
  // Verifica se o token está no localStorage
  const token = localStorage.getItem('psicotech_token');
  
  // Se não estiver autenticado, redireciona para /login
  if (!token || token.trim() === '') {
    // Limpa qualquer token inválido
    localStorage.removeItem('psicotech_token');
    localStorage.removeItem('psicotech_user');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  
  // Se estiver autenticado, renderiza o elemento
  return element;
};

// Componente wrapper para garantir verificação na inicialização
const AppRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Limpa tokens vazios ou inválidos
    const token = localStorage.getItem('psicotech_token');
    if (token && (token.trim() === '' || token === 'null' || token === 'undefined')) {
      localStorage.removeItem('psicotech_token');
      localStorage.removeItem('psicotech_user');
    }
  }, []);

  // Se tentar acessar rota protegida sem token, redireciona
  const isPublicRoute = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  const token = localStorage.getItem('psicotech_token');
  
  if (!isPublicRoute && (!token || token.trim() === '')) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Rotas protegidas - requerem autenticação */}
      <Route path="/" element={<PrivateRoute element={<MainLayout />} />}>
        <Route index element={<Navigate to="/fy" replace />} />
        <Route path="fy" element={<Feed />} />
        <Route path="following" element={<Following />} />
        <Route path="members" element={<Members />} />
        <Route path="courses" element={<Courses />} />
        <Route path="psyia" element={<PsyIA />} />
      </Route>
      
      {/* Qualquer rota desconhecida redireciona para login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
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