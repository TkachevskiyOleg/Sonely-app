import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

interface RegisterViewProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  loading: boolean;
  error: string | null;
  localError: string | null;
  emailError: boolean;
  passwordError: boolean;
  confirmPasswordError: boolean;
  handleRegister: () => void;
  handleNavigateToLogin: () => void;
  handleGoogleRegister: () => void;
  handleAppleRegister: () => void;
  buttonScale: Animated.Value;
  googleButtonScale: Animated.Value;
  appleButtonScale: Animated.Value;
  inputShake: Animated.Value;
  errorOpacity: Animated.Value;
  handlePressIn: () => void;
  handlePressOut: () => void;
  handleGooglePressIn: () => void;
  handleGooglePressOut: () => void;
  handleApplePressIn: () => void;
  handleApplePressOut: () => void;
  shakeAnimation: () => void;
  styles: {
    container: StyleProp<ViewStyle>;
    background: StyleProp<ImageStyle>;
    gradient: StyleProp<ViewStyle>;
    content: StyleProp<ViewStyle>;
    header: StyleProp<ViewStyle>;
    logo: StyleProp<TextStyle>;
    subtitle: StyleProp<TextStyle>;
    card: StyleProp<ViewStyle>;
    cardTitle: StyleProp<TextStyle>;
    inputContainer: StyleProp<ViewStyle>;
    inputLabel: StyleProp<TextStyle>;
    input: StyleProp<TextStyle>;
    errorInput: StyleProp<TextStyle>;
    error: StyleProp<TextStyle>;
    button: StyleProp<ViewStyle>;
    buttonText: StyleProp<TextStyle>;
    dividerContainer: StyleProp<ViewStyle>;
    dividerLine: StyleProp<ViewStyle>;
    dividerText: StyleProp<TextStyle>;
    oauthButton: StyleProp<ViewStyle>;
    googleButton: StyleProp<ViewStyle>;
    appleButton: StyleProp<ViewStyle>;
    oauthButtonText: StyleProp<TextStyle>;
    footer: StyleProp<ViewStyle>;
    footerText: StyleProp<TextStyle>;
    link: StyleProp<TextStyle>;
  };
  setEmailError: (value: boolean) => void;
  setPasswordError: (value: boolean) => void;
  setConfirmPasswordError: (value: boolean) => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({
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
  handleRegister,
  handleNavigateToLogin,
  handleGoogleRegister,
  handleAppleRegister,
  buttonScale,
  googleButtonScale,
  appleButtonScale,
  inputShake,
  errorOpacity,
  handlePressIn,
  handlePressOut,
  handleGooglePressIn,
  handleGooglePressOut,
  handleApplePressIn,
  handleApplePressOut,
  shakeAnimation,
  styles,
  setEmailError,
  setPasswordError,
  setConfirmPasswordError
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/music-bg.png')}         
        style={styles.background}
        blurRadius={15}
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
              <Text style={styles.subtitle}>Створюй свій звук</Text>
            </View>
            
            <View style={styles.card}>
              <Text style={styles.cardTitle}>РЕЄСТРАЦІЯ</Text>
              
              <Animated.View 
                style={[
                  styles.inputContainer,
                  { 
                    transform: [{ translateX: inputShake }],
                    borderColor: emailError ? '#FF6B6B' : 'transparent',
                    borderWidth: emailError ? 1 : 0,
                    borderRadius: emailError ? 8 : 0,
                    paddingHorizontal: emailError ? 8 : 0
                  }
                ]}
              >
                <Text style={styles.inputLabel}>ЕМАIL</Text>
                <TextInput
                  style={[
                    styles.input,
                    emailError && styles.errorInput
                  ]}
                  placeholder="Введіть ваш email"
                  placeholderTextColor="#888"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError(false);
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </Animated.View>
              
              <Animated.View 
                style={[
                  styles.inputContainer,
                  { 
                    transform: [{ translateX: inputShake }],
                    borderColor: passwordError ? '#FF6B6B' : 'transparent',
                    borderWidth: passwordError ? 1 : 0,
                    borderRadius: passwordError ? 8 : 0,
                    paddingHorizontal: passwordError ? 8 : 0
                  }
                ]}
              >
                <Text style={styles.inputLabel}>ПАРОЛЬ</Text>
                <TextInput
                  style={[
                    styles.input,
                    passwordError && styles.errorInput
                  ]}
                  placeholder="Введіть пароль"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError(false);
                  }}
                  secureTextEntry
                />
              </Animated.View>

              <Animated.View 
                style={[
                  styles.inputContainer,
                  { 
                    transform: [{ translateX: inputShake }],
                    borderColor: confirmPasswordError ? '#FF6B6B' : 'transparent',
                    borderWidth: confirmPasswordError ? 1 : 0,
                    borderRadius: confirmPasswordError ? 8 : 0,
                    paddingHorizontal: confirmPasswordError ? 8 : 0
                  }
                ]}
              >
                <Text style={styles.inputLabel}>ПІДТВЕРДІТЬ ПАРОЛЬ</Text>
                <TextInput
                  style={[
                    styles.input,
                    confirmPasswordError && styles.errorInput
                  ]}
                  placeholder="Повторіть пароль"
                  placeholderTextColor="#888"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setConfirmPasswordError(false);
                  }}
                  secureTextEntry
                />
              </Animated.View>
              
              <Animated.View style={{ opacity: errorOpacity }}>
                {(localError || error) && (
                  <Text style={styles.error}>{localError || error}</Text>
                )}
              </Animated.View>
              
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRegister}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  disabled={loading}
                  activeOpacity={0.7}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>ЗАРЕЄСТРУВАТИСЬ</Text>
                  )}
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>або</Text>
                <View style={styles.dividerLine} />
              </View>

              <Animated.View style={{ transform: [{ scale: googleButtonScale }] }}>
                <TouchableOpacity
                  style={[styles.oauthButton, styles.googleButton]}
                  onPress={handleGoogleRegister}
                  onPressIn={handleGooglePressIn}
                  onPressOut={handleGooglePressOut}
                  activeOpacity={0.7}
                >
                  <FontAwesome name="google" size={20} color="#fff" />
                  <Text style={styles.oauthButtonText}>Зареєструватись з Google</Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View style={{ transform: [{ scale: appleButtonScale }] }}>
                <TouchableOpacity
                  style={[styles.oauthButton, styles.appleButton]}
                  onPress={handleAppleRegister}
                  onPressIn={handleApplePressIn}
                  onPressOut={handleApplePressOut}
                  activeOpacity={0.7}
                >
                  <FontAwesome name="apple" size={20} color="#fff" />
                  <Text style={styles.oauthButtonText}>Зареєструватись з Apple</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
            
            <View style={styles.footer}>
              <Text style={styles.footerText}>Вже маєте акаунт?</Text>
              <TouchableOpacity onPress={handleNavigateToLogin}>
                <Text style={styles.link}>УВІЙТИ</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default RegisterView;