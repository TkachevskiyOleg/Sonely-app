import axiosClient from '../utils/axiosClient';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
  };
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axiosClient.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axiosClient.post('/auth/register', { email, password });
  return response.data;
};

export const refreshToken = async (token: string): Promise<{ token: string }> => {
  const response = await axiosClient.post('/auth/refresh', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};