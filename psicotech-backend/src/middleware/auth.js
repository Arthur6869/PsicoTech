const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    // 1. Pega o token do cabeçalho (Header: Authorization: Bearer <token>)
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ error: 'Não autorizado, token não fornecido.' });
    }

    try {
        // 2. Verifica e decodifica o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Anexa o ID do usuário (ou dados do token) à requisição
        req.user = decoded; 

        // 4. Continua para a próxima função da rota (o controller)
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};