import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('psicotech_token', token);
      localStorage.setItem('psicotech_user', JSON.stringify(user));

      alert(`Bem-vindo, ${user.email}!`);
      // Redirecionar para a página principal (Feed)
    } catch (error: any) {
      alert(`Erro no Login: ${error.response?.data?.error || 'Credenciais inválidas.'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-lightPurple text-white p-2 w-full rounded mb-4">Login</button>
        <Link to="/register" className="text-lightPurple text-center block">Não tem uma conta? Registre-se</Link>
      </form>
    </div>
  );
};

export default Login;