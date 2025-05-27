/* eslint-disable no-unused-vars */
import {
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  Avatar,
} from '@chakra-ui/react';
import {
 Star,
} from 'lucide-react';





const TestimonialCard = ({ name, role, content, avatar }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} shadow="lg" h="full">
      <CardBody p={6}>
        <VStack spacing={4} align="start" h="full">
          <HStack>
            {[...Array(5)].map((_, i) => (
              <Icon key={i} as={Star} color="yellow.400" boxSize={4} />
            ))}
          </HStack>
          <Text fontStyle="italic" flex="1" lineHeight="1.6">
            "{content}"
          </Text>
          <HStack>
            <Avatar size="sm" name={name} bg="blue.500" />
            <VStack spacing={0} align="start">
              <Text fontWeight="bold" fontSize="sm">
                {name}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {role}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};


export default TestimonialCard;