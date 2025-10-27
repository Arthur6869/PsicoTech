import React, { useState, useEffect } from 'react';
import api from '../services/api'; 

const ProfileMenu = () => {
    const [userData, setUserData] = useState(null);

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
        <div style={{ /* Estilos de roxo claro e rosa */ }}>
            <h2>Bem-vindo, {userData.username}</h2>
            <p>Status: {userData.perfilTipo}</p>
            {/* Outras opções de menu... */}
        </div>
    );
};

export default ProfileMenu;