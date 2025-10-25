// src/controllers/authController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Necessário para a rota de Login (Tarefa 3)

const saltRounds = 10; // Fator de segurança para o hashing do bcrypt

// Rota de Registro (POST /api/v1/register)
exports.register = async (req, res) => {
    const { username, email, password, perfilTipo } = req.body;
      
     
    // 1. Validação de campos
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Preencha username, email e password." });
    }

    try {
        // 2. Hashing da Senha (CRÍTICO)
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // 3. Salva o novo usuário no PostgreSQL via Prisma
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash,
                // Define Estudante como padrão se perfilTipo não for fornecido
                perfilTipo: perfilTipo || "Estudante", 
            },
        });

        // 4. Resposta de sucesso (código 201: Criado)
        return res.status(201).json({ 
            message: "Usuário registrado com sucesso!", 
            user: { 
                id: newUser.id, 
                email: newUser.email,
                perfilTipo: newUser.perfilTipo 
            }
        });

    } catch (error) {
        // 5. Trata erro de email/username duplicado (código 'P2002' do Prisma)
        if (error.code === 'P2002') { 
            return res.status(409).json({ error: "Email ou nome de usuário já está em uso." });
        }
        console.error("Erro no registro:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

// Rota de Login (POST /api/v1/login) - Deixe esta função vazia por enquanto
// Rota de Login (POST /api/v1/login)
exports.login = async (req, res) => {
    // 1. Recebe credenciais
    const { email, password } = req.body;

    try {
        // Validação de entrada
        if (!email || !password) {
            return res.status(400).json({ error: "Email e senha são obrigatórios." });
        }

        // 2. Busca o usuário pelo email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: "Email ou senha inválidos." });
        }

        // 3. Compara a senha (bcrypt.compare)
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(401).json({ error: "Email ou senha inválidos." });
        }

        // 4. Gera o JWT
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email, 
                perfilTipo: user.perfilTipo
            },
            process.env.JWT_SECRET, // CHAVE SECRETA DO .ENV AQUI
            { expiresIn: '1d' }
        );

        // 5. Resposta de sucesso
        return res.status(200).json({ 
            message: "Login bem-sucedido!",
            token,
            user: { 
                id: user.id, 
                email: user.email, 
                perfilTipo: user.perfilTipo 
            } 
        });

    } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};