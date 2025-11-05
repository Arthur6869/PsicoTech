import React from 'react';
import { Link } from 'react-router-dom';
// Importa o componente da mesma pasta (src/pages/)
import { PsyIADemo } from './PsyIADemo';

const Initial: React.FC = () => {
    // Novas Cores: indigo-700 (Roxo Escuro), pink-500 (Rosa Destaque), Gradiente (Roxo/Rosa Claro)

    // Itens de navegação atualizados para refletir o novo conteúdo
    const navItems = [
        { name: 'A Solução', href: '#solucao' },
        { name: 'Demo Interativa', href: '#demo' },
        { name: 'O Problema', href: '#problema' },
        { name: 'Nosso Time', href: '#time' },
    ];

    // DADOS DA PSYIA: O novo "O que fazemos"
    const psyIAFeatures = [
        { title: '1. Escolha o Caso', description: 'Selecione um dos nossos diversos estudos de caso realistas: "criança neurodivergente", "vestibulando sobrecarregado", "concursado com transtorno borderline", etc.' },
        { title: '2. Defina sua Abordagem', description: 'Indique qual abordagem você usará (TCC, Psicanálise, etc.) e faça suas anotações pré-sessão que serão usadas no relatório final.' },
        { title: '3. Conduza a Sessão', description: 'Converse com a IA, que simula o paciente em tempo real. Ela reage, responde e se comporta com base no estudo de caso, permitindo que você treine sua escuta.' },
    ];

    // DADOS DO ECOSSISTEMA: O novo "Serviços"
    const ecosystemSteps = [
        { title: 'Simule com o PsyIA', description: 'Acesse nossa IA e pratique em um ambiente 100% seguro. Erre sem medo e construa sua confiança sessão por sessão.' },
        { title: 'Discuta no Feed', description: 'Terminou a simulação? Leve suas dúvidas e insights para o nosso Feed da Comunidade. Pergunte a colegas e mentores: "Como vocês teriam conduzido esse caso?"' },
        { title: 'Receba Mentoria', description: 'Receba feedback de psicólogos experientes (nossos Mentores) que estão na plataforma para guiar seus primeiros passos e analisar seus relatórios de sessão.' },
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
            <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-indigo-700">Psico.tech</div>
                    <nav className="hidden md:flex space-x-6 items-center">
                        {navItems.map((item) => (
                            <a key={item.name} href={item.href} className="text-gray-700 hover:text-pink-500 transition duration-300">
                                {item.name}
                            </a>
                        ))}
                        <Link to="/login" className="px-4 py-2 text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 transition duration-300">
                            Login
                        </Link>
                        <Link to="/register" className="px-4 py-2 text-indigo-700 border-2 border-indigo-700 rounded-lg hover:bg-indigo-50 transition duration-300">
                            Register
                        </Link>
                    </nav>
                    <div className="md:hidden">
                        <Link to="/login" className="text-indigo-700 hover:text-pink-500 text-sm">Login/Register</Link>
                    </div>
                </div>
            </header>

            <main className="pt-20"> {/* Padding top para compensar o cabeçalho fixo */}
                
                {/* 1. Hero Section (Banner Principal) - FOCO NA PSYIA */}
                <section className="bg-gradient-to-r from-purple-300 to-pink-300 text-indigo-900 py-20 md:py-32 flex items-center justify-center text-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
                            Conduza simulações de pacientes com IA. Hoje.
                        </h1>
                        <p className="text-xl md:text-2xl mb-8">
                            Apresentamos o <strong>PsyIA</strong>, o simulador de pacientes da Psico.tech.
                            Pratique, erre e aprenda com sessões de IA antes de atender seu primeiro paciente real.
                        </p>
                        <a href="#demo" className="inline-block px-8 py-3 text-lg font-semibold bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition duration-300 shadow-xl">
                            Experimente a simulação
                        </a>
                    </div>
                </section>

                {/* 2. A Solução (PsyIA) - O que é */}
                <section id="solucao" className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">Apresentando PsyIA: Seu Simulador de Voo Clínico</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {psyIAFeatures.map((feature, index) => (
                                <div key={index} className="p-6 border-l-4 border-pink-500 shadow-md">
                                    <h3 className="text-xl font-semibold mb-3 text-pink-500">{feature.title}</h3>
                                    <p className="text-gray-700">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. SEÇÃO NOVA: DEMO INTERATIVA */}
                <section id="demo" className="py-16 md:py-24 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">Experimente o PsyIA: Demonstração</h2>
                        <PsyIADemo />
                    </div>
                </section>

                {/* 4. Como Funciona (O Ecossistema) */}
                <section id="como-funciona" className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">O Ciclo da Confiança: Pratique no PsyIA, Evolua na Comunidade</h2>
                        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
                            {ecosystemSteps.map((step, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                                    <h3 className="text-xl font-semibold mb-2 text-indigo-700">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. O Problema (Validação) */}
                <section id="problema" className="py-16 md:py-24 bg-gray-100"> {/* Cor de fundo alternada */}
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-700">Nós entendemos a sua insegurança</h2>
                        <blockquote className="bg-white p-8 rounded-lg shadow-inner max-w-4xl mx-auto">
                            <p className="italic text-gray-700 mb-4 text-2xl font-medium">
                                "Entre 43% e 54% de estudantes e recém-formados relataram ansiedade, sofrimento mental ou insegurança ligada às práticas clínicas."
                            </p>
                            <p className="font-semibold text-right text-indigo-700">- Fonte: Pitch Psico.tech</p>
                        </blockquote>
                        <p className="mt-8 text-xl text-gray-800">A Psico.tech foi criada para resolver exatamente isso.</p>
                    </div>
                </section>

                {/* 6. Nossa Equipe - ATUALIZADA */}
                <section id="time" className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">Nosso Time</h2>
                        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-12">
                            {team.map((member, index) => (
                                <div key={index} className="text-center max-w-xs">
                                    {/* Placeholder para Foto */}
                                    <div className="w-32 h-32 mx-auto rounded-full bg-pink-400 flex items-center justify-center mb-4">
                                        <span className="text-white text-xl">{member.name[0]}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-indigo-700">{member.name}</h3>
                                    <p className="text-gray-600 font-medium">{member.role}</p>
                                    {member.details && <p className="text-sm text-gray-500 mt-2">{member.details}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* 7. Contato / Footer - TEXTO ATUALIZADO */}
                <footer id="agende" className="bg-indigo-700 text-white py-12 md:py-16">
                    <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Psico.tech</h3>
                            <p className="mb-2">Faça parte da mudança na prática da psicologia.</p>
                            <p className="text-xl font-semibold text-pink-400">contato@psico.tech</p>
                            <p className="mt-4">Junte-se à nossa comunidade e ganhe confiança para sua carreira.</p>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-bold mb-4">Formulário de Contato</h3>
                            <form className="space-y-4">
                                <input type="text" placeholder="Nome *" className="w-full p-3 rounded bg-white text-gray-900" required />
                                <input type="email" placeholder="Email *" className="w-full p-3 rounded bg-white text-gray-900" required />
                                <textarea placeholder="Mensagem *" rows={4} className="w-full p-3 rounded bg-white text-gray-900" required></textarea>
                                <button type="submit" className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold transition duration-300">
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