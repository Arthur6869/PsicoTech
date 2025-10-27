import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // TODO: Implementar endpoint de recuperação de senha no backend
      await api.post('/forgot-password', { email });
      setMessage('Se esse email existir em nossa base, você receberá instruções para redefinir sua senha.');
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Erro ao processar solicitação.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="text-white bg-lightPurple rounded-full p-4">
            <span className="font-bold text-lg text-darkNavy">PsiConnect</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-6 text-center">Esqueceu a senha?</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Digite seu email e enviaremos instruções para redefinir sua senha
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg mb-4 focus:ring-darkNavy focus:border-darkNavy"
            required
          />
          
          {message && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes('Erro') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-darkNavy text-white p-3 w-full rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isLoading ? 'Enviando...' : 'Enviar instruções'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="text-darkNavy hover:underline">
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

