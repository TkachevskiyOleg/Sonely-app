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

const LoginScreen = () => {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    return true;
  };

  const handleLogin = async () => {
    setLocalError(null);
    if (!validateInputs()) return;

    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (e) {
      console.error('Помилка входу:', e);
    }
  };

  const handleNavigateToRegister = () => {
    router.push('/auth/Register');
  };

    return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/images/music-bg.png')} 
        style={styles.background}
        blurRadius={10}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.85)', 'rgba(0,0,0,0.4)']}
          style={styles.gradient}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
          >
            <View style={styles.header}>
              <Text style={styles.logo}>SONELY</Text>
              <Text style={styles.subtitle}>Музичний простір</Text>
            </View>
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>ВХІД</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>ЕМАIL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Введіть ваш email"
                  placeholderTextColor="#888"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>ПАРОЛЬ</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Введіть пароль"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              
              {(localError || error) && (
                <Text style={styles.error}>{localError || error}</Text>
              )}
              
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>УВІЙТИ</Text>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>Немає акаунту?</Text>
              <TouchableOpacity onPress={handleNavigateToRegister}>
                <Text style={styles.link}>ЗАРЕЄСТРУВАТИСЬ</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
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
    marginBottom: 40,
  },
  logo: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 8,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: 'rgba(15, 15, 15, 0.6)',
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  error: {
    color: '#FF6B6B',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    height: 52,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 160, 122, 0.9)', // М'який лавандовий
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: 'rgba(147, 112, 219, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    paddingVertical: 12,
  },
  footerText: {
    color: 'rgba(255,255,255,0.7)',
    marginRight: 8,
    fontSize: 14,
  },
  link: {
    color: '#FFA07A', // Лавандовий
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default LoginScreen;