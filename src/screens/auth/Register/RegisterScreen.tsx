import React from 'react';
import RegisterView from './RegisterView';
import useRegisterLogic from './useRegisterLogic';
import useRegisterAnimations from './useRegisterAnimations';
import RegisterStyles from './RegisterStyles';

const RegisterScreen = () => {
  const {
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
    setEmailError,
    setPasswordError,
    setConfirmPasswordError
  } = useRegisterLogic();

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
  } = useRegisterAnimations();

  return (
    <RegisterView
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      loading={loading}
      error={error}
      localError={localError}
      emailError={emailError}
      passwordError={passwordError}
      confirmPasswordError={confirmPasswordError}
      handleRegister={handleRegister}
      handleNavigateToLogin={handleNavigateToLogin}
      handleGoogleRegister={handleGoogleRegister}
      handleAppleRegister={handleAppleRegister}
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
      styles={RegisterStyles}
      setEmailError={setEmailError}
      setPasswordError={setPasswordError}
      setConfirmPasswordError={setConfirmPasswordError}
    />
  );
};

export default RegisterScreen;