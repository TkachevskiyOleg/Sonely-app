import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(auth)/Login',
};

export default function RootLayout() {
  // Використовуємо системні шрифти замість SpaceMono
  const [fontsLoaded] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#000' 
      }}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ 
        flex: 1, 
        backgroundColor: '#000' 
      }}>
        <StatusBar style="light" />
        <LinearGradient
          colors={['rgba(0,0,0,0.9)', 'rgba(20,20,20,1)']}
          style={{ flex: 1 }}
        >
          {user ? <Slot /> : <AuthNavigator />}
        </LinearGradient>
      </View>
    </ThemeProvider>
  );
}

function AuthNavigator() {
  return (
    <Stack
      screenOptions={{ 
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent',
        }
      }}
    >
      <Stack.Screen name="auth/Login" />
      <Stack.Screen name="auth/Register" />
    </Stack>
  );
}