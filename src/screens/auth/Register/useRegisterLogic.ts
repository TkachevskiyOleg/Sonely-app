import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'expo-router';

const useRegisterLogic = () => {
  const router = useRouter();
  const { register, loading, error, handleOAuthLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const validateInputs = () => {
    let isValid = true;
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

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
      setConfirmPasswordError(true);
      setLocalError('Пароль повинен містити щонайменше 6 символів');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      setLocalError('Паролі не співпадають');
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    setLocalError(null);
    if (!validateInputs()) return;

    try {
      await register(email, password);
      router.replace('/(tabs)');
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || 'Помилка реєстрації';
      setLocalError(errorMessage);
      console.error('Помилка реєстрації:', e);
    }
  };

  const handleNavigateToLogin = () => {
    router.push('/auth/Login');
  };

  const handleGoogleRegister = async () => {
    try {
      await handleOAuthLogin('google');
      router.replace('/(tabs)');
    } catch (e: any) {
      setLocalError(e.message || 'Помилка реєстрації через Google');
    }
  };

  const handleAppleRegister = async () => {
    try {
      await handleOAuthLogin('apple');
      router.replace('/(tabs)');
    } catch (e: any) {
      setLocalError(e.message || 'Помилка реєстрації через Apple');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    localError,
    emailError,
    passwordError,
    confirmPasswordError,
    setEmailError,
    setPasswordError,
    setConfirmPasswordError,
    handleRegister,
    handleNavigateToLogin,
    handleGoogleRegister,
    handleAppleRegister
  };
};

export default useRegisterLogic;