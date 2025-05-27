import {
  Flex,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
 
} from '@chakra-ui/react';




const StatCard = ({ icon, label, value, change, isPositive }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Card bg={cardBg} borderWidth="1px" borderColor={borderColor} shadow="lg">
      <CardBody>
        <Stat>
          <Flex justify="space-between" align="center" mb={2}>
            <StatLabel fontSize="sm" color="gray.500">
              {label}
            </StatLabel>
            <Icon as={icon} color="blue.500" boxSize={5} />
          </Flex>
          <StatNumber fontSize="2xl" fontWeight="bold">
            {value}
          </StatNumber>
          <StatHelpText mb={0}>
            <StatArrow type={isPositive ? 'increase' : 'decrease'} />
            {change}
          </StatHelpText>
        </Stat>
      </CardBody>
    </Card>
  );
};

export default StatCard;