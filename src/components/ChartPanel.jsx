/* eslint-disable no-unused-vars */
import { useState, useMemo} from 'react';
import {
  Box,
  HStack,
  VStack,
  Select,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  CardHeader,
  Text, 
  useColorModeValue,
  Divider,
  Button,
  Stack,
  Grid,
} from '@chakra-ui/react';
import { 
  ArrowUpIcon,
} from '@chakra-ui/icons';
import { FiTrendingUp, FiBarChart2, FiPieChart } from 'react-icons/fi'; 
import productData from '../products.json';
import RenderChart from './RenderChart';

const ChartPanel = () => {
  
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('purple.500', 'purple.300');
  
  const gradientColors = useColorModeValue(
    {
      primary: 'linear(to-r, purple.400, blue.400)',
      secondary: 'linear(to-r, pink.400, purple.400)',
      tertiary: 'linear(to-r, blue.400, teal.400)'
    },
    {
      primary: 'linear(to-r, purple.300, blue.300)',
      secondary: 'linear(to-r, pink.300, purple.300)',
      tertiary: 'linear(to-r, blue.300, teal.300)'
    }
  );

  const [products, setProducts] = useState(productData);
  const [chartType, setChartType] = useState('bar');
  const [selectedCategories, setSelectedCategories] = useState(['Electronics', 'Fashion', 'Home']);
  const [dateRange, setDateRange] = useState('30');

  // Filtered and processed data
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategories.includes(product.category);
      return matchesCategory;
    });
  }, [products, selectedCategories]);

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
        products: categoryProducts.length
      };
    });
    return categoryData;
  }, [filteredProducts, selectedCategories]);

  const scatterData = useMemo(() => {
    return filteredProducts.map(product => ({
      ...product,
      revenue: product.price * product.unitsSold,
      profitMargin: Math.round((product.price * 0.3) * 100) / 100
    }));
  }, [filteredProducts]);

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: FiBarChart2, gradient: gradientColors.primary },
    { value: 'line', label: 'Line Chart', icon: FiTrendingUp, gradient: gradientColors.secondary },
    { value: 'area', label: 'Area Chart', icon: FiTrendingUp, gradient: gradientColors.tertiary },
    { value: 'pie', label: 'Pie Chart', icon: FiPieChart, gradient: gradientColors.primary },
    { value: 'scatter', label: 'Scatter Plot', icon: ArrowUpIcon, gradient: gradientColors.secondary },
  ];


 

  return (
          <Card 
            bg={cardBg} 
            borderColor={borderColor} 
            shadow="2xl" 
            borderRadius="3xl"
            backdropFilter="blur(10px)"
            overflow="hidden"
          >
            <CardHeader pb={4}>
              <Grid templateColumns={{ base: "1fr", lg: "1fr auto" }} gap={6} alignItems="start">
                
                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  {/* Chart Type Buttons */}
                  <VStack align="start" spacing={2}>
                    <Text fontSize="sm" color={mutedTextColor} fontWeight="600">
                      Visualization Type
                    </Text>
                    <HStack flexWrap="wrap" spacing={2}>
                      {chartTypes.map(type => {
                        const Icon = type.icon;
                        const isActive = chartType === type.value;
                        return (
                          <Button
                            key={type.value}
                            size="sm"
                            variant={isActive ? "solid" : "ghost"}
                            colorScheme="purple"
                            leftIcon={<Icon />}
                            onClick={() => setChartType(type.value)}
                            bgGradient={isActive ? type.gradient : "none"}
                            color={isActive ? "white" : textColor}
                            _hover={{
                              bgGradient: type.gradient,
                              color: "white",
                              transform: "translateY(-1px)"
                            }}
                            transition="all 0.2s"
                            rounded="xl"
                            fontWeight="600"
                          >
                            {type.label}
                          </Button>
                        );
                      })}
                    </HStack>
                  </VStack>
                  
                  {/* Date Range Selector */}
                  <FormControl maxW="200px">
                    <FormLabel fontSize="sm" color={mutedTextColor} fontWeight="600">
                      Time Period
                    </FormLabel>
                    <Select 
                      value={dateRange} 
                      onChange={(e) => setDateRange(e.target.value)}
                      bg={cardBg}
                      borderColor={borderColor}
                      rounded="xl"
                      border="2px solid"
                      _hover={{ borderColor: accentColor }}
                      _focus={{ 
                        borderColor: accentColor, 
                        boxShadow: `0 0 0 1px ${accentColor}` 
                      }}
                    >
                      <option value="7">Last 7 days</option>
                      <option value="30">Last 30 days</option>
                      <option value="90">Last 90 days</option>
                      <option value="365">Last 12 months</option>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
            </CardHeader>
            
            <Divider borderColor={borderColor} />
            
            <CardBody pt={8}>
              <Box 
                p={6} 
                bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.300')} 
                borderRadius="2xl"
                border="1px solid"
                borderColor={borderColor}
                backdropFilter="blur(5px)"
              >
                <RenderChart chartType={chartType} chartData={chartData} scatterData={scatterData}/>
              </Box>
            </CardBody>
          </Card>
  
  );
};

export default ChartPanel;