import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define os tipos de mensagem que podemos ter
type Message = {
  sender: 'system' | 'user' | 'ia';
  text: string;
};

// Define os "palcos" da nossa conversa pré-scriptada
type ConversationStage = 0 | 1 | 2 | 'locked';

// A PALAVRA "EXPORT" AQUI É O QUE RESOLVE O ERRO
export const PsyIADemo: React.FC = () => {
  const [stage, setStage] = useState<ConversationStage>(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'system',
      text: 'Você entrou na sala. Léo (8 anos) está agachado no canto, girando a roda de um carrinho. Ele não olhou para você. O que você faz?',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Função para adicionar uma nova mensagem e simular uma resposta
  const handleUserChoice = (userMessage: string, nextStage: ConversationStage, iaResponse: string = '', iaDelay: number = 2000) => {
    // 1. Adiciona a mensagem do usuário
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    
    // 2. Atualiza para o próximo palco
    setStage(nextStage);

    // 3. Se houver uma resposta da IA, simule-a
    if (iaResponse) {
      setIsTyping(true); // Mostra "digitando..."
      
      // Simula o tempo de resposta da IA
      setTimeout(() => {
        setIsTyping(false); // Esconde "digitando..."
        setMessages(prev => [...prev, { sender: 'ia', text: iaResponse }]);

        // Se o próximo palco for o "gancho", adicione a mensagem do sistema e trave
        if (nextStage === 2) {
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { sender: 'system', text: 'Você conduziu os primeiros 2 minutos da sessão. A forma como você lida com a resistência inicial é crucial. O que você faria agora?' }
            ]);
            setStage('locked'); // Trava o simulador
          }, 1000);
        }
        
      }, iaDelay);
    }
  };

  // Renderiza os botões de opção com base no palco atual
  const renderOptions = () => {
    switch (stage) {
      case 0:
        return (
          <button
            onClick={() => handleUserChoice(
              'O que você está fazendo?', 
              1, 
              'Tô vendo a roda. Ela... ela gira. E as linhas do pneu fazem um borrão. Gira, gira, gira... para.'
            )}
            className="w-full text-left p-3 border-2 border-indigo-500 text-indigo-700 rounded-lg hover:bg-indigo-50 transition duration-200"
          >
            [Clique para falar: "O que você está fazendo?"]
          </button>
        );
      case 1:
        return (
          <div className="space-y-3">
            <p className='text-sm font-semibold text-gray-700 mb-2'>Léo continua focado na roda. Como você responde?</p>
            <button
              onClick={() => handleUserChoice(
                'E o que você mais gosta na roda?', 
                2, 
                'O borrão. Fica tudo rápido e... quieto.'
              )}
              className="w-full text-left p-3 border-2 border-indigo-500 text-indigo-700 rounded-lg hover:bg-indigo-50 transition duration-200"
            >
              [Opção A: "E o que você mais gosta na roda?"]
            </button>
            <button
              onClick={() => handleUserChoice(
                'Por que você não vem sentar aqui comigo na cadeira?', 
                2, 
                'Não. O chão é melhor.'
              )}
              className="w-full text-left p-3 border-2 border-indigo-500 text-indigo-700 rounded-lg hover:bg-indigo-50 transition duration-200"
            >
              [Opção B: "Por que você não vem sentar aqui comigo na cadeira?"]
            </button>
            <button
              onClick={() => handleUserChoice(
                '(Ficar em silêncio e observar)', 
                2, 
                '(...Léo olha para você de canto de olho por um segundo e depois volta para a roda.)'
              )}
              className="w-full text-left p-3 border-2 border-indigo-500 text-indigo-700 rounded-lg hover:bg-indigo-50 transition duration-200"
            >
              [Opção C: (Ficar em silêncio e observar)]
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // Estiliza as bolhas de chat com base em quem enviou
  const getMessageStyle = (sender: Message['sender']) => {
    switch (sender) {
      case 'user':
        return 'bg-indigo-500 text-white self-end'; // Mensagem do usuário
      case 'ia':
        return 'bg-gray-200 text-gray-800 self-start'; // Mensagem da IA
      case 'system':
        return 'bg-yellow-100 text-yellow-800 text-sm italic text-center w-full'; // Mensagem do sistema
      default:
        return 'bg-gray-100 self-start';
    }
  };

  return (
    <div className="max-w-4xl mx-auto shadow-xl rounded-lg border border-gray-200 bg-white relative overflow-hidden">
      
      {/* O "Cadeado" / Overlay que aparece no final */}
      {stage === 'locked' && (
        <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col items-center justify-center text-center p-4">
          <svg className="w-16 h-16 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          <h3 className="text-2xl font-bold text-indigo-800 mb-2">Continue a sessão na Psico.tech</h3>
          <p className="text-gray-700 mb-6">Para desbloquear esta e mais 20 simulações de pacientes com IA, cadastre-se na nossa plataforma.</p>
          <Link 
            to="/register" 
            className="px-8 py-3 text-lg font-semibold bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition duration-300 shadow-xl"
          >
            Cadastrar e desbloquear
          </Link>
        </div>
      )}

      {/* Cabeçalho da Janela de Chat */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <p className="text-lg font-semibold text-gray-800">Simulação com PsyIA: <span className="text-pink-500 font-bold">Léo, 8 anos</span></p>
      </div>

      {/* Área das Mensagens */}
      <div className="p-4 h-96 overflow-y-auto flex flex-col space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-xs ${getMessageStyle(msg.sender)}`}
          >
            {msg.text}
          </div>
        ))}
        {/* Indicador de "Digitando..." */}
        {isTyping && (
          <div className="self-start">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-xl">
              <div className="flex space-x-1 items-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Área dos Botões de Opção */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        {renderOptions()}
      </div>
    </div>
  );
};