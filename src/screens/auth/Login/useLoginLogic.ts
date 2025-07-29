import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'expo-router';

const useLoginLogic = () => {
  const router = useRouter();
  const { login, loading, error, handleOAuthLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateInputs = () => {
    let isValid = true;
    setEmailError(false);
    setPasswordError(false);

    if (!email.trim()) {
      setEmailError(true);
      setLocalError('Будь ласка, введіть email');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true);
      setLocalError('Невірний формат email');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError(true);
      setLocalError('Пароль повинен містити щонайменше 6 символів');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    setLocalError(null);
    if (!validateInputs()) return;

    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || 'Помилка входу';
      setLocalError(errorMessage);
      console.error('Помилка входу:', e);
    }
  };

  const handleNavigateToRegister = () => {
    router.push('/auth/Register');
  };

  const handleGoogleLogin = async () => {
    try {
      await handleOAuthLogin('google');
      router.replace('/(tabs)');
    } catch (e: any) {
      setLocalError(e.message || 'Помилка входу через Google');
    }
  };

  const handleAppleLogin = async () => {
    try {
      await handleOAuthLogin('apple');
      router.replace('/(tabs)');
    } catch (e: any) {
      setLocalError(e.message || 'Помилка входу через Apple');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    localError,
    emailError,
    passwordError,
    setEmailError,
    setPasswordError,
    handleLogin,
    handleNavigateToRegister,
    handleGoogleLogin,
    handleAppleLogin
  };
};

export default useLoginLogic;