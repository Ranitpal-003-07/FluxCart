/* eslint-disable no-unused-vars */
import{ useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorMode,
  useColorModeValue,
  Badge,
  SimpleGrid,
  Divider,
  IconButton,
  chakra,
} from '@chakra-ui/react';
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Eye,
  Zap,
  Shield,
  ArrowRight,
  Sun,
  Moon,
  Play,
  CheckCircle,
  Target,
  Layers,
  Sparkles
} from 'lucide-react';
import { keyframes } from '@emotion/react';
import FeatureCard from '../components/FeatureCard';
import StatCard from '../components/StatCard';
import TestimonialCard from '../components/TestimonialCard';
import Footer from '../components/Footer';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;


export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const bgGradient = useColorModeValue(
    'linear-gradient(-45deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(-45deg, #232526 0%, #414345 100%)'
  );
  
  const textGradient = useColorModeValue(
    'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(45deg, #667eea 0%, #f093fb 100%)'
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDashboardClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleStartTrialClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const handleScheduleDemoClick = () => {
    navigate('/how-to-use');
  };

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep dive into your e-commerce metrics with AI-powered insights and predictive analytics that help you make data-driven decisions.",
      delay: 0
    },
    {
      icon: TrendingUp,
      title: "Revenue Optimization",
      description: "Identify revenue opportunities and optimize your sales funnel with intelligent recommendations and conversion tracking.",
      delay: 0.2
    },
    {
      icon: Users,
      title: "Customer Intelligence",
      description: "Understand your customers better with behavioral analytics, segmentation, and lifetime value predictions.",
      delay: 0.4
    },
    {
      icon: Target,
      title: "Performance Tracking",
      description: "Monitor KPIs in real-time with customizable dashboards and automated reporting for stakeholders.",
      delay: 0.6
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption, GDPR compliance, and SOC2 certification.",
      delay: 0.8
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process millions of data points in seconds with our optimized infrastructure and real-time processing.",
      delay: 1.0
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Head of Growth, TechCorp",
      content: "FluxCart transformed our analytics game. We increased revenue by 40% in just 3 months using their insights.",
      avatar: "SC"
    },
    {
      name: "Marcus Johnson",
      role: "CEO, RetailFlow",
      content: "The predictive analytics helped us optimize inventory and reduce costs by $2M annually. Absolutely game-changing.",
      avatar: "MJ"
    },
    {
      name: "Elena Rodriguez",
      role: "VP Analytics, Commerce+",
      content: "Best analytics platform we've used. The UI is intuitive and the insights are actionable. Highly recommended.",
      avatar: "ER"
    }
  ];

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Navigation */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={useColorModeValue('rgba(255,255,255,0.8)', 'rgba(26,32,44,0.8)')}
        backdropFilter="blur(10px)"
        borderBottom="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container maxW="7xl">
          <Flex h={16} align="center" justify="space-between">
            <HStack spacing={2}>
              <Box
                w={10}
                h={10}
                borderRadius="xl"
                bg="blue.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                animation={`${pulse} 2s infinite`}
              >
                <Icon as={Layers} color="white" boxSize={6} />
              </Box>
              <Heading size="lg" fontWeight="bold">
                <chakra.span
                  bgGradient={textGradient}
                  bgClip="text"
                  backgroundSize="200% 200%"
                  animation={`${gradient} 3s ease infinite`}
                >
                  FluxCart
                </chakra.span>
              </Heading>
            </HStack>
            
            <HStack spacing={6}>
              <IconButton
                aria-label="Toggle theme"
                icon={colorMode === 'light' ? <Moon /> : <Sun />}
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
              />
              <Button 
                colorScheme="green" 
                size="sm"
                onClick={handleDashboardClick}
              >
                Dashboard
              </Button>
              <Button 
                colorScheme="blue" 
                size="sm"
                onClick={handleLoginClick}
              >
                Log In
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        pt={32}
        pb={20}
        bgGradient={bgGradient}
        backgroundSize="400% 400%"
        animation={`${gradient} 15s ease infinite`}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="7xl">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="center">
            <VStack spacing={8} align="start">
              <Badge
                colorScheme="blue"
                px={4}
                py={2}
                borderRadius="full"
                fontSize="sm"
                fontWeight="medium"
              >
                <HStack spacing={2}>
                  <Icon as={Sparkles} boxSize={4} />
                  <Text>New: AI-Powered Insights</Text>
                </HStack>
              </Badge>
              
              <Heading
                size="3xl"
                fontWeight="black"
                lineHeight="shorter"
                color="white"
              >
                Transform Your
                <br />
                <chakra.span
                  bgGradient="linear(to-r, cyan.400, blue.400, purple.400)"
                  bgClip="text"
                  animation={`${gradient} 3s ease infinite`}
                  backgroundSize="200% 200%"
                >
                  E-commerce Analytics
                </chakra.span>
              </Heading>
              
              <Text fontSize="xl" color="gray.100" lineHeight="tall" maxW="lg">
                Unlock the power of your data with FluxCart's AI-driven analytics platform. 
                Make smarter decisions, optimize performance, and accelerate growth.
              </Text>
              
              <HStack spacing={4}>
                <Button
                  size="lg"
                  colorScheme="blue"
                  rightIcon={<ArrowRight />}
                  _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
                  transition="all 0.3s ease"
                  onClick={handleStartTrialClick}
                >
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="white"
                  borderColor="white"
                  leftIcon={<Play />}
                  _hover={{ bg: 'whiteAlpha.200' }}
                  onClick={handleScheduleDemoClick}
                >
                  Watch Demo
                </Button>
              </HStack>
              
              <HStack spacing={8} pt={4}>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="white">10K+</Text>
                  <Text fontSize="sm" color="gray.300">Active Users</Text>
                </VStack>
                <Divider orientation="vertical" h={12} />
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="white">$2B+</Text>
                  <Text fontSize="sm" color="gray.300">Revenue Tracked</Text>
                </VStack>
                <Divider orientation="vertical" h={12} />
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold" color="white">99.9%</Text>
                  <Text fontSize="sm" color="gray.300">Uptime</Text>
                </VStack>
              </HStack>
            </VStack>
            
            <Box position="relative">
              <SimpleGrid columns={2} spacing={4} transform="rotate(12deg)">
                <StatCard
                  icon={ShoppingCart}
                  label="Total Sales"
                  value="$47.2K"
                  change="12.5%"
                  isPositive={true}
                />
                <StatCard
                  icon={Users}
                  label="New Customers"
                  value="1,247"
                  change="8.2%"
                  isPositive={true}
                />
                <StatCard
                  icon={Eye}
                  label="Page Views"
                  value="89.4K"
                  change="15.7%"
                  isPositive={true}
                />
                <StatCard
                  icon={TrendingUp}
                  label="Conversion Rate"
                  value="3.42%"
                  change="2.1%"
                  isPositive={true}
                />
              </SimpleGrid>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="7xl" py={20}>
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center" maxW="3xl">
            <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
              Features
            </Badge>
            <Heading size="2xl" fontWeight="bold">
              Everything you need to
              <chakra.span color="blue.500"> dominate </chakra.span>
              your market
            </Heading>
            <Text fontSize="lg" color="gray.600" lineHeight="tall">
              Our comprehensive suite of analytics tools gives you the insights and intelligence 
              to outperform competitors and maximize revenue.
            </Text>
          </VStack>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Social Proof */}
      <Box bg={useColorModeValue('white', 'gray.800')} py={16}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <VStack spacing={4} textAlign="center">
              <Text fontSize="sm" color="gray.500" fontWeight="medium" textTransform="uppercase" letterSpacing="wide">
                Trusted by industry leaders
              </Text>
              <HStack spacing={8} opacity={0.6}>
                <Text fontSize="2xl" fontWeight="bold">SHOPIFY</Text>
                <Text fontSize="2xl" fontWeight="bold">AMAZON</Text>
                <Text fontSize="2xl" fontWeight="bold">BIGCOMMERCE</Text>
                <Text fontSize="2xl" fontWeight="bold">WOOCOMMERCE</Text>
              </HStack>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        bgGradient={bgGradient}
        backgroundSize="400% 400%"
        animation={`${gradient} 15s ease infinite`}
        py={20}
      >
        <Container maxW="4xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="2xl" color="white" fontWeight="bold">
              Ready to supercharge your analytics?
            </Heading>
            <Text fontSize="xl" color="gray.100" maxW="2xl">
              Join thousands of businesses already using FluxCart to make data-driven decisions 
              and accelerate their growth.
            </Text>
            
            <HStack spacing={4}>
              <Button
                size="lg"
                colorScheme="blue"
                bg="white"
                color="blue.600"
                _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
                rightIcon={<ArrowRight />}
                onClick={handleStartTrialClick}
              >
                Start Your Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="white"
                borderColor="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={handleScheduleDemoClick}
              >
                Schedule Demo
              </Button>
            </HStack>
            
            <HStack spacing={4} pt={4}>
              <Icon as={CheckCircle} color="green.400" />
              <Text color="gray.200" fontSize="sm">14-day free trial</Text>
              <Icon as={CheckCircle} color="green.400" />
              <Text color="gray.200" fontSize="sm">No credit card required</Text>
              <Icon as={CheckCircle} color="green.400" />
              <Text color="gray.200" fontSize="sm">Cancel anytime</Text>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Footer/>
    </Box>
  );
}