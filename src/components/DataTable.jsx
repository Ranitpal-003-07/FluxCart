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
  useColorModeValue,
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
  Tooltip,
  Collapse,
  Icon
} from '@chakra-ui/react';
import { Search, Plus, Download, Upload, Trash2, Edit, TrendingUp, DollarSign, ShoppingCart, Target } from 'lucide-react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import productData from '../products.json';


const DataTable = () => {
    const [products, setProducts] = useState(productData);
  const [selectedCategories, setSelectedCategories] = useState(['Electronics', 'Fashion', 'Home']);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [unitsFilter, setUnitsFilter] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRows, setSelectedRows] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Electronics', price: 0, unitsSold: 0 });
  
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const [isExpanded, setIsExpanded] = useState(true);

  const bgGradient = useColorModeValue('linear(to-r, blue.50, purple.50)', 'linear(to-r, blue.900, purple.900)');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const categories = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty'];
  
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

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'units-low-high', label: 'Units Sold: Low to High' },
    { value: 'units-high-low', label: 'Units Sold: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([0, 1500]);
    setUnitsFilter(0);
    setSortBy('');
  };

  const activeFiltersCount = selectedCategories.length + 
    (searchTerm ? 1 : 0) + 
    (unitsFilter > 0 ? 1 : 0) + 
    (priceRange[0] > 0 || priceRange[1] < 1500 ? 1 : 0) +
    (sortBy ? 1 : 0);
 
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

  return (
    <Box p={6} bg="gray.50" minH="100vh">
    
        <VStack spacing={6} align="stretch">
            <Card 
            bg={cardBg} 
            shadow="xl" 
            borderRadius="2xl" 
            border="1px" 
            borderColor={borderColor}
            overflow="hidden"
            >
            <CardHeader 
                bgGradient={bgGradient} 
                py={6}
                borderBottom="1px"
                borderColor={borderColor}
            >
                <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                    <Box 
                    p={3} 
                    bg="white" 
                    borderRadius="xl" 
                    shadow="md"
                    >
                        <Icon as={Filter} w={6} h={6} color="blue.500" />
                    </Box>
                    <Box>
                    <Heading size="lg" color="gray.800" fontWeight="bold">
                        Filters & Controls
                    </Heading>
                    <Text fontSize="sm" color="gray.600" mt={1}>
                        {activeFiltersCount > 0 ? `${activeFiltersCount} active filters` : 'Refine your search'}
                    </Text>
                    </Box>
                </HStack>
                
                <HStack spacing={2}>
                    {activeFiltersCount > 0 && (
                    <Badge colorScheme="blue" variant="solid" fontSize="xs" px={2} py={1}>
                        {activeFiltersCount}
                    </Badge>
                    )}
                    {activeFiltersCount > 0 && (
                    <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        leftIcon={<Icon as={X} w={4} h={4} />}
                        onClick={clearFilters}
                        _hover={{ bg: 'red.50' }}
                    >
                        Clear All
                    </Button>
                    )}
                    <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<Icon as={isExpanded ? ChevronUp : ChevronDown} w={5} h={5} />}
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
                    />
                </HStack>
                </Flex>
            </CardHeader>

            <Collapse in={isExpanded}>
                <CardBody p={8}>
                {/* Search and Sort Row */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
                    <FormControl>
                    <FormLabel fontWeight="semibold" color="gray.700" mb={3}>
                        Search Products
                    </FormLabel>
                    <InputGroup size="lg">
                        <InputLeftElement>
                        <Icon as={Search} w={5} h={5} color="gray.400" />
                        </InputLeftElement>
                        <Input
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        borderRadius="xl"
                        border="2px"
                        borderColor="gray.200"
                        _hover={{ borderColor: 'blue.300' }}
                        _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                        />
                    </InputGroup>
                    </FormControl>

                    <FormControl>
                    <FormLabel fontWeight="semibold" color="gray.700" mb={3}>
                        Sort By
                    </FormLabel>
                    <Select
                        placeholder="Choose sorting option"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        size="lg"
                        borderRadius="xl"
                        border="2px"
                        borderColor="gray.200"
                        _hover={{ borderColor: 'blue.300' }}
                        _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                    >
                        {sortOptions.slice(1).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </Select>
                    </FormControl>
                </SimpleGrid>

                <Divider mb={8} />

                {/* Filter Controls */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    <FormControl>
                    <FormLabel fontWeight="semibold" color="gray.700" mb={4}>
                        Categories
                    </FormLabel>
                    <Box 
                        p={4} 
                        bg="gray.50" 
                        borderRadius="xl" 
                        border="1px" 
                        borderColor="gray.200"
                    >
                        <CheckboxGroup 
                        value={selectedCategories} 
                        onChange={setSelectedCategories}
                        >
                        <VStack align="start" spacing={3}>
                            {categories.map((category) => (
                            <Checkbox 
                                key={category} 
                                value={category}
                                colorScheme="blue"
                                size="lg"
                                fontWeight="medium"
                            >
                                {category}
                            </Checkbox>
                            ))}
                        </VStack>
                        </CheckboxGroup>
                    </Box>
                    </FormControl>

                    <FormControl>
                    <FormLabel fontWeight="semibold" color="gray.700" mb={4}>
                        Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </FormLabel>
                    <Box 
                        p={6} 
                        bg="gray.50" 
                        borderRadius="xl" 
                        border="1px" 
                        borderColor="gray.200"
                    >
                        <RangeSlider
                        aria-label={['min', 'max']}
                        min={0}
                        max={1500}
                        step={50}
                        value={priceRange}
                        onChange={setPriceRange}
                        colorScheme="blue"
                        >
                        <RangeSliderTrack bg="gray.200" h={2}>
                            <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} boxSize={6} />
                        <RangeSliderThumb index={1} boxSize={6} />
                        </RangeSlider>
                        <HStack justify="space-between" mt={4} fontSize="sm" color="gray.600">
                        <Text>$0</Text>
                        <Text>$1,500</Text>
                        </HStack>
                    </Box>
                    </FormControl>

                    <FormControl>
                    <FormLabel fontWeight="semibold" color="gray.700" mb={4}>
                        Min Units Sold: {unitsFilter}
                    </FormLabel>
                    <Box 
                        p={6} 
                        bg="gray.50" 
                        borderRadius="xl" 
                        border="1px" 
                        borderColor="gray.200"
                    >
                        <Slider
                        aria-label="units-filter"
                        min={0}
                        max={300}
                        step={10}
                        value={unitsFilter}
                        onChange={setUnitsFilter}
                        colorScheme="blue"
                        >
                        <SliderTrack bg="gray.200" h={2}>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb boxSize={6} />
                        </Slider>
                        <HStack justify="space-between" mt={4} fontSize="sm" color="gray.600">
                        <Text>0</Text>
                        <Text>300</Text>
                        </HStack>
                    </Box>
                    </FormControl>
                </SimpleGrid>

                {/* Active Filters Display */}
                {activeFiltersCount > 0 && (
                    <>
                    <Divider mt={8} mb={6} />
                    <Box>
                        <Text fontWeight="semibold" color="gray.700" mb={3}>
                        Active Filters:
                        </Text>
                        <Flex wrap="wrap" gap={2}>
                        {searchTerm && (
                            <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="full">
                            Search: {searchTerm}
                            </Badge>
                        )}
                        {selectedCategories.map((category) => (
                            <Badge key={category} colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
                            {category}
                            </Badge>
                        ))}
                        {(priceRange[0] > 0 || priceRange[1] < 1500) && (
                            <Badge colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="full">
                            Price: ${priceRange[0]} - ${priceRange[1]}
                            </Badge>
                        )}
                        {unitsFilter > 0 && (
                            <Badge colorScheme="orange" variant="subtle" px={3} py={1} borderRadius="full">
                            Min Units: {unitsFilter}
                            </Badge>
                        )}
                        {sortBy && (
                            <Badge colorScheme="teal" variant="subtle" px={3} py={1} borderRadius="full">
                            Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}
                            </Badge>
                        )}
                        </Flex>
                    </Box>
                    </>
                )}
                </CardBody>
            </Collapse>
            </Card>

    
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
  )
}

export default DataTable
