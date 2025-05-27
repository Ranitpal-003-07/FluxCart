/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from 'react';
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
  Heading,
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Badge,
  IconButton,
  useColorMode,
  useColorModeValue,
  Container,
  Divider,
  Tooltip,
  Button,
  Stack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { 
  MoonIcon, 
  SunIcon, 
  InfoIcon, 
  ArrowUpIcon,
  ArrowDownIcon
} from '@chakra-ui/icons';
import { FiTrendingUp, FiTrendingDown, FiBarChart2, FiPieChart } from 'react-icons/fi'; 
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  ScatterChart, 
  Scatter,
  Legend,
  Area,
  AreaChart
} from 'recharts';
import productData from '../products.json';

const ChartPanel = () => {
  
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, gray.900, purple.900, blue.900)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardBgAlpha = useColorModeValue('whiteAlpha.900', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('purple.500', 'purple.300');
  
  const CHART_COLORS = useColorModeValue(
    [
      '#A78BFA', // Soft purple
      '#60A5FA', // Soft blue
      '#34D399', // Soft emerald
      '#FBBF24', // Soft amber
      '#F472B6', // Soft pink
      '#A78BFA', // Soft indigo
      '#6EE7B7', // Soft green
      '#FDBA74'  // Soft orange
    ],
    [
      '#C4B5FD', // Light purple
      '#93C5FD', // Light blue
      '#6EE7B7', // Light emerald
      '#FDE047', // Light yellow
      '#F9A8D4', // Light pink
      '#C7D2FE', // Light indigo
      '#86EFAC', // Light green
      '#FED7AA'  // Light orange
    ]
  );

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


  const renderChart = () => {
    const commonProps = {
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    const gridStroke = useColorModeValue('#E2E8F0', '#4A5568');
    const axisColor = useColorModeValue('#A0AEC0', '#718096');

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} {...commonProps}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[0]} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={CHART_COLORS[1]} stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridStroke}
                opacity={0.4}
              />
              <XAxis 
                dataKey="category" 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <YAxis 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <RechartsTooltip 
                formatter={(value, name) => [`$${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey="revenue" 
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                strokeWidth={0}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} {...commonProps}>
              <defs>
                <linearGradient id="lineGradient1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={CHART_COLORS[0]}/>
                  <stop offset="100%" stopColor={CHART_COLORS[1]}/>
                </linearGradient>
                <linearGradient id="lineGradient2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={CHART_COLORS[2]}/>
                  <stop offset="100%" stopColor={CHART_COLORS[3]}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridStroke}
                opacity={0.4}
              />
              <XAxis 
                dataKey="category" 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <YAxis 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <RechartsTooltip 
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="url(#lineGradient1)"
                strokeWidth={4}
                dot={{ fill: CHART_COLORS[0], strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: CHART_COLORS[0], strokeWidth: 3, fill: 'white' }}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="units" 
                stroke="url(#lineGradient2)"
                strokeWidth={4}
                dot={{ fill: CHART_COLORS[2], strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: CHART_COLORS[2], strokeWidth: 3, fill: 'white' }}
                name="Units Sold"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData} {...commonProps}>
              <defs>
                <linearGradient id="areaGradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[0]} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={CHART_COLORS[0]} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="areaGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[2]} stopOpacity={0.8}/>
                  <stop offset="100%" stopColor={CHART_COLORS[2]} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridStroke}
                opacity={0.4}
              />
              <XAxis 
                dataKey="category" 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <YAxis 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <RechartsTooltip 
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke={CHART_COLORS[0]}
                fill="url(#areaGradient1)"
                strokeWidth={3}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="units"
                stackId="2"
                stroke={CHART_COLORS[2]}
                fill="url(#areaGradient2)"
                strokeWidth={3}
                name="Units Sold"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <defs>
                {CHART_COLORS.map((color, index) => (
                  <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={1}/>
                    <stop offset="100%" stopColor={color} stopOpacity={0.7}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, revenue, percent }) => 
                  `${category}: ${(percent * 100).toFixed(1)}%`
                }
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="revenue"
                strokeWidth={3}
                stroke={cardBg}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#pieGradient${index % CHART_COLORS.length})`}
                  />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={scatterData} {...commonProps}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridStroke}
                opacity={0.4}
              />
              <XAxis 
                dataKey="price" 
                name="Price"
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <YAxis 
                dataKey="unitsSold" 
                name="Units Sold"
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: borderColor }}
                tickLine={{ stroke: borderColor }}
              />
              <RechartsTooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: cardBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '12px',
                  color: textColor,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
                formatter={(value, name) => [
                  name === 'price' ? `$${value}` : value,
                  name === 'price' ? 'Price' : 'Units Sold'
                ]}
              />
              <Scatter 
                dataKey="unitsSold" 
                fill={CHART_COLORS[0]}
                fillOpacity={0.8}
                strokeWidth={2}
                stroke={CHART_COLORS[1]}
              />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">

          {/* Chart Section */}
          <Card 
            bg={cardBgAlpha} 
            borderColor={borderColor} 
            shadow="2xl" 
            borderRadius="3xl"
            backdropFilter="blur(10px)"
            border="1px solid"
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
                {renderChart()}
              </Box>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default ChartPanel;