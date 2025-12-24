import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <-- NOVO: Importe useNavigate
import api from '../services/api';
import { Loginandregister, alertSuccess, alertError } from '../modules/Alert';
const Register = () => {
	const navigate = useNavigate(); // <-- NOVO: Inicializar o hook
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [perfilTipo, setPerfilTipo] = useState('Estudante');

	// Se já estiver autenticado, redireciona para o feed
	useEffect(() => {
		const token = localStorage.getItem('psicotech_token');
		if (token) {
			navigate('/fy', { replace: true });
		}
	}, [navigate]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await api.post('/register', {
				username,
				email,
				password,
				perfilTipo,
			});
			const { token, user } = response.data;
			localStorage.setItem('psicotech_token', token);
			localStorage.setItem('psicotech_user', JSON.stringify(user));

			Loginandregister('Registro bem-sucedido! Bem-vindo à PsicoTech.');

			// Aguarda 2 segundos para o usuário ver o alerta antes de redirecionar
			setTimeout(() => {
				navigate('/fy', { replace: true });
			}, 2000);
		} catch (error: any) {
			console.error('Erro no registro:', error);
			const errorMessage =
				error.response?.data?.error ||
				error.response?.data?.message ||
				error.message ||
				'Erro desconhecido ao criar conta.';
			alertError(`Erro no registro: ${errorMessage}`);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient p-4">
			{/* O Cartão Centralizado de Fundo Branco */}
			<div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
				{/* LOGO (Substitua por sua imagem/componente real) */}
				<div className="flex justify-center mb-6">
					<div className="text-white bg-lightPurple rounded-full p-4">
						{/* Ícone ou nome da logo aqui */}
						<span className="font-bold text-lg text-darkNavy">PsiConnect</span>
					</div>
				</div>

				<h2 className="text-2xl font-semibold mb-6 text-center">
					Create your account
				</h2>
				<p className="text-sm text-gray-500 mb-6 text-center">
					Sign up to continue
				</p>

				{/* 1. CONTINUAR COM O GOOGLE (será implementado na Fase 2) */}
				<button
					type="button"
					className="w-full flex items-center justify-center border border-gray-300 text-gray-700 py-2 rounded-lg mb-4 hover:bg-gray-50 transition">
					{/* Ícone do Google */}
					<svg
						className="w-5 h-5 mr-2"
						fill="currentColor"
						viewBox="0 0 24 24">
						...
					</svg>
					Continue with Google
				</button>

				<div className="text-center text-sm text-gray-500 my-4">OR</div>

				{/* Formulário de Registro */}
				<form onSubmit={handleSubmit}>
					{/* Campo Username */}
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="border border-gray-300 p-3 w-full rounded-lg mb-4 focus:ring-darkNavy focus:border-darkNavy"
						required
					/>
					{/* Campo Email */}
					<input
						type="email"
						placeholder="you@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border border-gray-300 p-3 w-full rounded-lg mb-4 focus:ring-darkNavy focus:border-darkNavy"
						required
					/>
					{/* Campo Senha */}
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border border-gray-300 p-3 w-full rounded-lg mb-4 focus:ring-darkNavy focus:border-darkNavy"
						required
					/>
					{/* Campo Perfil Tipo */}
					<select
						value={perfilTipo}
						onChange={(e) => setPerfilTipo(e.target.value)}
						className="border border-gray-300 p-3 w-full rounded-lg mb-6 focus:ring-darkNavy focus:border-darkNavy">
						<option value="Estudante">Estudante</option>
						<option value="Psicólogo">Psicólogo</option>
						<option value="professor">Professor</option>
					</select>
					{/* Botão Principal */}
					<button
						type="submit"
						className="bg-darkNavy text-white p-3 w-full rounded-xl hover:bg-gray-800 transition">
						Create account
					</button>
				</form>

				{/* Links inferiores */}
				<div className="mt-6 text-center text-sm flex justify-between">
					<Link
						to="/forgot-password"
						className="text-darkNavy hover:underline">
						Forgot password?
					</Link>
					<Link
						to="/register"
						className="text-darkNavy hover:underline">
						Need an account? Sign up
					</Link>
				</div>
			</div>
		</div>
	);
};  
export default Register;