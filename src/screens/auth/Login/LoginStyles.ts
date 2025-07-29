import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
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
    backgroundColor: 'rgba(15, 15, 15, 0.7)',
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
    marginBottom: 16,
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
  errorInput: {
    borderBottomColor: '#FF6B6B',
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
    backgroundColor: 'rgba(147, 112, 219, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 10,
    fontSize: 12,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 16,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  oauthButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
    textAlign: 'center',
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
    color: '#9370DB',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default LoginStyles;