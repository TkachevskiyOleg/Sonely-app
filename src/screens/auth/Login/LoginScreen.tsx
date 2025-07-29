import React from 'react';
import LoginView from './LoginView';
import useLoginLogic from './useLoginLogic';
import useLoginAnimations from './useLoginAnimations';
import LoginStyles from './LoginStyles';

const LoginScreen = () => {
  const {
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
  } = useLoginLogic();

  const {
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
  } = useLoginAnimations();

  return (
    <LoginView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      loading={loading}
      error={error}
      localError={localError}
      emailError={emailError}
      passwordError={passwordError}
      handleLogin={handleLogin}
      handleNavigateToRegister={handleNavigateToRegister}
      handleGoogleLogin={handleGoogleLogin}
      handleAppleLogin={handleAppleLogin}
      buttonScale={buttonScale}
      googleButtonScale={googleButtonScale}
      appleButtonScale={appleButtonScale}
      inputShake={inputShake}
      errorOpacity={errorOpacity}
      handlePressIn={handlePressIn}
      handlePressOut={handlePressOut}
      handleGooglePressIn={handleGooglePressIn}
      handleGooglePressOut={handleGooglePressOut}
      handleApplePressIn={handleApplePressIn}
      handleApplePressOut={handleApplePressOut}
      shakeAnimation={shakeAnimation}
      styles={LoginStyles}
      setEmailError={setEmailError}
      setPasswordError={setPasswordError}
    />
  );
};

export default LoginScreen;