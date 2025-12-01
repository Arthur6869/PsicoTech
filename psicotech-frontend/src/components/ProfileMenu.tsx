import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; 

const ProfileMenu = () => {
    const [userData, setUserData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Chama a rota protegida /api/v1/profile
                const response = await api.get('/profile'); 
                setUserData(response.data);
            } catch (error) {
                console.error("Falha ao buscar dados do perfil:", error);
                // Se falhar (401 Unauthorized), desloga o usuário
                localStorage.removeItem('psicotech_token');
                alert("Sessão expirada. Faça login novamente.");
                navigate('/login');
            }
        };

        if (localStorage.getItem('psicotech_token')) {
            fetchProfile();
        }
    }, []);

    if (!userData) {
        return <div>Carregando perfil...</div>;
    }

    // Renderiza o menu com os dados reais
    return (
        <div>
            <div className="mb-4">
                <div className="text-right text-sm font-semibold">PsicoTech</div>
                <div className="text-right text-xs text-gray-600">“Transformando conhecimento em prática”</div>
            </div>
            <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-300 flex items-center justify-center text-white font-semibold">
                    {userData.username?.[0]?.toUpperCase() || 'A'}
                </div>
                <div>
                    <div className="font-semibold">{userData.username}</div>
                    <div className="text-xs text-gray-600">{userData.perfilTipo}</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border">
                    <div className="text-xs text-gray-500">Publicações</div>
                    <div className="text-lg font-semibold">0</div>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border">
                    <div className="text-xs text-gray-500">Seguidores</div>
                    <div className="text-lg font-semibold">0</div>
                </div>
               
            </div>

            <ul className="space-y-2 text-sm">
                <li><Link to="/fy" className="block px-3 py-2 rounded hover:bg-white">Meu Perfil</Link></li>
                <li>
                    <div className="px-3 py-1 text-xs text-gray-700">Psicólogos que sigo</div>
                    <div className="px-3 text-xs text-gray-500">Nenhum psicólogo seguido ainda</div>
                </li>
                <li><Link to="/members" className="block px-3 py-2 rounded hover:bg-white">Assinatura</Link></li>
                <li><Link to="/courses" className="block px-3 py-2 rounded hover:bg-white">Cursos & imersões</Link></li>
                <li><Link to="/psyia" className="block px-3 py-2 rounded hover:bg-white">PsyIA</Link></li>
            </ul>

            <button
                className="mt-6 w-full px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                    localStorage.removeItem('psicotech_token');
                    localStorage.removeItem('psicotech_user');
                    navigate('/login');
                }}
            >
                Sair da conta
            </button>
        </div>
    );
};

export default ProfileMenu;