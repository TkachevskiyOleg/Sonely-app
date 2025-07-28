import axiosClient from '../utils/axiosClient';

export const login = async (email: string, password: string) => {
  const response = await axiosClient.post('/auth/login', { email, password });
  // Очікуємо, що бекенд повертає { token, user }
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await axiosClient.post('/auth/register', { email, password });
  // Очікуємо, що бекенд повертає { token, user }
  return response.data;
};
