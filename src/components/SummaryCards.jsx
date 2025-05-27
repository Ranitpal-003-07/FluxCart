/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
import {
  HStack,
  VStack,
  Text,
  useDisclosure,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  Card,
  CardBody,
  SimpleGrid,
  Box,
  Heading,
  Divider,
  Flex,
  Icon,
  useColorModeValue,
  IconButton,
  useColorMode,
  Container,
} from '@chakra-ui/react';
import { TrendingUp, DollarSign, ShoppingCart, Target, Package, AlertTriangle, Sun, Moon } from 'lucide-react';
import productData from '../products.json';

const SummaryCards = () => {
  const [products, setProducts] = useState(productData);
  const [selectedCategories, setSelectedCategories] = useState(['Electronics', 'Fashion', 'Home']);
  const { colorMode, toggleColorMode } = useColorMode();

  // Filtered and processed data
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategories.includes(product.category);
      return matchesCategory;
    });
  }, [products, selectedCategories]);

  // Chart data processing for categories
  const chartData = useMemo(() => {
    const categoryData = selectedCategories.map(category => {
      const categoryProducts = filteredProducts.filter(p => p.category === category);
      const totalRevenue = categoryProducts.reduce((sum, p) => sum + (p.price * p.unitsSold), 0);
      const totalUnits = categoryProducts.reduce((sum, p) => sum + p.unitsSold, 0);
      const avgPrice = categoryProducts.length > 0 ? categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length : 0;
      
      return {
        category,
        revenue: totalRevenue,
        units: totalUnits,
        avgPrice: Math.round(avgPrice),
        products: categoryProducts.length,
        lowStock: categoryProducts.filter(p => p.inStock < 15).length
      };
    });
    return categoryData;
  }, [filteredProducts, selectedCategories]);

  // Overall summary metrics
  const overallMetrics = useMemo(() => {
    const totalRevenue = filteredProducts.reduce((sum, p) => sum + (p.price * p.unitsSold), 0);
    const totalUnits = filteredProducts.reduce((sum, p) => sum + p.unitsSold, 0);
    const avgPrice = filteredProducts.length > 0 ? filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length : 0;
    const bestCategory = chartData.reduce((max, cat) => cat.revenue > max.revenue ? cat : max, chartData[0] || { category: 'N/A', revenue: 0 });
    
    return {
      totalRevenue,
      totalUnits,
      avgPrice: Math.round(avgPrice),
      bestCategory: bestCategory?.category || 'N/A',
      lowStockItems: filteredProducts.filter(p => p.inStock < 15).length,
      totalProducts: filteredProducts.length
    };
  }, [filteredProducts, chartData]);

  // Theme-aware color values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtleTextColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Elegant pastel gradients for light and dark modes
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

  const StatCard = ({ label, value, icon, gradientKey, isLarge = false, suffix = '', prefix = '' }) => (
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
        transform: 'translateY(-4px) scale(1.02)',
        boxShadow: useColorModeValue(
          "0 8px 30px rgba(0,0,0,0.12)", 
          "0 8px 30px rgba(0,0,0,0.4)"
        ),
      }}
    >
      <CardBody p={6}>
        <VStack spacing={3} align="stretch">
          <Flex justify="space-between" align="center">
            <Text 
              fontSize="xs" 
              fontWeight="600" 
              color={subtleTextColor}
              textTransform="uppercase" 
              letterSpacing="wider"
            >
              {label}
            </Text>
            <Icon 
              as={icon} 
              color={useColorModeValue("gray.600", "gray.400")} 
              boxSize={isLarge ? 7 : 5} 
            />
          </Flex>
          <Text
            fontSize={isLarge ? "3xl" : "2xl"}
            fontWeight="700"
            color={textColor}
            letterSpacing="tight"
          >
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );

  const CategoryCard = ({ category, data, gradientKey }) => (
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

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        <VStack spacing={10} align="stretch">
          {/* Theme Toggle Header */}
          <Flex justify="space-between" align="center">
            <Box />
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <Moon /> : <Sun />}
              onClick={toggleColorMode}
              variant="ghost"
              size="lg"
              borderRadius="full"
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={useColorModeValue(
                "0 2px 10px rgba(0,0,0,0.1)", 
                "0 2px 10px rgba(0,0,0,0.3)"
              )}
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: useColorModeValue(
                  "0 4px 20px rgba(0,0,0,0.15)", 
                  "0 4px 20px rgba(0,0,0,0.4)"
                ),
              }}
              transition="all 0.2s"
            />
          </Flex>

          {/* Overall Summary Section */}
          <Box>
            <Heading
              size="2xl"
              mb={8}
              color={textColor}
              textAlign="center"
              fontWeight="800"
              letterSpacing="tight"
            >
              Performance Dashboard
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 6 }} spacing={6}>
              <StatCard
                label="Total Revenue"
                value={overallMetrics.totalRevenue}
                icon={DollarSign}
                gradientKey="revenue"
                prefix="$"
                isLarge
              />
              
              <StatCard
                label="Units Sold"
                value={overallMetrics.totalUnits}
                icon={ShoppingCart}
                gradientKey="units"
                isLarge
              />
              
              <StatCard
                label="Average Price"
                value={overallMetrics.avgPrice}
                icon={Target}
                gradientKey="price"
                prefix="$"
              />
              
              <StatCard
                label="Best Category"
                value={overallMetrics.bestCategory}
                icon={TrendingUp}
                gradientKey="overall"
              />
              
              <StatCard
                label="Total Products"
                value={overallMetrics.totalProducts}
                icon={Package}
                gradientKey="stock"
              />
              
              <StatCard
                label="Low Stock Alert"
                value={`${overallMetrics.lowStockItems} items`}
                icon={AlertTriangle}
                gradientKey="alert"
              />
            </SimpleGrid>
          </Box>

          {/* Elegant Divider */}
          <Box>
            <Divider 
              borderColor={borderColor}
              borderWidth="1px" 
              opacity={0.6}
              my={6}
            />
          </Box>

          {/* Category-wise Summary Section */}
          <Box>
            <Heading
              size="2xl"
              mb={8}
              color={textColor}
              textAlign="center"
              fontWeight="800"
              letterSpacing="tight"
            >
              Category Breakdown
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {chartData.map((categoryData, index) => (
                <CategoryCard
                  key={categoryData.category}
                  category={categoryData.category}
                  data={categoryData}
                  gradientKey={
                    categoryData.category === 'Electronics' ? 'electronics' :
                    categoryData.category === 'Fashion' ? 'fashion' : 'home'
                  }
                />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default SummaryCards;