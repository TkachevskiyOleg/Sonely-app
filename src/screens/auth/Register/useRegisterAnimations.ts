import { Animated } from 'react-native';

const useRegisterAnimations = () => {
  const buttonScale = new Animated.Value(1);
  const googleButtonScale = new Animated.Value(1);
  const appleButtonScale = new Animated.Value(1);
  const inputShake = new Animated.Value(0);
  const errorOpacity = new Animated.Value(0);

  const shakeAnimation = () => {
    inputShake.setValue(0);
    Animated.sequence([
      Animated.timing(inputShake, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(inputShake, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(inputShake, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(inputShake, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true
      })
    ]).start();
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  const handleGooglePressIn = () => {
    Animated.spring(googleButtonScale, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const handleGooglePressOut = () => {
    Animated.spring(googleButtonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  const handleApplePressIn = () => {
    Animated.spring(appleButtonScale, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const handleApplePressOut = () => {
    Animated.spring(appleButtonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  return {
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
    shakeAnimation
  };
};

export default useRegisterAnimations;