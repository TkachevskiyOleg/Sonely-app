import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Додаємо функцію refreshToken
const refreshToken = async (token: string): Promise<{ token: string }> => {
    const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

const axiosClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Додаємо токен до запитів
axiosClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Обробка помилок
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Якщо помилка 401 і це не запит на оновлення токена
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    const { token: newToken } = await refreshToken(token);
                    await AsyncStorage.setItem('authToken', newToken);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosClient(originalRequest);
                }
            } catch (e) {
                console.error('Token refresh failed', e);
                await AsyncStorage.removeItem('authToken');
                await AsyncStorage.removeItem('authUser');
                // Ви можете використовувати свій роутер для перенаправлення
                // Наприклад: router.replace('/auth/Login');
            }
        }
        
        return Promise.reject(error);
    }
);

export default axiosClient;