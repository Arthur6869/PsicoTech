import React from 'react';

const Courses: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cursos e Imersões</h1>
      <p className="text-gray-600 mb-6">Congressos, imersões, cursos especializados e simpósios oferecidos pelos psicólogos.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 bg-white">
          <div className="font-semibold">Imersão em Estudos de Caso</div>
          <div className="text-sm text-gray-500">Prévia do conteúdo e agenda.</div>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          <div className="font-semibold">Curso: Intervenções breves</div>
          <div className="text-sm text-gray-500">Material introdutório e inscrições.</div>
        </div>
      </div>
    </div>
  );
};

export default Courses;


