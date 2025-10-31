import React from 'react';

const Following: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Seguindo</h1>
      <p className="text-gray-600 mb-6">Conteúdos recentes de estudantes e psicólogos que você segue.</p>
      <div className="space-y-4">
        <div className="p-4 rounded-lg border bg-white">Post de exemplo de um profissional seguido.</div>
        <div className="p-4 rounded-lg border bg-white">Outro post de exemplo.</div>
      </div>
    </div>
  );
};

export default Following;


