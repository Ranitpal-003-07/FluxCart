/* eslint-disable no-unused-vars */
import{ useState, useMemo} from 'react';
import {
  VStack,
  SimpleGrid,
  Box,
  Heading,
  Divider,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { TrendingUp, DollarSign, ShoppingCart, Target, Package, AlertTriangle} from 'lucide-react';
import productData from '../products.json';
import StatCard from './StatCard'; 
import CategoryCard from './CategoryCard';

const SummaryCards = () => {
  const [products, setProducts] = useState(productData);
  const [selectedCategories, setSelectedCategories] = useState(['Electronics', 'Fashion', 'Home']);

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
            
            {/* Changed grid layout to max 3 columns for better spacing */}
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