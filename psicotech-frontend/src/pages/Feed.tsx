// psicotech-frontend/src/pages/Feed.tsx
import React from 'react';
import ProfileMenu from '../components/ProfileMenu';

const Feed = () =>  {
  // 1. O Layout básico com a barra lateral à direita
  return (
    <div className="flex h-screen">
      
      {/* BARRA LATERAL (DIREITA, conforme a documentação) */}
      <aside className="w-64 bg-lightPurple p-4 border-l">
        <ProfileMenu /> 
      </aside>

      {/* CONTEÚDO PRINCIPAL (FEED) */}
      <main className="flex-1 bg-white p-6">
        <h1 className="text-3xl font-bold">Feed Inicial</h1>
        <p>Aqui será o conteúdo do feed, inspirado no X/Twitter.</p>
        
        {/* Opções Clicáveis Superiores (Fy, Seguindo, PsylA, etc.) */}
      </main>

    </div>
  );
};

export default Feed;