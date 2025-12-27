// Menu_initial.tsx
// Menu de navegação inicial da landing page
// Implementado com layout centralizado: logo à esquerda, itens no centro, botões à direita
// Props: recebe navItems do componente pai (Initial.tsx)
// Estilização: backdrop-blur, gradientes indigo/pink, hover effects
// Responsivo: menu mobile simplificado, desktop com layout completo

import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
	name: string;
	href: string;
}

interface MenuInitialProps {
	navItems: NavItem[];
}

const Menu_initial: React.FC<MenuInitialProps> = ({ navItems }) => {
return (
	<header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg shadow-indigo-500/5">
		<div className="container mx-auto px-4 py-4 flex justify-center items-center relative">
			<div className="absolute left-4 text-2xl font-bold text-indigo-700">
				Psico.tech
			</div>
			<nav className="hidden md:flex space-x-12 items-center">
				{navItems.map((item) => (
					<a
						key={item.name}
						href={item.href}
						className="text-gray-700 hover:text-indigo-600 transition-colors relative group duration-300 cursor-pointer">
						{item.name}
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
					</a>
				))}
			</nav>
			<div className="absolute right-4 hidden md:flex space-x-3">
				<Link
					to="/login"
					className="px-4 py-2 text-slate-600 hover:text-indigo-600 hover:bg-gray-200 font-medium transition-colors rounded-lg">
					Login
				</Link>
				<Link
					to="/register"
					className="px-6 py-2.5 text-white font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all">
					Começar Grátis
				</Link>
			</div>
			<div className="md:hidden absolute right-4">
				<Link
					to="/login"
					className="text-indigo-700 hover:text-pink-500 text-sm">
					Login/Register
				</Link>
			</div>
		</div>
	</header>
);
}

export default Menu_initial;