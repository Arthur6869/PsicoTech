// server.js

// 1. Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const app = express();
// Ajusta a importação para verificar o conteúdo do authController
const { register, login } = require('./src/controllers/authController');

// Define a porta, usando a variável de ambiente PORT (se existir) ou 3000 como padrão
const PORT = process.env.PORT || 3000;

// 2. Middleware
// Habilita o Express para analisar requisições com corpo JSON (essencial para /register e /login)
app.use(express.json());

// 3. Mapeamento das Rotas
// Mapeia a rota de Registro para o controller
app.post('/api/v1/register', register);

// Mapeia a rota de Login (será implementada na próxima etapa)
app.post('/api/v1/login', login); 


// 4. Inicia o Servidor
app.listen(PORT, () => {
    // Exibe mensagens úteis no console
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Ambiente conectado ao DB: ${process.env.DB_NAME}`);
    console.log('Conteúdo do authController:', { register, login });
});