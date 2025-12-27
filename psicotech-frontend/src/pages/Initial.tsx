import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Importa o componente da mesma pasta (src/pages/)
import { PsyIADemo } from './PsyIADemo';
import Menu_initial from '../components/Menu_initial';
import Clients from '../components/clients';
import testeGif from '../assets/teste.gif';
const Initial: React.FC = () => {
	const location = useLocation();
	// Novas Cores: indigo-700 (Roxo Escuro), pink-500 (Rosa Destaque), Gradiente (Roxo/Rosa Claro)
	//inns de  faculdades que utilizam a psico tech ( incerto )

	const clients = [
		{
			Name: 'tESTE 1s',
			LogoUrl: testeGif,
			description:
				'USP utiliza PsicoTech para treinar estudantes de psicologia.',
		},
	];

	// Itens de navegação atualizados para refletir o novo conteúdo
	const navItems = [
		{ name: 'Solução', href: '#solucao' },
		{ name: 'Demo ', href: '#demo' },
		{ name: 'O Problema', href: '#problema' },
		{ name: 'Time', href: '#time' },
	];

	// DADOS DA PSYIA: O novo "O que fazemos"
	const psyIAFeatures = [
		{
			title: '1. Escolha o Caso',
			description:
				'Selecione um dos nossos diversos estudos de caso realistas: "criança neurodivergente", "vestibulando sobrecarregado", "concursado com transtorno borderline", etc.',
		},
		{
			title: '2. Defina sua Abordagem',
			description:
				'Indique qual abordagem você usará (TCC, Psicanálise, etc.) e faça suas anotações pré-sessão que serão usadas no relatório final.',
		},
		{
			title: '3. Conduza a Sessão',
			description:
				'Converse com a IA, que simula o paciente em tempo real. Ela reage, responde e se comporta com base no estudo de caso, permitindo que você treine sua escuta.',
		},
	];

	// DADOS DO ECOSSISTEMA: O novo "Serviços"
	const ecosystemSteps = [
		{
			title: 'Simule com o PsyIA',
			description:
				'Acesse nossa IA e pratique em um ambiente 100% seguro. Erre sem medo e construa sua confiança sessão por sessão.',
		},
		{
			title: 'Discuta no Feed',
			description:
				'Terminou a simulação? Leve suas dúvidas e insights para o nosso Feed da Comunidade. Pergunte a colegas e mentores: "Como vocês teriam conduzido esse caso?"',
		},
		{
			title: 'Receba Mentoria',
			description:
				'Receba feedback de psicólogos experientes (nossos Mentores) que estão na plataforma para guiar seus primeiros passos e analisar seus relatórios de sessão.',
		},
	];

	// DADOS DA EQUIPE: Atualizado com base no seu Pitch Deck
	const team = [
		{ name: 'ARTHUR SILVA', role: 'TECNOLOGIA', details: '' },
		{ name: 'LUCAS ATIK', role: 'DIREITO', details: '' },
		{ name: 'ΑΝΝΑ NOGUEIRA', role: 'PSICOLOGIA', details: '' },
		{ name: 'LUIS GABRIEL', role: 'NEGÓCIOS', details: '' },
	];

	return (
		<div className="min-h-screen bg-gray-50 font-sans">
			{/* Cabeçalho Fixo */}
			<Menu_initial navItems={navItems} />

			<main className="pt-20">
				{/* Hero Section */}
				<section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-20 md:py-32">
					<div className="container relative z-10 mx-auto px-4 max-w-5xl text-center">
						{/* Título Principal com animação */}
						<AnimatePresence mode="wait">
							<motion.div
								key={location.key || location.pathname}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.6, delay: 0.1 }}>
								<motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
									<div className="text-gray-900">Pratique com</div>
									<span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
										pacientes virtuais
									</span>
								</motion.h1>

								{/* Subtítulo com animação */}
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
									className="text-xl sm:text-2xl md:text-3xl text-gray-600 font-semibold mb-6">
									Antes do seu primeiro atendimento real
								</motion.p>

								{/* Descrição com animação */}
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									className="text-base sm:text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
									Apresentamos o{' '}
									<span className="text-purple-600 font-semibold">PsyIA</span>,
									seu simulador de voo clínico. Pratique, erre e aprenda com
									sessões realistas antes de atender seu primeiro paciente real.
								</motion.p>
							</motion.div>
						</AnimatePresence>
						{/* Botões com animação */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.5 }}
							className="flex flex-col sm:flex-row gap-4 justify-center items-center">
							<a
								href="#demo"
								className="group inline-flex items-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
								Experimente a simulação
								<svg
									className="w-5 h-5 group-hover:translate-x-1 transition-transform"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									/>
								</svg>
							</a>
						</motion.div>
					</div>
				</section>
				{/* 2. A Solução (PsyIA) - O que é */}
				{/* <section
					id="solucao"
					className="py-16 md:py-24 bg-white">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
							Apresentando PsyIA: Seu Simulador de Voo Clínico
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							{psyIAFeatures.map((feature, index) => (
								<div
									key={index}
									className="p-6 border-l-4 border-pink-500 shadow-md">
									<h3 className="text-xl font-semibold mb-3 text-pink-500">
										{feature.title}
									</h3>
									<p className="text-gray-700">{feature.description}</p>
								</div>
							))}
						</div>
					</div>
				</section> */}
				{/* 2.1 intuição que utiliza a PsyIA ( incerto ) */}
				<section>
					<Clients clients={clients} />
				</section>
				{/* 3. SEÇÃO NOVA: DEMO INTERATIVA */}
				{/* TODO:  REFAZER ISSO  */}
				<section
					id="demo"
					className="py-16 md:py-24 bg-gray-100">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
							Experimente o PsyIA: Demonstração
						</h2>
						<PsyIADemo />
					</div>
				</section>
				{/* 4. Como Funciona (O Ecossistema) */}
				<section
					id="como-funciona"
					className="py-16 md:py-24 bg-white">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
							O Ciclo da Confiança: Pratique no PsyIA, Evolua na Comunidade
						</h2>
						<div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
							{ecosystemSteps.map((step, index) => (
								<div
									key={index}
									className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
									<h3 className="text-xl font-semibold mb-2 text-indigo-700">
										{step.title}
									</h3>
									<p className="text-gray-600">{step.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>
				{/* 5. O Problema (Validação) */}
				<section
					id="problema"
					className="py-16 md:py-24 bg-gray-100">
					{' '}
					{/* Cor de fundo alternada */}
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-700">
							Nós entendemos a sua insegurança
						</h2>
						<blockquote className="bg-white p-8 rounded-lg shadow-inner max-w-4xl mx-auto">
							<p className="italic text-gray-700 mb-4 text-2xl font-medium">
								"Entre 43% e 54% de estudantes e recém-formados relataram
								ansiedade, sofrimento mental ou insegurança ligada às práticas
								clínicas."
							</p>
							<p className="font-semibold text-right text-indigo-700">
								- Fonte: Pitch Psico.tech
							</p>
						</blockquote>
						<p className="mt-8 text-xl text-gray-800">
							A Psico.tech foi criada para resolver exatamente isso.
						</p>
					</div>
				</section>
				{/* 6. Nossa Equipe - ATUALIZADA */}
				<section
					id="time"
					className="py-16 md:py-24 bg-white">
					<div className="container mx-auto px-4">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
							Nosso Time
						</h2>
						<div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-12">
							{team.map((member, index) => (
								<div
									key={index}
									className="text-center max-w-xs">
									{/* Placeholder para Foto */}
									<div className="w-32 h-32 mx-auto rounded-full bg-pink-400 flex items-center justify-center mb-4">
										<span className="text-white text-xl">{member.name[0]}</span>
									</div>
									<h3 className="text-xl font-semibold text-indigo-700">
										{member.name}
									</h3>
									<p className="text-gray-600 font-medium">{member.role}</p>
									{member.details && (
										<p className="text-sm text-gray-500 mt-2">
											{member.details}
										</p>
									)}
								</div>
							))}
						</div>
					</div>
				</section>
				{/* 7. Contato / Footer - TEXTO ATUALIZADO */}
				<footer
					id="agende"
					className="bg-indigo-700 text-white py-12 md:py-16">
					<div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
						<div>
							<h3 className="text-2xl font-bold mb-4">Psico.tech</h3>
							<p className="mb-2">
								Faça parte da mudança na prática da psicologia.
							</p>
							<p className="text-xl font-semibold text-pink-400">
								contato@psico.tech
							</p>
							<p className="mt-4">
								Junte-se à nossa comunidade e ganhe confiança para sua carreira.
							</p>
						</div>
						<div className="md:col-span-2">
							<h3 className="text-2xl font-bold mb-4">Formulário de Contato</h3>
							<form className="space-y-4">
								<input
									type="text"
									placeholder="Nome"
									className="w-full p-3 rounded bg-white text-gray-900"
									required
								/>
								<input
									type="email"
									placeholder="Email *"
									className="w-full p-3 rounded bg-white text-gray-900"
									required
								/>
								<textarea
									placeholder="Mensagem *"
									rows={4}
									className="w-full p-3 rounded bg-white text-gray-900"
									required></textarea>
								<button
									type="submit"
									className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold transition duration-300">
									Enviar Mensagem
								</button>
							</form>
						</div>
					</div>
					<div className="mt-8 pt-6 border-t border-indigo-600 text-center text-sm">
						Psico.tech © {new Date().getFullYear()}
					</div>
				</footer>
			</main>
		</div>
	);
};

export default Initial;
