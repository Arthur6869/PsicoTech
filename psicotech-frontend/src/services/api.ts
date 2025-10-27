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

export default api;