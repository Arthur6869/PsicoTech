import React, { useState } from 'react';

type CaseOption = {
  id: string;
  label: string;
};

const cases: CaseOption[] = [
  { id: 'child-neurodivergent', label: 'Criança neurodivergente' },
  { id: 'stressed-student', label: 'Vestibulando sobrecarregado' },
  { id: 'public-exam-anxiety', label: 'Concurseiro com ansiedade' },
  { id: 'bpd', label: 'Transtorno de personalidade borderline' },
];

const PsyIA: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string>('child-neurodivergent');
  const [approach, setApproach] = useState<string>('Cognitivo-comportamental');
  const [notes, setNotes] = useState<string>('');
  const [log, setLog] = useState<string[]>([]);

  const ask = (text: string) => {
    setLog((prev) => [...prev, `Você: ${text}`]);
    // Simulação simples da IA respondendo
    setTimeout(() => {
      setLog((prev) => [...prev, `PsyIA: Resposta simulada ao caso "${selectedCase}" considerando a abordagem "${approach}".`]);
    }, 400);
  };

  const exportReport = () => {
    const report = [
      `Caso: ${selectedCase}`,
      `Abordagem: ${approach}`,
      `Observações iniciais: ${notes || '—'}`,
      '',
      'Registro da sessão:',
      ...log,
    ].join('\n');
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio-psyia.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">PsyIA – Simulação de estudos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 space-y-4">
          <div className="border rounded-lg p-4 bg-white">
            <div className="font-semibold mb-2">Escolha o paciente</div>
            <select className="w-full border rounded p-2" value={selectedCase} onChange={(e) => setSelectedCase(e.target.value)}>
              {cases.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <div className="font-semibold mb-2">Abordagem sugerida</div>
            <select className="w-full border rounded p-2" value={approach} onChange={(e) => setApproach(e.target.value)}>
              <option>Cognitivo-comportamental</option>
              <option>Psicanalítica</option>
              <option>Humanista</option>
              <option>Sistêmica</option>
            </select>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <div className="font-semibold mb-2">Comentário prévio</div>
            <textarea className="w-full border rounded p-2" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Observações que serão consideradas no relatório final" />
          </div>
          <button className="bg-gradient-to-r from-purple-400 to-pink-300 text-white px-4 py-2 rounded-md" onClick={exportReport}>Exportar relatório</button>
        </div>

        <div className="col-span-2">
          <div className="border rounded-lg p-4 bg-white h-[520px] flex flex-col">
            <div className="font-semibold mb-2">Sessão simulada</div>
            <div className="flex-1 overflow-y-auto space-y-2 border rounded p-3 bg-gray-50">
              {log.length === 0 && <div className="text-gray-500">A IA simula o paciente. Faça perguntas, valide hipóteses e conduza a sessão.</div>}
              {log.map((line, idx) => (
                <div key={idx} className={line.startsWith('Você:') ? 'text-gray-800' : 'text-purple-700'}>{line}</div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input className="flex-1 border rounded p-2" placeholder="Faça uma pergunta ou comentário" onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                  ask(e.currentTarget.value.trim());
                  e.currentTarget.value = '';
                }
              }} />
              <button className="px-4 py-2 rounded-md bg-darkNavy text-white" onClick={() => {
                const input = document.querySelector<HTMLInputElement>('input[placeholder="Faça uma pergunta ou comentário"]');
                if (input && input.value.trim()) { ask(input.value.trim()); input.value=''; }
              }}>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsyIA;


