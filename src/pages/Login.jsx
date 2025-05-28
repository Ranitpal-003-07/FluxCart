/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Heading,
  Link,
  Divider,
  useColorModeValue,
  Icon,
  HStack,
  Spinner,
  useToast,
  Checkbox,
  IconButton,
  usePrefersReducedMotion
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, LockIcon, EmailIcon } from '@chakra-ui/icons';
import { keyframes } from '@emotion/react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import { signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase'; // update with your firebase config path

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const FloatingElements = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  return (
    <Box position="absolute" inset="0" overflow="hidden" zIndex={0}>
      <Box
        position="absolute"
        top="-150px"
        right="-150px"
        width="300px"
        height="300px"
        borderRadius="50%"
        background="linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
        filter="blur(60px)"
        opacity="0.6"
        animation={prefersReducedMotion ? undefined : `${float} 8s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        bottom="-100px"
        left="-100px"
        width="250px"
        height="250px"
        borderRadius="50%"
        background="linear-gradient(45deg, #f093fb 0%, #f5576c 100%)"
        filter="blur(60px)"
        opacity="0.5"
        animation={prefersReducedMotion ? undefined : `${float} 10s ease-in-out infinite reverse`}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="200px"
        height="200px"
        borderRadius="50%"
        background="linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)"
        filter="blur(80px)"
        opacity="0.4"
        animation={prefersReducedMotion ? undefined : `${float} 12s ease-in-out infinite`}
      />
      
      {!prefersReducedMotion && [...Array(15)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width="2px"
          height="2px"
          background="rgba(255, 255, 255, 0.5)"
          borderRadius="50%"
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
          animation={`${pulse} ${3 + Math.random() * 4}s ease-in-out infinite`}
          animationDelay={`${Math.random() * 2}s`}
        />
      ))}
    </Box>
  );
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();
  const prefersReducedMotion = usePrefersReducedMotion();

  const { signup, login, googleSignIn, user } = useAuth();
  const navigate = useNavigate(); 

  const bgGradient = useColorModeValue(
    'linear(to-br, gray.900, purple.900, gray.900)',
    'linear(to-br, gray.900, purple.900, gray.900)'
  );

  const cardBg = useColorModeValue(
    'rgba(255, 255, 255, 0.05)',
    'rgba(255, 255, 255, 0.05)'
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin && !formData.name) {
      errors.name = 'Name is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed. Please try again.';
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled. Please try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsLoading(true);

  try {
    let userCredential;

    if (isLogin) {
      userCredential = await login(formData.email, formData.password);
    } else {
      userCredential = await signup(formData.email, formData.password);

      // Update display name
      if (formData.name) {
        await updateProfile(userCredential.user, { displayName: formData.name });
      }
    }

    const user = userCredential.user;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || formData.name || '',
        email: user.email,
        createdAt: serverTimestamp(),
        authProvider: 'email',
      });
    }

    toast({
      title: isLogin ? 'Login Successful' : 'Account Created',
      description: isLogin ? 'Welcome back!' : 'Your account has been created successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });

    navigate('/dashboard');
  } catch (error) {
    console.error('Auth error:', error);
    toast({
      title: 'Authentication Error',
      description: getFirebaseErrorMessage(error.code),
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  } finally {
    setIsLoading(false);
  }
};

const handleGoogleSignIn = async () => {
  setIsLoading(true);

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email,
        createdAt: serverTimestamp(),
        authProvider: 'google',
      });
    }

    toast({
      title: 'Google Sign In Successful',
      description: 'Welcome!',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });

    navigate('/dashboard');
  } catch (error) {
    console.error('Google sign-in error:', error);
    toast({
      title: 'Google Sign In Failed',
      description: getFirebaseErrorMessage(error.code),
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  } finally {
    setIsLoading(false);
  }
};


  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      rememberMe: false
    });
    setFormErrors({});
  };

  if (user) {
    navigate('/dashboard');
  }

  return (
    <Box
      minH="100vh"
      bgGradient={bgGradient}
      position="relative"
      overflow="hidden"
    >
      <FloatingElements />
      
      <Container
        maxW="lg"
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
        position="relative"
        zIndex={1}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            {/* Logo/Brand Section */}
            <Box textAlign="center">
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w="16"
                h="16"
                bgGradient="linear(to-r, purple.400, cyan.400)"
                borderRadius="2xl"
                mb="4"
                animation={prefersReducedMotion ? undefined : `${pulse} 2s ease-in-out infinite`}
              >
                <Icon as={LockIcon} color="white" boxSize="8" />
              </Box>
              <Heading
                size="xl"
                color="white"
                bgGradient="linear(to-r, purple.200, cyan.200)"
                bgClip="text"
                animation={prefersReducedMotion ? undefined : `${isLogin ? slideIn : slideInRight} 0.6s ease-out`}
              >
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </Heading>
              <Text color="gray.300" fontSize="lg" mt="2">
                {isLogin ? 'Sign in to your account' : 'Join our community today'}
              </Text>
            </Box>
          </Stack>

          {/* Main Card */}
          <Box
            py={{ base: '8', sm: '12' }}
            px={{ base: '4', sm: '10' }}
            bg={cardBg}
            backdropFilter="blur(20px)"
            borderRadius="3xl"
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              bgGradient: 'linear(to-r, transparent, purple.400, cyan.400, transparent)',
              borderRadius: 'full'
            }}
            transition="all 0.3s ease"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.4)'
            }}
          >
            <Stack spacing="8">
              {/* Google Sign In Button */}
              <Button
                variant="outline"
                size="lg"
                leftIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                bg="white"
                color="gray.700"
                borderColor="gray.300"
                _hover={{
                  bg: 'gray.50',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.2s"
                fontWeight="medium"
                isLoading={isLoading}
                loadingText="Signing in with Google..."
              >
                Continue with Google
              </Button>

              <HStack>
                <Divider borderColor="gray.600" />
                <Text fontSize="sm" color="gray.400" whiteSpace="nowrap">
                  or continue with
                </Text>
                <Divider borderColor="gray.600" />
              </HStack>

              {/*Auth-Form */}
              <Box as="form" onSubmit={handleSubmit}>
                <Stack spacing="6">
                  {!isLogin && (
                    <FormControl isInvalid={formErrors.name}>
                      <FormLabel color="gray.200" fontSize="sm" fontWeight="medium">
                        Full Name
                      </FormLabel>
                      <InputGroup>
                        <Input
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          size="lg"
                          bg="whiteAlpha.50"
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                          color="white"
                          _placeholder={{ color: 'gray.400' }}
                          _hover={{ borderColor: 'purple.400' }}
                          _focus={{
                            borderColor: 'purple.400',
                            boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.3)',
                            bg: 'whiteAlpha.100'
                          }}
                          transition="all 0.2s"
                        />
                        <InputRightElement>
                          <Icon as={FaUser} color="gray.400" />
                        </InputRightElement>
                      </InputGroup>
                      {formErrors.name && (
                        <Text color="red.300" fontSize="sm" mt="1">
                          {formErrors.name}
                        </Text>
                      )}
                    </FormControl>
                  )}

                  <FormControl isInvalid={formErrors.email}>
                    <FormLabel color="gray.200" fontSize="sm" fontWeight="medium">
                      Email Address
                    </FormLabel>
                    <InputGroup>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        size="lg"
                        bg="whiteAlpha.50"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        color="white"
                        _placeholder={{ color: 'gray.400' }}
                        _hover={{ borderColor: 'purple.400' }}
                        _focus={{
                          borderColor: 'purple.400',
                          boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.3)',
                          bg: 'whiteAlpha.100'
                        }}
                        transition="all 0.2s"
                      />
                      <InputRightElement>
                        <Icon as={EmailIcon} color="gray.400" />
                      </InputRightElement>
                    </InputGroup>
                    {formErrors.email && (
                      <Text color="red.300" fontSize="sm" mt="1">
                        {formErrors.email}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl isInvalid={formErrors.password}>
                    <FormLabel color="gray.200" fontSize="sm" fontWeight="medium">
                      Password
                    </FormLabel>
                    <InputGroup>
                      <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        size="lg"
                        bg="whiteAlpha.50"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        color="white"
                        _placeholder={{ color: 'gray.400' }}
                        _hover={{ borderColor: 'purple.400' }}
                        _focus={{
                          borderColor: 'purple.400',
                          boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.3)',
                          bg: 'whiteAlpha.100'
                        }}
                        transition="all 0.2s"
                      />
                      <InputRightElement>
                        <IconButton
                          variant="ghost"
                          color="gray.400"
                          _hover={{ color: 'white' }}
                          aria-label={showPassword ? 'Mask password' : 'Reveal password'}
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputRightElement>
                    </InputGroup>
                    {formErrors.password && (
                      <Text color="red.300" fontSize="sm" mt="1">
                        {formErrors.password}
                      </Text>
                    )}
                  </FormControl>

                  {isLogin && (
                    <HStack justify="space-between">
                      <Checkbox
                        name="rememberMe"
                        isChecked={formData.rememberMe}
                        onChange={handleInputChange}
                        colorScheme="purple"
                      >
                        <Text color="gray.300" fontSize="sm">
                          Remember me
                        </Text>
                      </Checkbox>
                      <Link
                        color="purple.300"
                        fontSize="sm"
                        _hover={{ color: 'purple.200' }}
                      >
                        Forgot password?
                      </Link>
                    </HStack>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    bgGradient="linear(to-r, purple.500, cyan.500)"
                    color="white"
                    _hover={{
                      bgGradient: 'linear(to-r, purple.600, cyan.600)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
                      _before: {
                        left: '100%'
                      }
                    }}
                    _active={{
                      transform: 'translateY(0)'
                    }}
                    isLoading={isLoading}
                    loadingText={isLogin ? 'Signing In...' : 'Creating Account...'}
                    spinner={<Spinner size="sm" />}
                    transition="all 0.2s"
                    fontWeight="semibold"
                    position="relative"
                    overflow="hidden"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      transition: 'left 0.5s',
                    }}
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Button>
                </Stack>
              </Box>

              {/* Toggle-effect */}
              <HStack spacing="1" justify="center">
                <Text color="gray.300" fontSize="sm">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </Text>
                <Button
                  variant="link"
                  color="purple.300"
                  fontSize="sm"
                  fontWeight="semibold"
                  _hover={{ color: 'purple.200' }}
                  onClick={toggleMode}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Button>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}