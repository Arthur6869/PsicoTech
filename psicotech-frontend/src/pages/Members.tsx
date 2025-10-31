import React from 'react';

const Members: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Área de membros</h1>
      <p className="text-gray-600 mb-6">Acesse os conteúdos exclusivos dos psicólogos que você assina.</p>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 rounded-lg border bg-white">Estudo de caso premium (prévia)</div>
        <div className="p-4 rounded-lg border bg-white">Análise clínica exclusiva (prévia)</div>
      </div>
    </div>
  );
};

export default Members;


