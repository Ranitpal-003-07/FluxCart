import {
  Box,
  Heading,
  Text,
  VStack,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';


const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;




const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Card
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      shadow="xl"
      _hover={{
        transform: 'translateY(-5px)',
        shadow: '2xl',
        borderColor: 'blue.400'
      }}
      transition="all 0.3s ease"
      animation={`${float} 6s ease-in-out infinite`}
      animationDelay={`${delay}s`}
    >
      <CardBody p={8}>
        <VStack spacing={4} align="start">
          <Box
            p={3}
            borderRadius="xl"
            bg="blue.500"
            color="white"
            animation={`${pulse} 2s infinite`}
          >
            <Icon as={icon} boxSize={6} />
          </Box>
          <Heading size="md" fontWeight="bold">
            {title}
          </Heading>
          <Text color="gray.600" lineHeight="1.7">
            {description}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default FeatureCard;