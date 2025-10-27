import React, { useState } from 'react';
import api from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [perfilTipo, setPerfilTipo] = useState('psicólogo');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', {
        username,
        email,
        password,
        perfilTipo,
      });

      alert('Registro realizado com sucesso! Faça o login.');
      // Redirecionar para a página de Login
    } catch (error: any) {
      console.error('Erro no registro:', error);
      alert(`Erro no registro: ${JSON.stringify(error.response?.data || error.message || 'Erro desconhecido.')}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          className="border p-2 w-full mb-4"
        />
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
        <select
          value={perfilTipo}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPerfilTipo(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="psicólogo">Psicólogo</option>
          <option value="estudante">Estudante</option>
        </select>
        <button type="submit" className="bg-lightPink text-white p-2 w-full rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;