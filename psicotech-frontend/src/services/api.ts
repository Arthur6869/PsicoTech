import axios from 'axios';

// A URL base do seu Backend (Node.js/Express)
const api = axios.create({
  baseURL: '/api/v1',
});

// Adiciona um interceptor para anexar o JWT a TODAS as requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('psicotech_token');

    if (token) {
        // Se houver token, adiciona no cabeçalho Authorization
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor de resposta para tratar erros 401 (não autorizado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Se receber 401, limpa o token e redireciona para login
        if (error.response?.status === 401) {
            localStorage.removeItem('psicotech_token');
            localStorage.removeItem('psicotech_user');
            // Redireciona apenas se não estiver já na página de login/register
            if (!window.location.pathname.includes('/login') && 
                !window.location.pathname.includes('/register') &&
                !window.location.pathname.includes('/forgot-password')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;