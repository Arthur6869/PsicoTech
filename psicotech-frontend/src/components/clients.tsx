import React from 'react'
import {motion} from 'framer-motion';
// criando uma intefarce para fazer o mapeamento dos clientes e  mostrar  mais facilmente
interface Client {
    Name: string ;
    LogoUrl: string ;
    // description: string ;
}
interface ClientProps {
	clients: Client[];
}
const Clients: React.FC<ClientProps> = ({ clients }) => {

    return (
			<motion.div 
			className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md my-12"
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			viewport={{ once: true }}
			>
				{/*   essse e o a parte de  faculdades que utlizandam issos*/}
				<h1 className="font-medium text-sm text-slate-500 uppercase tracking-wider mb-6 text-center">
					Confiado por estudantes das principais instituições
				</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{clients.map((client, index) => (
						<div
							key={index}
							className="h-full p-4 rounded-lg bg-white flex flex-col items-center justify-center text-transparent shadow-sm transition-all duration-300 ease-out hover:bg-gray-50 hover:shadow-md hover:text-gray-300 hover:scale-[1.03]">
							<img
								src={client.LogoUrl}
								alt={client.Name}
								className="h-16 mb-4 object-contain transition-all duration-300 ease-out"
                                fit="contain"
							/>
							<h2 className="text-lg font-semibold mb-2 text-center hover:text-black-100">
								{client.Name}
							</h2>
							{/* <p className="text-sm text-gray-600 text-center">
								{client.description}
							</p> */}
						</div>
					))}
				</div>
			</motion.div>
		);
}
export default Clients;