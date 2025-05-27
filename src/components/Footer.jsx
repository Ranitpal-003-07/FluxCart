import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  useColorModeValue,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
} from '@chakra-ui/react';
import {
  Layers,
} from 'lucide-react';


const Footer = () => {
  return (
    <Box bg={useColorModeValue('gray.900', 'gray.950')} color="white" py={12}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={8}>
            <VStack spacing={4} align="start">
              <HStack spacing={2}>
                <Box
                  w={8}
                  h={8}
                  borderRadius="lg"
                  bg="blue.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={Layers} color="white" boxSize={4} />
                </Box>
                <Heading size="md">FluxCart</Heading>
              </HStack>
              <Text fontSize="sm" color="gray.400" maxW="xs">
                Empowering e-commerce businesses with intelligent analytics and actionable insights.
              </Text>
            </VStack>
            
            <VStack spacing={3} align="start">
              <Heading size="sm">Product</Heading>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Features</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Pricing</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>API</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Documentation</Text>
            </VStack>
            
            <VStack spacing={3} align="start">
              <Heading size="sm">Company</Heading>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>About</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Blog</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Careers</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Contact</Text>
            </VStack>
            
            <VStack spacing={3} align="start">
              <Heading size="sm">Support</Heading>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Help Center</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Community</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Status</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Privacy</Text>
            </VStack>
          </Grid>
          
          <Divider my={8} borderColor="gray.700" />
          
          <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
            <Text fontSize="sm" color="gray.400">
              © 2025 FluxCart. All rights reserved.
            </Text>
            <HStack spacing={6}>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Terms</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Privacy</Text>
              <Text fontSize="sm" color="gray.400" cursor="pointer" _hover={{ color: 'white' }}>Cookies</Text>
            </HStack>
          </Flex>
        </Container>
      </Box>
  )
}

export default Footer
