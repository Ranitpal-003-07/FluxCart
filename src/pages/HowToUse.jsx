import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  Card,
  CardBody,
  Icon,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
  useColorModeValue,
  AspectRatio,
  SimpleGrid,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tag,
  TagLabel,
  CircularProgress,
  useDisclosure,
  CircularProgressLabel
} from '@chakra-ui/react';
import { 
  FiPlay, 
  FiPlus, 
  FiEdit3, 
  FiTag, 
  FiUsers,
  FiTrendingUp,
  FiZap,
  FiShield,
  FiSmartphone,
  FiRefreshCw,
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiBookOpen,
  FiHelpCircle,
  FiArrowUp
} from 'react-icons/fi';

const HowToUse = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [demoProgress, setDemoProgress] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, gray.900, blue.900, purple.900)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Simulate demo progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const heroStats = [
    { label: 'Active Users', value: '2.4M+', icon: FiUsers, color: 'blue' },
    { label: 'Conversion Rate', value: '+47%', icon: FiTrendingUp, color: 'green' },
    { label: 'Load Time', value: '0.8s', icon: FiZap, color: 'yellow' },
    { label: 'Uptime', value: '99.9%', icon: FiShield, color: 'purple' }
  ];

  const steps = [
    {
      id: 1,
      title: 'Adding Products',
      icon: FiPlus,
      description: 'Seamlessly add products with drag-and-drop or single-click functionality',
      details: 'Click any product or drag directly into your cart. Our intelligent system recognizes product variants and applies smart defaults.',
      color: 'blue',
      duration: '5 seconds'
    },
    {
      id: 2,
      title: 'Managing Items',
      icon: FiEdit3,
      description: 'Edit quantities, variants, and remove items with intuitive controls',
      details: 'Adjust quantities with precise controls, change colors and sizes, or remove items instantly with visual feedback.',
      color: 'green',
      duration: '10 seconds'
    },
    {
      id: 3,
      title: 'Discounts & Coupons',
      icon: FiTag,
      description: 'Apply promotional codes with real-time validation and pricing updates',
      details: 'Enter coupon codes and see instant price calculations. Stack multiple discounts where applicable.',
      color: 'orange',
      duration: '8 seconds'
    },
    {
      id: 4,
      title: 'Checkout Process',
      icon: FiArrowUp,
      description: 'Complete purchases with our streamlined one-click checkout system',
      details: 'Secure, fast checkout with saved payment methods and shipping preferences for returning customers.',
      color: 'purple',
      duration: '15 seconds'
    }
  ];

  const proTips = [
    { 
      title: 'Keyboard Shortcuts', 
      tip: 'Press DEL to remove selected items, CTRL+A to select all',
      icon: FiZap 
    },
    { 
      title: 'Auto-Save Feature', 
      tip: 'Your cart automatically saves between sessions across all devices',
      icon: FiRefreshCw 
    },
    { 
      title: 'Mobile Optimization', 
      tip: 'Swipe left on items for quick actions, pinch to zoom product images',
      icon: FiSmartphone 
    },
    { 
      title: 'Bulk Operations', 
      tip: 'Select multiple items and apply bulk actions like quantity changes',
      icon: FiCopy 
    }
  ];

  const faqData = [
    {
      question: 'Can I recover deleted items?',
      answer: 'Yes! Flux Cart maintains a 30-day history of removed items. Access your item history from the cart menu to restore any accidentally deleted products.'
    },
    {
      question: 'How do I share my cart with others?',
      answer: 'Click the share icon in your cart to generate a secure link. Recipients can view your cart and optionally add items to their own cart or complete the purchase.'
    },
    {
      question: 'What browsers are supported?',
      answer: 'Flux Cart works on all modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. Mobile browsers are fully supported with touch optimizations.'
    },
    {
      question: 'How does multi-device sync work?',
      answer: 'When signed in, your cart syncs instantly across all devices using secure cloud storage. Changes made on one device appear immediately on others.'
    },
    {
      question: 'Are there any usage limits?',
      answer: 'Free accounts can save up to 50 items per cart with 5 saved carts. Premium accounts have unlimited items and saved carts with advanced features.'
    }
  ];




  return (
    <Box minH="100vh" bg={bgGradient}>
      {/* Hero Section */}
      <Container maxW="7xl" pt={20} pb={16}>
        <VStack spacing={8} textAlign="center">
          <Badge 
            colorScheme="purple" 
            fontSize="sm" 
            px={4} 
            py={2} 
            borderRadius="full"
            fontWeight="600"
          >
            ✨ New Release v3.0
          </Badge>
          
          <Heading 
            size="3xl" 
            fontWeight="800" 
            bgGradient="linear(to-r, blue.600, purple.600, pink.600)"
            bgClip="text"
            lineHeight="1.1"
          >
            Master Flux Cart in
            <Text as="span" color="purple.500"> 60 Seconds</Text>
          </Heading>
          
          <Text 
            fontSize="xl" 
            color={textColor} 
            maxW="2xl" 
            fontWeight="500"
            lineHeight="1.6"
          >
            The intuitive shopping experience, demystified. Built for developers, 
            loved by users, trusted by enterprises worldwide.
          </Text>

          <HStack spacing={4} flexWrap="wrap" justify="center">
            <Button 
              size="lg" 
              colorScheme="blue" 
              leftIcon={<Icon as={FiPlay} />}
              onClick={onOpen}
              shadow="lg"
              _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
              transition="all 0.2s"
            >
              Watch Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              leftIcon={<Icon as={FiBookOpen} />}
              _hover={{ bg: 'white', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              Read Guide
            </Button>
          </HStack>

          {/* Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} w="full" mt={12}>
            {heroStats.map((stat, index) => (
              <Card key={index} bg={cardBg} shadow="lg" borderRadius="xl">
                <CardBody textAlign="center" py={6}>
                  <Icon 
                    as={stat.icon} 
                    boxSize={8} 
                    color={`${stat.color}.500`} 
                    mb={3}
                  />
                  <Text fontSize="2xl" fontWeight="bold" color={`${stat.color}.500`}>
                    {stat.value}
                  </Text>
                  <Text fontSize="sm" color={textColor} fontWeight="500">
                    {stat.label}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Video Demo Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(10px)" />
        <ModalContent bg={cardBg} borderRadius="2xl" overflow="hidden">
          <ModalHeader pb={2}>
            <HStack>
              <Icon as={FiPlay} color="blue.500" />
              <Text>Flux Cart Demo</Text>
              <Badge colorScheme="green" ml="auto">HD Quality</Badge>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <AspectRatio ratio={16/9} bg="gray.900">
              <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                flexDir="column"
                color="white"
                textAlign="center"
                p={8}
              >
                <CircularProgress value={demoProgress} color="blue.400" size="120px" mb={4}>
                  <CircularProgressLabel fontSize="lg" fontWeight="bold">
                    {Math.round(demoProgress)}%
                  </CircularProgressLabel>
                </CircularProgress>
                <Text fontSize="xl" mb={2} fontWeight="600">Demo Loading...</Text>
                <Text color="gray.400">
                  In a real implementation, this would be a video player
                </Text>
              </Box>
            </AspectRatio>
            
            {/* Video Chapters */}
            <Box p={6} bg="gray.50">
              <Text fontWeight="600" mb={3}>Video Chapters</Text>
              <HStack spacing={4} flexWrap="wrap">
                <Tag size="md" colorScheme="blue" borderRadius="full">
                  <TagLabel>Intro - 0:00</TagLabel>
                </Tag>
                <Tag size="md" colorScheme="green" borderRadius="full">
                  <TagLabel>Adding Items - 0:15</TagLabel>
                </Tag>
                <Tag size="md" colorScheme="orange" borderRadius="full">
                  <TagLabel>Managing Cart - 0:30</TagLabel>
                </Tag>
                <Tag size="md" colorScheme="purple" borderRadius="full">
                  <TagLabel>Checkout - 0:45</TagLabel>
                </Tag>
              </HStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Step-by-Step Guide */}
      <Container maxW="7xl" py={20}>
        <VStack spacing={16}>
          <VStack textAlign="center" spacing={4}>
            <Heading size="2xl" fontWeight="700">
              Master Every Feature
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl">
              Follow our comprehensive guide to unlock the full potential of Flux Cart
            </Text>
          </VStack>

          <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={8} w="full">
            {/* Step Navigation */}
            <VStack spacing={4} align="stretch">
              {steps.map((step, index) => (
                <Card 
                  key={step.id}
                  bg={activeStep === index ? `${step.color}.50` : cardBg}
                  borderColor={activeStep === index ? `${step.color}.200` : borderColor}
                  borderWidth="2px"
                  cursor="pointer"
                  onClick={() => setActiveStep(index)}
                  transition="all 0.2s"
                  _hover={{ 
                    transform: 'translateX(4px)', 
                    shadow: 'lg',
                    borderColor: `${step.color}.300`
                  }}
                >
                  <CardBody>
                    <HStack>
                      <Box
                        bg={activeStep === index ? `${step.color}.500` : 'gray.100'}
                        color={activeStep === index ? 'white' : 'gray.600'}
                        p={3}
                        borderRadius="lg"
                      >
                        <Icon as={step.icon} boxSize={5} />
                      </Box>
                      <VStack align="start" spacing={1} flex={1}>
                        <Text fontWeight="600" fontSize="sm">
                          Step {step.id}
                        </Text>
                        <Text fontWeight="700" lineHeight="1.2">
                          {step.title}
                        </Text>
                        <Badge colorScheme={step.color} size="sm">
                          {step.duration}
                        </Badge>
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>

            {/* Step Content */}
            <Card bg={cardBg} shadow="xl" borderRadius="2xl" overflow="hidden">
              <CardBody p={8}>
                <VStack align="start" spacing={6}>
                  <HStack>
                    <Box
                      bg={`${steps[activeStep].color}.500`}
                      color="white"
                      p={4}
                      borderRadius="xl"
                    >
                      <Icon as={steps[activeStep].icon} boxSize={8} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color={textColor} fontWeight="500">
                        Step {steps[activeStep].id} of {steps.length}
                      </Text>
                      <Heading size="lg">{steps[activeStep].title}</Heading>
                    </VStack>
                  </HStack>

                  <Progress 
                    value={(activeStep + 1) / steps.length * 100} 
                    colorScheme={steps[activeStep].color}
                    size="sm"
                    borderRadius="full"
                    w="full"
                  />

                  <Text fontSize="lg" color={textColor} lineHeight="1.6">
                    {steps[activeStep].description}
                  </Text>

                  <Box bg="gray.50" p={6} borderRadius="xl" w="full">
                    <Text fontSize="md" color={textColor} lineHeight="1.6">
                      {steps[activeStep].details}
                    </Text>
                  </Box>

                  {/* Demo Animation Placeholder */}
                  <AspectRatio ratio={16/9} w="full">
                    <Box 
                      bg="gradient.100"
                      bgGradient={`linear(45deg, ${steps[activeStep].color}.100, ${steps[activeStep].color}.200)`}
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border="2px dashed"
                      borderColor={`${steps[activeStep].color}.300`}
                    >
                      <VStack>
                        <Icon 
                          as={steps[activeStep].icon} 
                          boxSize={12} 
                          color={`${steps[activeStep].color}.500`}
                        />
                        <Text 
                          fontWeight="600" 
                          color={`${steps[activeStep].color}.600`}
                        >
                          Interactive Demo: {steps[activeStep].title}
                        </Text>
                        <Text fontSize="sm" color={textColor}>
                          Animation would play here in production
                        </Text>
                      </VStack>
                    </Box>
                  </AspectRatio>

                  <HStack justify="space-between" w="full">
                    <Button 
                      variant="outline" 
                      leftIcon={<Icon as={FiArrowRight} transform="rotate(180deg)" />}
                      isDisabled={activeStep === 0}
                      onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                    >
                      Previous
                    </Button>
                    <Button 
                      colorScheme={steps[activeStep].color}
                      rightIcon={<Icon as={FiArrowRight} />}
                      isDisabled={activeStep === steps.length - 1}
                      onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                    >
                      Next Step
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </Grid>
        </VStack>
      </Container>

      {/* Pro Tips Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="7xl">
          <VStack spacing={12}>
            <VStack textAlign="center" spacing={4}>
              <Badge colorScheme="orange" fontSize="sm" px={3} py={1} borderRadius="full">
                💡 Pro Tips
              </Badge>
              <Heading size="2xl" fontWeight="700">
                Power User Secrets
              </Heading>
              <Text fontSize="lg" color={textColor} maxW="2xl">
                Unlock advanced features and workflows that professionals use daily
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
              {proTips.map((tip, index) => (
                <Card 
                  key={index}
                  bg={cardBg}
                  shadow="lg"
                  borderRadius="xl"
                  transition="all 0.2s"
                  _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
                >
                  <CardBody p={6}>
                    <HStack align="start" spacing={4}>
                      <Box
                        bg="blue.500"
                        color="white"
                        p={3}
                        borderRadius="lg"
                      >
                        <Icon as={tip.icon} boxSize={5} />
                      </Box>
                      <VStack align="start" spacing={2} flex={1}>
                        <Text fontWeight="700" fontSize="lg">
                          {tip.title}
                        </Text>
                        <Text color={textColor} lineHeight="1.5">
                          {tip.tip}
                        </Text>
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="4xl">
          <VStack spacing={12}>
            <VStack textAlign="center" spacing={4}>
              <Badge colorScheme="purple" fontSize="sm" px={3} py={1} borderRadius="full">
                ❓ FAQ
              </Badge>
              <Heading size="2xl" fontWeight="700">
                Frequently Asked Questions
              </Heading>
              <Text fontSize="lg" color={textColor}>
                Everything you need to know about Flux Cart
              </Text>
            </VStack>

            <Accordion allowToggle w="full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} border="none" mb={4}>
                  <Card bg={cardBg} shadow="md" borderRadius="xl" overflow="hidden">
                    <AccordionButton p={6} _hover={{ bg: 'gray.50' }}>
                      <HStack flex={1} textAlign="left" spacing={4}>
                        <Icon as={FiHelpCircle} color="purple.500" />
                        <Text fontWeight="600" fontSize="lg">
                          {faq.question}
                        </Text>
                      </HStack>
                      <AccordionIcon color="purple.500" />
                    </AccordionButton>
                    <AccordionPanel px={6} pb={6}>
                      <Text color={textColor} lineHeight="1.6">
                        {faq.answer}
                      </Text>
                    </AccordionPanel>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        </Container>
      </Box>

      
      

      {/* Footer CTA */}
      <Container maxW="7xl" py={20}>
        <Card 
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          color="white"
          shadow="2xl"
          borderRadius="3xl"
          overflow="hidden"
        >
          <CardBody p={16} textAlign="center">
            <VStack spacing={8}>
              <VStack spacing={4}>
                <Heading size="2xl" fontWeight="800">
                  Ready to Transform Your E-commerce?
                </Heading>
                <Text fontSize="xl" opacity={0.9} maxW="2xl">
                  Join thousands of businesses already using Flux Cart to deliver 
                  exceptional shopping experiences.
                </Text>
              </VStack>

              <HStack spacing={4} justify="center" flexWrap="wrap">
                <Button 
                  size="lg"
                  bg="white"
                  color="purple.600"
                  fontWeight="700"
                  px={8}
                  _hover={{ 
                    transform: 'translateY(-2px)', 
                    shadow: 'xl',
                    bg: 'gray.50'
                  }}
                  transition="all 0.2s"
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ 
                    bg: 'whiteAlpha.200',
                    transform: 'translateY(-2px)'
                  }}
                  transition="all 0.2s"
                >
                  Schedule Demo
                </Button>
              </HStack>

              <HStack spacing={8} justify="center" opacity={0.8}>
                <HStack spacing={2}>
                  <Icon as={FiCheck} />
                  <Text fontSize="sm">No setup fees</Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={FiCheck} />
                  <Text fontSize="sm">Cancel anytime</Text>
                </HStack>
                <HStack spacing={2}>
                  <Icon as={FiCheck} />
                  <Text fontSize="sm">24/7 support</Text>
                </HStack>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Container>

    </Box>
  );
};

export default HowToUse;