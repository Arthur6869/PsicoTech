# feat: redesign landing page com framer-motion e refatoração de componentes

## 📋 Descrição

Redesign completo da landing page do PsicoTech com implementação de animações fluidas e refatoração de componentes críticos.

## ✨ Alterações Principais

### 🎨 Design & Animações
- **Redesign Hero Section**: Gradientes modernos (gray-50 → blue-50 → purple-50)
- **Framer-motion**: Implementação completa de animações (fade-in, slide-up, scale)
- **IntersectionObserver**: Animações acionadas ao entrar na viewport
- **Hover Effects**: Blur effects e transições suaves em componentes

### 🔧 Refatoração de Componentes

#### Initial.tsx
- Hero section com gradient text (purple-600 → pink-500)
- Sistema de animações com stagger effects
- Menu responsivo integrado
- Seções com efeitos ao scroll

#### Menu_initial.tsx
- Layout centralizado: logo esquerda, itens centro, botões direita
- Efeito hover com underline animado nos itens de nav
- Backdrop blur (80%) para efeito moderno
- Botão "Começar Grátis" com gradiente indigo-pink

#### Clients.tsx
- Hover blur effects com group-hover
- Cores atualizadas (text-slate-500)
- Transições suaves (300ms)
- Subtitle "Confiado por estudantes das principais instituições" com estilos premium

#### Alert.tsx (Novo Sistema)
- Centralização de alertas com SweetAlert2
- `alertSuccess()`: 2s de duração, ícone success
- `alertError()`: 3s de duração, ícone error
- `alertConfirm()`: Confirmação customizável

### 📦 Dependências Adicionadas
- **framer-motion@12.23.26**: Animações declarativas e performáticas
- **sweetalert2**: Sistema de alertas moderno e acessível
- React Router Dom 7.9.4: Navegação otimizada

### 🎯 Melhorias de UX
- Transições suaves entre seções
- Feedback visual em hover e click
- Animações ao entrar na viewport
- Layout responsivo mobile-first
- Acessibilidade melhorada

## 🚀 Próximos Passos
- [ ] Refatoração de formulários
- [ ] Integração de backend para contatos
- [ ] Testes E2E com Cypress
- [ ] PWA features
- [ ] Dark mode (opcional)

## 🔍 Como Testar
```bash
cd psicotech-frontend
npm install
npm run dev
# Acessar http://localhost:5173
```

## 📱 Responsividade
✅ Desktop (lg: 1024px+)
✅ Tablet (md: 768px+)  
✅ Mobile (sm: 640px+)
✅ Mobile Small (< 640px)

---
**Branch:** feat/changelog-sweetalert2
**Target:** main

## 🔗 Como Criar a PR no GitHub

1. Acesse: https://github.com/MatheusCoelho13/PsicoTech
2. Clique em "Pull requests"
3. Clique em "New pull request"
4. Selecione:
   - **Base:** main
   - **Compare:** feat/changelog-sweetalert2
5. Cole o conteúdo deste arquivo na descrição
6. Clique em "Create pull request"
