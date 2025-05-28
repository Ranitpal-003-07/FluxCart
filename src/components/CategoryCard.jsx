/* eslint-disable no-unused-vars */
import {
  VStack,
  Text,
  Badge,
  Card,
  CardBody,
  SimpleGrid,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';




const CategoryCard = ({ category, data, gradientKey }) =>{

      //background  and text colors
      const cardBg = useColorModeValue('white', 'gray.800');
      const textColor = useColorModeValue('gray.800', 'white');
      const subtleTextColor = useColorModeValue('gray.600', 'gray.300');
      
      //Gradient colors
      const lightGradients = {
        revenue: 'linear(135deg, #FFE5F1 0%, #FFE5E5 50%, #E5F3FF 100%)',
        units: 'linear(135deg, #E5F8FF 0%, #E5F0FF 50%, #F0E5FF 100%)',
        price: 'linear(135deg, #F0FFE5 0%, #E5FFF0 50%, #E5FFFA 100%)',
        overall: 'linear(135deg, #FFE5E5 0%, #E5E5FF 50%, #E5FFE5 100%)',
        stock: 'linear(135deg, #FFF0E5 0%, #FFFFE5 50%, #F0FFE5 100%)',
        alert: 'linear(135deg, #FFE5E5 0%, #FFF0E5 50%, #FFE5F0 100%)',
        electronics: 'linear(135deg, #E5F0FF 0%, #F0E5FF 50%, #FFE5F0 100%)',
        fashion: 'linear(135deg, #FFE5F0 0%, #E5FFF0 50%, #E5F0FF 100%)',
        home: 'linear(135deg, #E5FFF0 0%, #F0FFE5 50%, #FFE5E5 100%)',
      };
    
      const darkGradients = {
        revenue: 'linear(135deg, #2D1B3D 0%, #3D2D1B 50%, #1B3D2D 100%)',
        units: 'linear(135deg, #1B2D3D 0%, #2D1B3D 50%, #3D1B2D 100%)',
        price: 'linear(135deg, #2D3D1B 0%, #1B3D2D 50%, #1B2D3D 100%)',
        overall: 'linear(135deg, #3D1B1B 0%, #1B1B3D 50%, #1B3D1B 100%)',
        stock: 'linear(135deg, #3D2D1B 0%, #3D3D1B 50%, #2D3D1B 100%)',
        alert: 'linear(135deg, #3D1B1B 0%, #3D2D1B 50%, #3D1B2D 100%)',
        electronics: 'linear(135deg, #1B2D3D 0%, #2D1B3D 50%, #3D1B2D 100%)',
        fashion: 'linear(135deg, #3D1B2D 0%, #1B3D2D 50%, #1B2D3D 100%)',
        home: 'linear(135deg, #1B3D2D 0%, #2D3D1B 50%, #3D1B1B 100%)',
    };
    
    const gradients = useColorModeValue(lightGradients, darkGradients);
    
    
    return(
    <Card
      bg={cardBg}
      bgGradient={gradients[gradientKey]}
      borderRadius="2xl"
      boxShadow={useColorModeValue(
        "0 4px 20px rgba(0,0,0,0.08)", 
        "0 4px 20px rgba(0,0,0,0.3)"
      )}
      border="1px solid"
      borderColor={useColorModeValue("white", "gray.700")}
      backdropFilter="blur(10px)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: 'translateY(-6px) scale(1.03)',
        boxShadow: useColorModeValue(
          "0 12px 40px rgba(0,0,0,0.15)", 
          "0 12px 40px rgba(0,0,0,0.5)"
        ),
      }}
    >
      <CardBody p={6}>
        <VStack spacing={5} align="stretch">
          <Heading 
            size="lg" 
            color={textColor} 
            textAlign="center" 
            fontWeight="700"
            letterSpacing="tight"
          >
            {category}
          </Heading>
          
          <SimpleGrid columns={2} spacing={4}>
            <VStack spacing={1}>
              <Text 
                fontSize="xs" 
                color={subtleTextColor} 
                textTransform="uppercase" 
                letterSpacing="wider"
                fontWeight="600"
              >
                Revenue
              </Text>
              <Text fontSize="lg" fontWeight="700" color={textColor}>
                ${data.revenue.toLocaleString()}
              </Text>
            </VStack>
            
            <VStack spacing={1}>
              <Text 
                fontSize="xs" 
                color={subtleTextColor} 
                textTransform="uppercase" 
                letterSpacing="wider"
                fontWeight="600"
              >
                Units Sold
              </Text>
              <Text fontSize="lg" fontWeight="700" color={textColor}>
                {data.units.toLocaleString()}
              </Text>
            </VStack>
            
            <VStack spacing={1}>
              <Text 
                fontSize="xs" 
                color={subtleTextColor} 
                textTransform="uppercase" 
                letterSpacing="wider"
                fontWeight="600"
              >
                Avg Price
              </Text>
              <Text fontSize="lg" fontWeight="700" color={textColor}>
                ${data.avgPrice}
              </Text>
            </VStack>
            
            <VStack spacing={1}>
              <Text 
                fontSize="xs" 
                color={subtleTextColor} 
                textTransform="uppercase" 
                letterSpacing="wider"
                fontWeight="600"
              >
                Low Stock
              </Text>
              <Badge
                colorScheme={data.lowStock > 0 ? "red" : "green"}
                variant={useColorModeValue("subtle", "solid")}
                borderRadius="full"
                px={3}
                py={1}
                fontSize="xs"
                fontWeight="600"
              >
                {data.lowStock} items
              </Badge>
            </VStack>
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  );
}

export default CategoryCard;
