// server.js

// 1. Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Importa o cors
const app = express();
// Ajusta a importação para verificar o conteúdo do authController
const { register, login } = require('./src/controllers/authController');
const { protect } = require('./src/middleware/auth'); // NOVO
const userController = require('./src/controllers/userController'); // NOVO

// Define a porta, usando a variável de ambiente PORT (se existir) ou 3000 como padrão
const PORT = process.env.PORT || 3000;

// 2. Middleware
// Habilita o Express para analisar requisições com corpo JSON (essencial para /register e /login)
app.use(express.json());

// Configura o CORS para permitir requisições do frontend
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 3. Mapeamento das Rotas
// Mapeia a rota de Registro para o controller
app.post('/api/v1/register', register);

// Mapeia a rota de Login (será implementada na próxima etapa)
app.post('/api/v1/login', login); 

// Rota de PERFIL PROTEGIDA (O Frontend pedirá dados aqui)
app.get('/api/v1/profile', protect, userController.getProfile); // NOVO!


app.listen(PORT, () => {
    // Exibe mensagens úteis no console
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Ambiente conectado ao DB: ${process.env.DB_NAME}`);
    console.log('Conteúdo do authController:', { register, login });
});