import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o token existe ao montar o componente
    const token = localStorage.getItem('psicotech_token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Verifica novamente antes de renderizar
  const token = localStorage.getItem('psicotech_token');
  if (!token) {
    return null; // Não renderiza nada enquanto redireciona
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex flex-col">
        <header className="w-full border-b bg-white">
          <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
            <NavLink to="/fy" className={({ isActive }) => `px-3 py-1 rounded-md ${isActive ? 'bg-gradient-to-r from-purple-400 to-pink-300 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Fy</NavLink>
            <NavLink to="/following" className={({ isActive }) => `px-3 py-1 rounded-md ${isActive ? 'bg-gradient-to-r from-purple-400 to-pink-300 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Seguindo</NavLink>
            <NavLink to="/members" className={({ isActive }) => `px-3 py-1 rounded-md ${isActive ? 'bg-gradient-to-r from-purple-400 to-pink-300 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Área de membros</NavLink>
            <NavLink to="/courses" className={({ isActive }) => `px-3 py-1 rounded-md ${isActive ? 'bg-gradient-to-r from-purple-400 to-pink-300 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Cursos & Imersões</NavLink>
            <NavLink to="/psyia" className={({ isActive }) => `px-3 py-1 rounded-md ${isActive ? 'bg-gradient-to-r from-purple-400 to-pink-300 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>PsyIA</NavLink>
          </nav>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <aside className="w-72 bg-purple-100 p-4 border-l overflow-y-auto">
        <ProfileMenu />
      </aside>
    </div>
  );
};

export default MainLayout;


