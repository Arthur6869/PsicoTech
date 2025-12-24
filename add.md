# 📝 Changelog - PsicoTech

## ✨ Adições
- **SweetAlert2** - Sistema de alertas visuais implementado

## 🔧 Correções
- **Alert.tsx**
    -refatoração do alerta do menu ( com timer maior)
  - Corrigida sintaxe e declaração da variável `timerInterval`
  - Adicionada tipagem `NodeJS.Timeout`
  - Removido `export` mal posicionado
  
- **Register.tsx**
  - Implementado `setTimeout(2s)` para exibir alerta antes do redirect
  - Melhoria na experiência do usuário ao ver mensagem de sucesso