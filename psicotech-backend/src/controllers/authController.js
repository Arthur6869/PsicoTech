// src/controllers/authController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const saltRounds = 10; // Fator de segurança para o hashing do bcrypt
const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5173'
);

// Rota de Registro (POST /api/v1/register)
// /src/controllers/authController.js
// ... (código existente, imports, e saltRounds)

// Rota de Registro (POST /api/v1/register)
exports.register = async (req, res) => {
    const { username, email, password, perfilTipo } = req.body;
      
    // 1. ValidaÃ§Ã£o de campos
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Preencha username, email e password." });
    }

    try {
        // 2. Hashing da Senha (CRÃTICO)
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // 3. Salva o novo usuÃ¡rio no PostgreSQL via Prisma
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash,
                // Define Estudante como padrÃ£o se perfilTipo nÃ£o for fornecido
                perfilTipo: perfilTipo || "Estudante", 
            },
        });

        // =========================================================
        // NOVO PASSO: 4. Gera o JWT imediatamente (Auto-Login)
        // =========================================================
        const token = jwt.sign(
            { 
                userId: newUser.id, 
                email: newUser.email, 
                perfilTipo: newUser.perfilTipo 
            },
            process.env.JWT_SECRET, // Chave secreta do .env
            { expiresIn: '1d' }      
        );
        // =========================================================
        
        // 5. Resposta de sucesso (código 201: Criado)
        return res.status(201).json({ 
            message: "Usuário registrado com sucesso! Logado automaticamente.", 
            token, // <-- ADICIONA O TOKEN AQUI
            user: { 
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                perfilTipo: newUser.perfilTipo 
            }
        });

    } catch (error) {
        console.error("Erro no registro:", error);
        
        // Erro: tabela não existe (P2021)
        if (error.code === 'P2021') {
            return res.status(500).json({ 
                error: "Banco de dados não configurado. Execute as migrações do Prisma: npx prisma migrate deploy" 
            });
        }
        
        // Verifica se é um erro de constraint única (email ou username duplicado)
        if (error.code === 'P2002') {
            const field = error.meta?.target?.[0] || 'campo';
            const fieldName = field === 'email' ? 'email' : field === 'username' ? 'username' : 'campo';
            return res.status(400).json({ 
                error: `Este ${fieldName} já está em uso. Por favor, escolha outro.` 
            });
        }
        
        // Outros erros do banco de dados
        if (error.code && error.code.startsWith('P')) {
            return res.status(400).json({ 
                error: "Erro ao processar a solicitação. Verifique os dados fornecidos." 
            });
        }
        
        // Erro genérico
        return res.status(500).json({ 
            error: "Erro interno do servidor ao criar conta. Tente novamente mais tarde." 
        });
    }
};

// Rota de Login (POST /api/v1/login) - Permanece IMUTÁVEL
// ...
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
            
            { userId: user.id, email: user.email, perfilTipo: user.perfilTipo },
            
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

// Rota de Google OAuth (POST /api/v1/auth/google)
exports.googleAuth = async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Code do Google não fornecido." });
    }

    try {
        // 1. Troca o code por tokens
        const { tokens } = await client.getToken(code);
        const idToken = tokens.id_token;

        if (!idToken) {
            return res.status(400).json({ error: "Não foi possível obter o ID token." });
        }

        // 2. Verifica o ID token
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        if (!email) {
            return res.status(400).json({ error: "Email não fornecido pelo Google." });
        }

        // 3. Busca ou cria o usuário
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Cria novo usuário com Google OAuth
            user = await prisma.user.create({
                data: {
                    email,
                    username: email.split('@')[0] + '_' + googleId.slice(0, 6), // Gera username único
                    passwordHash: await bcrypt.hash(googleId + process.env.JWT_SECRET, saltRounds), // Password hash temporário
                    perfilTipo: "Estudante",
                },
            });
        }

        // 4. Gera o JWT
        const jwtToken = jwt.sign(
            { userId: user.id, email: user.email, perfilTipo: user.perfilTipo },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 5. Resposta de sucesso
        return res.status(200).json({
            message: "Autenticação Google bem-sucedida!",
            token: jwtToken,
            user: {
                id: user.id,
                email: user.email,
                perfilTipo: user.perfilTipo,
            },
        });

    } catch (error) {
        console.error("Erro na autenticação Google:", error);
        return res.status(401).json({ error: "Code inválido ou expirado." });
    }
};

// Rota de Forgot Password (POST /api/v1/forgot-password)
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email é obrigatório." });
    }

    try {
        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Por segurança, sempre retorna sucesso mesmo se o email não existir
        // Isso evita email enumeration attacks
        return res.status(200).json({
            message: "Se esse email existir em nossa base, você receberá instruções para redefinir sua senha.",
        });

    } catch (error) {
        console.error("Erro no forgot password:", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};