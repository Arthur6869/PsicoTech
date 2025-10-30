# PsicoTech
## 🌟 Sobre o Projeto

O **PsiConnect (PsicoTech)** é uma plataforma social e educacional destinada a conectar estudantes e profissionais da psicologia. Esta Fase 1 estabeleceu a arquitetura fundamental do projeto e implementou o módulo completo de autenticação e proteção de rotas, criando uma base segura e robusta para o desenvolvimento de funcionalidades futuras como o Feed e as áreas de perfil.

## 🚀 Arquitetura (Monorepo Lógico)

O projeto está estruturado em dois diretórios principais:

1.  **`psicotech-backend/`**: Contém a API RESTful.
2.  **`psicotech-frontend/`**: Contém a interface do usuário.

### 💻 Stack Tecnológica

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| Backend| Node.js, Express, CORS | Servidor robusto para lidar com as requisições API. |
| Banco de Dados | **PostgreSQL | Utilizado para persistência de dados. |
| ORM | Prisma| Cliente de banco de dados moderno e Type-Safe. |
| Segurança | JWT, bcrypt | JSON Web Tokens para sessões e bcrypt para hashing seguro de senhas. |
| Frontend | React, TypeScript, Vite | Biblioteca e ferramentas modernas para uma experiência de usuário rápida. |
| Estilização | Tailwind CSS | Framework CSS utility-first para design responsivo e rápido. |
| Autenticação| Google OAuth | Implementação de Login Social via `google-auth-library` no backend e `@react-oauth/google` no frontend. |

## 🛠️ Instalação e Configuração

### 1. Pré-requisitos

Node.js (versão recomendada: 18+)
Docker (ou PostgreSQL instalado localmente)

### 2. Configuração do Backend

1.  Navegue para o diretório do backend:
    ```bash
    cd psicotech-backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Crie um arquivo `.env` na raiz do diretório `psicotech-backend` e preencha com as suas credenciais.
    > ⚠️ CRÍTICO:** Este arquivo não deve ser versionado (já configurado no `.gitignore`).

    ```env
    # Database (Ajuste conforme seu setup Docker/local)
    DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB_NAME]"
    DB_NAME="psico_db"

    # JWT Secret (Use uma string longa e aleatória)
    JWT_SECRET="sua_chave_secreta_aqui"

    # Google OAuth 2.0 (Obtenha no Google Cloud Console)
    GOOGLE_CLIENT_ID="SEU_GOOGLE_CLIENT_ID"
    GOOGLE_CLIENT_SECRET="SEU_GOOGLE_CLIENT_SECRET"
    # O URI de Redirecionamento deve ser a URL do seu frontend, ex: http://localhost:5173
    GOOGLE_REDIRECT_URI="http://localhost:5173" 
    ```

4.  Execute as migrações do Prisma para criar o banco de dados e a tabela `User`:
    ```bash
    npx prisma migrate dev --name create_user_table
    ```

### 3. Configuração do Frontend

1.  Navegue para o diretório do frontend:
    ```bash
    cd ../psicotech-frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  O Frontend já possui um arquivo `.env` de exemplo (vide `psicotech-frontend/.env`). Verifique se o `VITE_GOOGLE_CLIENT_ID` está correto para permitir o Login com Google.

    ```env
    # psicotech-frontend/.env
    VITE_GOOGLE_CLIENT_ID=569246912063-4dpue8vc58b5altqts9a1h3r976n6hb4.apps.googleusercontent.com
    ```

## ▶️ Executando o Projeto

Você precisará de dois terminais abertos para rodar o Backend e o Frontend simultaneamente.

### 1. Iniciar o Backend

No diretório `psicotech-backend`:

```bash
npm start # ou node server.js
O servidor estará rodando em http://localhost:3000

Projeto PsicoTech - Fase 1
PROJETO: PSICOTECH (PsiConnect)
Versão: 1.0 (Fase 1 - Módulo de Autenticação) Data: 29 de Outubro de 2025 

        1. INTRODUÇÃO E ESCOPO DA FASE 1
    Este documento detalha as entregas técnicas da Fase 1 do projeto PsiConnect (PsicoTech), cujo foco principal foi o estabelecimento da Arquitetura de Desenvolvimento e a implementação completa do Módulo de Autenticação e Segurança. O projeto visa criar uma plataforma social e educacional para a comunidade de psicologia.

        2. ARQUITETURA E STACK TECNOLÓGICA
O projeto utiliza uma abordagem de Monorepo Lógico, separando a aplicação em dois ambientes distintos, mas interligados: psicotech-frontend e psicotech-backend.

            2.1. Stack Principal
                Componente  Tecnologia  Finalidade
                Backend Node.js (Express)API RESTful e Lógica de Negócios.
                ORM/DB  Prisma / PostgreSQL Persistência de dados.
                Frontend    React com TypeScript (Vite)Interface do Usuário (SPA).EstilizaçãoTailwind CSSEstilização utility-first.
                SegurançaJWT, bcrypt, Google OAuthAutenticação e Autorização.

                2.2. Configuração de Comunicação
                    Vite Proxy: O arquivo psicotech-frontend/vite.config.js está configurado para encaminhar todas as requisições /api/v1 do frontend para o backend, em http://127.0.0.1:3000, resolvendo problemas de CORS em desenvolvimento.

        3. MÓDULO DE AUTENTICAÇÃO E SEGURANÇA (ENTREGA PRINCIPAL)
        O módulo de autenticação está totalmente funcional, cobrindo o ciclo completo de login, registro, autenticação social e proteção de recursos.

            3.1. Rotas da API de Autenticação (/api/v1)
            Rota    ,Método,    Responsabilidade
            /register,POST,Criação de conta com hash de senha (bcrypt) e retorno de JWT para auto-login.
            /login,POST,Validação de credenciais e emissão do JSON Web Token (JWT).
            /auth/google,POST,Autenticação com Google OAuth (cria ou loga o usuário).
            /profile,GET,Rota Protegida que retorna dados do usuário logado.

                3.2. Mecanismos de Autorização e Segurança
                Middleware JWT (auth.js): O middleware protect intercepta requisições, valida o JWT no cabeçalho Authorization e anexa o userId à requisição, garantindo acesso seguro.

            Interceptor Axios (api.ts): O cliente HTTP do frontend está configurado para inserir o Bearer Token do localStorage automaticamente em todas as requisições.

            Componente PrivateRoute (App.tsx): Implementa a proteção no lado do cliente, redirecionando o usuário para /login se o token estiver ausente.

            Recuperação de Perfil (ProfileMenu.tsx): Realiza a chamada GET /profile e, em caso de falha de autenticação (401), desloga o usuário e força o re-login.

        4. DETALHES DE INSTALAÇÃO E EXECUÇÃO
            4.1. Pré-requisitos
        Node.js (v18+)
        Gerenciador de Banco de Dados PostgreSQL

                4.2. Setup e Execução (Passo a Passo)

 Etapa,Ação,Comandos (na pasta respectiva)

    1. Backend Setup,  "Instalar dependências e configurar .env com DATABASE_URL, JWT_SECRET e credenciais Google.",cd psicotech-backend && npm install
        2. Migrações,Aplicar o schema do Prisma para criar a tabela User.,npx prisma migrate dev --name create_user_table
            3. Frontend Setup,Instalar dependências.,cd psicotech-frontend && npm install
                4. Iniciar Backend,Rodar o servidor da API.,npm start (ou node server.js)
                    5. Iniciar Frontend,Rodar o ambiente de desenvolvimento (com proxy).,npm run dev

                        *O servidor estará rodando em http://localhost:3000