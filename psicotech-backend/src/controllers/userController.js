const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Rota GET /api/v1/profile
exports.getProfile = async (req, res) => {
    try {
        // O ID do usuário foi anexado pelo middleware 'auth.protect'
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId }, 
            // Seleciona apenas os campos públicos (exclui o hash da senha)
            select: {
                id: true,
                username: true,
                email: true,
                perfilTipo: true,
                // Adicione aqui os campos de perfil, seguidores, publicacoes
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        return res.status(200).json(user);

    } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};