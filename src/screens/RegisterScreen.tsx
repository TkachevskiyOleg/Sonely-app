import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  ImageBackground,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

const RegisterScreen = () => {
  const router = useRouter();
  const { register, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const validateInputs = () => {
    if (!email.trim()) {
      setLocalError('Будь ласка, введіть email');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setLocalError('Невірний формат email');
      return false;
    }
    if (password.length < 6) {
      setLocalError('Пароль повинен містити щонайменше 6 символів');
      return false;
    }
    if (password !== confirmPassword) {
      setLocalError('Паролі не співпадають');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    setLocalError(null);
    if (!validateInputs()) return;

    try {
      await register(email, password);
      router.replace('/(tabs)');
    } catch (e) {
      console.error('Помилка реєстрації:', e);
    }
  };

  const handleNavigateToLogin = () => {
    router.push('/auth/Login');
  };

    return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <View style={styles.header}>
            <Text style={styles.logo}>Sonely</Text>
            <Text style={styles.subtitle}>Створи свій музичний світ</Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Створення акаунту</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TextInput
              style={styles.input}
              placeholder="Підтвердіть пароль"
              placeholderTextColor="#94a3b8"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            
            {(localError || error) && (
              <Text style={styles.error}>{localError || error}</Text>
            )}
            
            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Зареєструватись</Text>
              )}
            </TouchableOpacity>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Вже маєте акаунт?</Text>
            <TouchableOpacity onPress={handleNavigateToLogin}>
              <Text style={styles.link}>Увійти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  // Same styles as LoginScreen with minor color adjustments
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 42,
    fontWeight: '800',
    color: '#e2e8f0',
    letterSpacing: 1.2,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 8,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#f1f5f9',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.4)',
  },
  error: {
    color: '#f87171',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    color: '#94a3b8',
    marginRight: 4,
  },
  link: {
    color: '#818cf8',
    fontWeight: '600',
  },
});

export default RegisterScreen;