/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Select,
  Checkbox,
  CheckboxGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  IconButton,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Flex,
  Spacer,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Switch,
  Divider,
  Wrap,
  WrapItem,
  Tooltip
} from '@chakra-ui/react';
import { Search, Plus, Download, Upload, Trash2, Edit, TrendingUp, DollarSign, ShoppingCart, Target } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';

// Sample data
const initialProducts = [
  { id: 1, name: 'iPhone 14 Pro', category: 'Electronics', price: 999, unitsSold: 150, date: '2024-01-15', inStock: 25 },
  { id: 2, name: 'MacBook Air M2', category: 'Electronics', price: 1199, unitsSold: 85, date: '2024-01-10', inStock: 12 },
  { id: 3, name: 'Nike Air Max', category: 'Fashion', price: 120, unitsSold: 300, date: '2024-01-20', inStock: 45 },
  { id: 4, name: 'Levi\'s Jeans', category: 'Fashion', price: 80, unitsSold: 200, date: '2024-01-18', inStock: 60 },
  { id: 5, name: 'IKEA Desk', category: 'Home', price: 199, unitsSold: 95, date: '2024-01-12', inStock: 8 },
  { id: 6, name: 'Samsung TV 55"', category: 'Electronics', price: 699, unitsSold: 120, date: '2024-01-25', inStock: 15 },
  { id: 7, name: 'Adidas Hoodie', category: 'Fashion', price: 65, unitsSold: 180, date: '2024-01-22', inStock: 30 },
  { id: 8, name: 'Coffee Table', category: 'Home', price: 149, unitsSold: 75, date: '2024-01-16', inStock: 20 }
];

const CHART_COLORS = ['#4299E1', '#48BB78', '#ED8936', '#9F7AEA', '#38B2AC'];

export default function EcommerceDashboard() {
  const [products, setProducts] = useState(initialProducts);
  const [chartType, setChartType] = useState('bar');
  const [selectedCategories, setSelectedCategories] = useState(['Electronics', 'Fashion', 'Home']);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [unitsFilter, setUnitsFilter] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showMovingAverage, setShowMovingAverage] = useState(false);
  const [showProfitBubbles, setShowProfitBubbles] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Electronics', price: 0, unitsSold: 0 });
  const [dateRange, setDateRange] = useState('30');
  
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtered and processed data
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesUnits = product.unitsSold >= unitsFilter;
      return matchesSearch && matchesCategory && matchesPrice && matchesUnits;
    });
  }, [products, debouncedSearch, selectedCategories, priceRange, unitsFilter]);

  // Sorted data
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    return sorted;
  }, [filteredProducts, sortBy, sortOrder]);

  // Chart data processing
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

  // Scatter plot data
  const scatterData = useMemo(() => {
    return filteredProducts.map(product => ({
      ...product,
      revenue: product.price * product.unitsSold,
      profitMargin: Math.round((product.price * 0.3) * 100) / 100 // Assumed 30% margin
    }));
  }, [filteredProducts]);

  // Summary metrics
  const metrics = useMemo(() => {
    const totalRevenue = filteredProducts.reduce((sum, p) => sum + (p.price * p.unitsSold), 0);
    const totalUnits = filteredProducts.reduce((sum, p) => sum + p.unitsSold, 0);
    const avgPrice = filteredProducts.length > 0 ? filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length : 0;
    const bestCategory = chartData.reduce((max, cat) => cat.revenue > max.revenue ? cat : max, chartData[0] || { category: 'N/A', revenue: 0 });
    
    return {
      totalRevenue,
      totalUnits,
      avgPrice: Math.round(avgPrice),
      bestCategory: bestCategory?.category || 'N/A',
      lowStockItems: filteredProducts.filter(p => p.inStock < 15).length
    };
  }, [filteredProducts, chartData]);

  // Event handlers
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(sortedProducts.map(p => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields with valid values.',
        status: 'error',
        duration: 3000
      });
      return;
    }

    const product = {
      ...newProduct,
      id: Math.max(...products.map(p => p.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      inStock: Math.floor(Math.random() * 50) + 10
    };
    
    setProducts([...products, product]);
    setNewProduct({ name: '', category: 'Electronics', price: 0, unitsSold: 0 });
    onAddClose();
    
    toast({
      title: 'Product Added',
      description: `${product.name} has been added successfully.`,
      status: 'success',
      duration: 3000
    });
  };

  const handleBulkDelete = () => {
    setProducts(products.filter(p => !selectedRows.includes(p.id)));
    setSelectedRows([]);
    onDeleteClose();
    
    toast({
      title: 'Products Deleted',
      description: `${selectedRows.length} products have been deleted.`,
      status: 'info',
      duration: 3000
    });
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Category', 'Price', 'Units Sold', 'Revenue', 'Date', 'In Stock'];
    const csvData = [
      headers.join(','),
      ...sortedProducts.map(p => [
        p.name,
        p.category,
        p.price,
        p.unitsSold,
        p.price * p.unitsSold,
        p.date,
        p.inStock
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <RechartsTooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
              <Bar dataKey="revenue" fill="#4299E1" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <RechartsTooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4299E1" strokeWidth={2} />
              <Line type="monotone" dataKey="units" stroke="#48BB78" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, revenue }) => `${category}: $${revenue.toLocaleString()}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={scatterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="price" name="Price" />
              <YAxis dataKey="unitsSold" name="Units Sold" />
              <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter dataKey="unitsSold" fill="#4299E1" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="xl" color="gray.800">E-commerce Analytics Dashboard</Heading>
          <HStack>
            <Button leftIcon={<Upload />} colorScheme="blue" variant="outline">
              Import CSV
            </Button>
            <Button leftIcon={<Download />} onClick={exportToCSV} colorScheme="green" variant="outline">
              Export CSV
            </Button>
          </HStack>
        </Flex>

        {/* Summary Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={4}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel fontSize="sm" color="gray.600">Total Revenue</StatLabel>
                <StatNumber fontSize="2xl" color="green.500">
                  <HStack>
                    <DollarSign size={24} />
                    <Text>${metrics.totalRevenue.toLocaleString()}</Text>
                  </HStack>
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Stat>
                <StatLabel fontSize="sm" color="gray.600">Units Sold</StatLabel>
                <StatNumber fontSize="2xl" color="blue.500">
                  <HStack>
                    <ShoppingCart size={24} />
                    <Text>{metrics.totalUnits.toLocaleString()}</Text>
                  </HStack>
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Stat>
                <StatLabel fontSize="sm" color="gray.600">Avg Price</StatLabel>
                <StatNumber fontSize="2xl" color="purple.500">
                  <HStack>
                    <Target size={24} />
                    <Text>${metrics.avgPrice}</Text>
                  </HStack>
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Stat>
                <StatLabel fontSize="sm" color="gray.600">Best Category</StatLabel>
                <StatNumber fontSize="lg" color="orange.500">
                  <HStack>
                    <TrendingUp size={20} />
                    <Text>{metrics.bestCategory}</Text>
                  </HStack>
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <Stat>
                <StatLabel fontSize="sm" color="gray.600">Low Stock Alert</StatLabel>
                <StatNumber fontSize="2xl" color="red.500">
                  <Badge colorScheme="red" fontSize="lg" px={2} py={1}>
                    {metrics.lowStockItems} items
                  </Badge>
                </StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Chart Panel */}
        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">Analytics Overview</Heading>
              <HStack spacing={4}>
                <FormControl width="200px">
                  <FormLabel fontSize="sm">Chart Type</FormLabel>
                  <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                    <option value="pie">Pie Chart</option>
                    <option value="scatter">Scatter Plot</option>
                  </Select>
                </FormControl>
                
                <FormControl width="150px">
                  <FormLabel fontSize="sm">Date Range</FormLabel>
                  <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                  </Select>
                </FormControl>
              </HStack>
            </Flex>
          </CardHeader>
          <CardBody>
            {renderChart()}
          </CardBody>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <Heading size="md">Filters & Controls</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
              <FormControl>
                <FormLabel>Search Products</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Search size={16} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Categories</FormLabel>
                <CheckboxGroup value={selectedCategories} onChange={setSelectedCategories}>
                  <VStack align="start">
                    <Checkbox value="Electronics">Electronics</Checkbox>
                    <Checkbox value="Fashion">Fashion</Checkbox>
                    <Checkbox value="Home">Home</Checkbox>
                  </VStack>
                </CheckboxGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Price Range: ${priceRange[0]} - ${priceRange[1]}</FormLabel>
                <RangeSlider
                  aria-label={['min', 'max']}
                  min={0}
                  max={1500}
                  step={50}
                  value={priceRange}
                  onChange={setPriceRange}
                  mt={4}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
              </FormControl>

              <FormControl>
                <FormLabel>Min Units Sold: {unitsFilter}</FormLabel>
                <Slider
                  aria-label="units-filter"
                  min={0}
                  max={300}
                  step={10}
                  value={unitsFilter}
                  onChange={setUnitsFilter}
                  mt={4}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">Product Data ({sortedProducts.length} items)</Heading>
              <HStack>
                <Button leftIcon={<Plus />} onClick={onAddOpen} colorScheme="blue">
                  Add Product
                </Button>
                {selectedRows.length > 0 && (
                  <Button leftIcon={<Trash2 />} onClick={onDeleteOpen} colorScheme="red" variant="outline">
                    Delete Selected ({selectedRows.length})
                  </Button>
                )}
              </HStack>
            </Flex>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>
                      <Checkbox
                        isChecked={selectedRows.length === sortedProducts.length && sortedProducts.length > 0}
                        isIndeterminate={selectedRows.length > 0 && selectedRows.length < sortedProducts.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </Th>
                    <Th cursor="pointer" onClick={() => handleSort('name')}>
                      Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </Th>
                    <Th cursor="pointer" onClick={() => handleSort('category')}>
                      Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </Th>
                    <Th cursor="pointer" onClick={() => handleSort('price')} isNumeric>
                      Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </Th>
                    <Th cursor="pointer" onClick={() => handleSort('unitsSold')} isNumeric>
                      Units Sold {sortBy === 'unitsSold' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </Th>
                    <Th isNumeric>Revenue</Th>
                    <Th isNumeric>Stock</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sortedProducts.map((product) => (
                    <Tr key={product.id} _hover={{ bg: 'gray.50' }}>
                      <Td>
                        <Checkbox
                          isChecked={selectedRows.includes(product.id)}
                          onChange={(e) => handleRowSelect(product.id, e.target.checked)}
                        />
                      </Td>
                      <Td fontWeight="medium">{product.name}</Td>
                      <Td>
                        <Badge 
                          colorScheme={
                            product.category === 'Electronics' ? 'blue' :
                            product.category === 'Fashion' ? 'purple' : 'green'
                          }
                        >
                          {product.category}
                        </Badge>
                      </Td>
                      <Td isNumeric>${product.price}</Td>
                      <Td isNumeric>{product.unitsSold}</Td>
                      <Td isNumeric fontWeight="bold" color="green.600">
                        ${(product.price * product.unitsSold).toLocaleString()}
                      </Td>
                      <Td isNumeric>
                        <Text color={product.inStock < 15 ? 'red.500' : 'green.500'}>
                          {product.inStock}
                        </Text>
                      </Td>
                      <Td>
                        {product.inStock < 15 ? (
                          <Badge colorScheme="red">Low Stock</Badge>
                        ) : (
                          <Badge colorScheme="green">In Stock</Badge>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </VStack>

      {/* Add Product Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                </Select>
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <NumberInput
                  min={0}
                  value={newProduct.price}
                  onChange={(_, value) => setNewProduct({...newProduct, price: value || 0})}
                >
                  <NumberInputField placeholder="0.00" />
                </NumberInput>
              </FormControl>
              
              <FormControl>
                <FormLabel>Units Sold</FormLabel>
                <NumberInput
                  min={0}
                  value={newProduct.unitsSold}
                  onChange={(_, value) => setNewProduct({...newProduct, unitsSold: value || 0})}
                >
                  <NumberInputField placeholder="0" />
                </NumberInput>
              </FormControl>
              
              <HStack width="100%" justify="end" spacing={4} pt={4}>
                <Button variant="ghost" onClick={onAddClose}>Cancel</Button>
                <Button colorScheme="blue" onClick={handleAddProduct}>Add Product</Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Products
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete {selectedRows.length} selected products? 
              This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleBulkDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}