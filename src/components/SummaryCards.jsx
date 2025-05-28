/* eslint-disable no-unused-vars */
import { useMemo } from 'react';
import {
  VStack,
  SimpleGrid,
  Box,
  Heading,
  Divider,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { TrendingUp, DollarSign, ShoppingCart, Target, Package, AlertTriangle } from 'lucide-react';
import { useProducts } from '../context/ProductContext'; 
import StatCard from './StatCard';
import CategoryCard from './CategoryCard';

const SummaryCards = () => {
  // Get data from ProductsContext
  const { 
    products, 
    selectedCategories, 
    showLowStock,
    lowStockThreshold
  } = useProducts();

  // Filter products based only on selected categories
  const filteredProducts = useMemo(() => {
    if (!selectedCategories || selectedCategories.length === 0) {
      return products;
    }
    return products.filter(product => 
      selectedCategories.includes(product.category)
    );
  }, [products, selectedCategories]);

  // Chart data processing for categories
  const chartData = useMemo(() => {
    if (!selectedCategories || selectedCategories.length === 0) {
      return [];
    }
    
    return selectedCategories.map(category => {
      const categoryProducts = filteredProducts.filter(p => p.category === category);
      const totalRevenue = categoryProducts.reduce((sum, p) => sum + (p.price * p.unitsSold), 0);
      const totalUnits = categoryProducts.reduce((sum, p) => sum + p.unitsSold, 0);
      const avgPrice = categoryProducts.length > 0 
        ? categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length 
        : 0;
      
      // Use context values for low stock calculation
      const lowStockItems = categoryProducts.filter(p => 
        showLowStock ? p.inStock <= lowStockThreshold : p.inStock < 15
      ).length;
      
      return {
        category,
        revenue: totalRevenue,
        units: totalUnits,
        avgPrice: Math.round(avgPrice),
        products: categoryProducts.length,
        lowStock: lowStockItems
      };
    });
  }, [filteredProducts, selectedCategories, showLowStock, lowStockThreshold]);

  // Overall summary metrics
  const overallMetrics = useMemo(() => {
    const totalRevenue = filteredProducts.reduce((sum, p) => sum + (p.price * p.unitsSold), 0);
    const totalUnits = filteredProducts.reduce((sum, p) => sum + p.unitsSold, 0);
    const avgPrice = filteredProducts.length > 0 
      ? filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length 
      : 0;
      
    const bestCategory = chartData.length > 0 
      ? chartData.reduce(
          (max, cat) => cat.revenue > max.revenue ? cat : max, 
          chartData[0]
        )
      : { category: 'N/A', revenue: 0 };
    
    // Use context values for low stock calculation
    const lowStockItems = filteredProducts.filter(p => 
      showLowStock ? p.inStock <= lowStockThreshold : p.inStock < 15
    ).length;
    
    return {
      totalRevenue,
      totalUnits,
      avgPrice: Math.round(avgPrice),
      bestCategory: bestCategory?.category || 'N/A',
      lowStockItems,
      totalProducts: filteredProducts.length
    };
  }, [filteredProducts, chartData, showLowStock, lowStockThreshold]);

  // Theme-aware color values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        <VStack spacing={10} align="stretch">
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
            
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6} maxW="6xl" mx="auto">
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
                value={overallMetrics.lowStockItems}
                icon={AlertTriangle}
                gradientKey="alert"
                suffix=" items"
              />
            </SimpleGrid>
          </Box>

          {/* Divider */}
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
            
            {chartData.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {chartData.map((categoryData) => (
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
            ) : (
              <Box textAlign="center" py={8}>
                <Heading size="md" color={textColor} opacity={0.6}>
                  No categories selected. Please select categories to view the breakdown.
                </Heading>
              </Box>
            )}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default SummaryCards;