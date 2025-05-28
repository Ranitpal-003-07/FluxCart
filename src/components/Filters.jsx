/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Select,
  Checkbox,
  CheckboxGroup,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  IconButton,
  Badge,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Flex,
  Switch,
  Divider,
  Collapse,
  Icon,
  Stack,
  Center,
  Tooltip,
  Container,
} from '@chakra-ui/react';
import { 
  Search, X, Filter, ChevronDown, ChevronUp, 
  ShoppingCart, DollarSign, Package, AlertTriangle 
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';

const Filters = () => {
  //using products context for filtering
  const {
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    unitsSoldRange,
    setUnitsSoldRange,
    inStockRange,
    setInStockRange,
    showLowStock,
    setShowLowStock,
    lowStockThreshold,
    setLowStockThreshold,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    allCategories,
    applyStockFilter
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen: isExpanded, onToggle } = useDisclosure({ defaultIsOpen: true });

  // background gradient
  const bgGradient = useColorModeValue(
    'linear(135deg, blue.600 0%, purple.600 25%, pink.600 50%, orange.600 75%, red.600 100%)',
    'linear(135deg, blue.800 0%, purple.800 25%, pink.800 50%, orange.800 75%, red.800 100%)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const accentColor = useColorModeValue('blue.500', 'blue.300');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');

  // calc actv filters
  const activeFiltersCount = [
    searchTerm.length > 0,
    selectedCategories.length !== allCategories.length,
    priceRange[0] > 0 || priceRange[1] < 1500,
    unitsSoldRange[0] > 0 || unitsSoldRange[1] < 300,
    inStockRange[0] > 0 || inStockRange[1] < 100,
    showLowStock
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories(allCategories);
    setPriceRange([0, 1500]);
    setUnitsSoldRange([0, 300]);
    setInStockRange([0, 100]);
    setShowLowStock(false);
    setLowStockThreshold(15);
    setSortBy('name');
    setSortOrder('asc');
  };

  const FilterSection = ({ title, icon, children, ...props }) => (
    <Box
      p={6}
      bg={useColorModeValue('gray.50', 'gray.700')}
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderColor}
      shadow="sm"
      transition="all 0.3s ease"
      _hover={{
        shadow: 'md',
        transform: 'translateY(-2px)',
        borderColor: accentColor
      }}
      {...props}
    >
      <VStack align="start" spacing={4}>
        <HStack spacing={3}>
          <Center
            w={8}
            h={8}
            bg={useColorModeValue('white', 'gray.600')}
            borderRadius="lg"
            shadow="sm"
          >
            <Icon as={icon} w={4} h={4} color={accentColor} />
          </Center>
          <Text fontWeight="600" color={textColor} fontSize="sm">
            {title}
          </Text>
        </HStack>
        {children}
      </VStack>
    </Box>
  );

  const QuickActionButton = ({ children, colorScheme, onClick, ...props }) => (
    <Button
      size="sm"
      variant="ghost"
      colorScheme={colorScheme}
      borderRadius="xl"
      transition="all 0.2s ease"
      _hover={{
        transform: 'scale(1.02)',
        shadow: 'sm'
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );

  return (
    <Container maxW="full" p={0}>
      <Card
        bg={cardBg}
        shadow="2xl"
        borderRadius="3xl"
        border="1px solid"
        borderColor={borderColor}
        overflow="hidden"
        transition="all 0.3s ease"
        _hover={{ shadow: '3xl' }}
      >
        <CardHeader
          bgGradient={bgGradient}
          py={8}
          px={8}
          position="relative"
          overflow="hidden"
        >
          {/* decoration */}
          <Box
            position="absolute"
            top="-50%"
            right="-10%"
            w="200px"
            h="200px"
            bg="whiteAlpha.200"
            borderRadius="full"
            filter="blur(80px)"
          />
          <Box
            position="absolute"
            bottom="-30%"
            left="-5%"
            w="150px"
            h="150px"
            bg="whiteAlpha.300"
            borderRadius="full"
            filter="blur(60px)"
          />
          
          <Flex justify="space-between" align="center" position="relative">
            <HStack spacing={5}>
              <Center
                w={16}
                h={16}
                bg="whiteAlpha.300"
                backdropFilter="blur(20px)"
                borderRadius="2xl"
                border="2px solid"
                borderColor="whiteAlpha.400"
                shadow="2xl"
              >
                <Icon as={Filter} w={8} h={8} color="white" />
              </Center>
              <Box>
                <Heading 
                  size="xl" 
                  color="white" 
                  fontWeight="900"
                  letterSpacing="tight"
                  textShadow="2px 2px 4px rgba(0,0,0,0.3)"
                >
                  Smart Filters
                </Heading>
                <Text 
                  fontSize="md" 
                  color="whiteAlpha.900" 
                  mt={1}
                  fontWeight="600"
                  textShadow="1px 1px 2px rgba(0,0,0,0.2)"
                >
                  {activeFiltersCount > 0 
                    ? `${activeFiltersCount} active filter${activeFiltersCount > 1 ? 's' : ''} applied` 
                    : 'Customize your product search'
                  }
                </Text>
              </Box>
            </HStack>
            
            <HStack spacing={3}>
              {activeFiltersCount > 0 && (
                <Badge
                  colorScheme="white"
                  variant="solid"
                  fontSize="sm"
                  px={4}
                  py={2}
                  borderRadius="full"
                  color="blue.600"
                  bg="whiteAlpha.900"
                  fontWeight="700"
                >
                  {activeFiltersCount}
                </Badge>
              )}
              {activeFiltersCount > 0 && (
                <Tooltip label="Clear all filters" placement="top">
                  <Button
                    size="md"
                    variant="ghost"
                    colorScheme="whiteAlpha"
                    leftIcon={<Icon as={X} w={4} h={4} />}
                    onClick={clearAllFilters}
                    borderRadius="xl"
                    color="white"
                    _hover={{ bg: 'whiteAlpha.200' }}
                    fontWeight="600"
                  >
                    Clear All
                  </Button>
                </Tooltip>
              )}
              <Tooltip label={isExpanded ? 'Collapse filters' : 'Expand filters'} placement="top">
                <IconButton
                  size="lg"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  icon={<Icon as={isExpanded ? ChevronUp : ChevronDown} w={6} h={6} />}
                  onClick={onToggle}
                  borderRadius="xl"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                />
              </Tooltip>
            </HStack>
          </Flex>
        </CardHeader>

        <Collapse in={isExpanded} animateOpacity>
          <CardBody p={8} pt={6}>
            {/*Search */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={10}>
              <FilterSection title="Search Products" icon={Search}>
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Search} w={5} h={5} color={mutedTextColor} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    borderRadius="xl"
                    border="2px solid"
                    borderColor="transparent"
                    bg={useColorModeValue('white', 'gray.600')}
                    _hover={{ borderColor: useColorModeValue('blue.200', 'blue.400') }}
                    _focus={{ 
                      borderColor: accentColor, 
                      boxShadow: `0 0 0 1px ${accentColor}`,
                      bg: useColorModeValue('white', 'gray.600')
                    }}
                    fontSize="md"
                  />
                </InputGroup>
              </FilterSection>

              <FilterSection title="Sort Options" icon={Package}>
                <VStack spacing={4} w="full">
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    size="lg"
                    borderRadius="xl"
                    border="2px solid"
                    borderColor="transparent"
                    bg={useColorModeValue('white', 'gray.600')}
                    _hover={{ borderColor: useColorModeValue('blue.200', 'blue.400') }}
                    _focus={{ 
                      borderColor: accentColor, 
                      boxShadow: `0 0 0 1px ${accentColor}` 
                    }}
                  >
                    <option value="name">Product Name</option>
                    <option value="price">Price</option>
                    <option value="unitsSold">Units Sold</option>
                    <option value="inStock">Stock Level</option>
                    <option value="category">Category</option>
                  </Select>
                  <HStack w="full" justify="center">
                    <Button
                      size="sm"
                      variant={sortOrder === 'asc' ? 'solid' : 'ghost'}
                      colorScheme="blue"
                      onClick={() => setSortOrder('asc')}
                      borderRadius="lg"
                      flex={1}
                    >
                      Ascending
                    </Button>
                    <Button
                      size="sm"
                      variant={sortOrder === 'desc' ? 'solid' : 'ghost'}
                      colorScheme="blue"
                      onClick={() => setSortOrder('desc')}
                      borderRadius="lg"
                      flex={1}
                    >
                      Descending
                    </Button>
                  </HStack>
                </VStack>
              </FilterSection>
            </SimpleGrid>

            <Divider mb={10} borderColor={borderColor} />

            {/* Filter section */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={8} mb={8}>
              {/* cata */}
              <FilterSection title="Categories" icon={ShoppingCart}>
                <CheckboxGroup value={selectedCategories} onChange={setSelectedCategories}>
                  <Stack spacing={4}>
                    {allCategories.map((category) => (
                      <Checkbox 
                        key={category} 
                        value={category}
                        colorScheme="blue"
                        size="lg"
                        fontWeight="500"
                        borderRadius="md"
                      >
                        <Text fontSize="sm">{category}</Text>
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </FilterSection>

              {/* price range */}
              <FilterSection title={`Price Range: $${priceRange[0]} - $${priceRange[1]}`} icon={DollarSign}>
                <Box w="full">
                  <RangeSlider
                    min={0}
                    max={1500}
                    step={25}
                    value={priceRange}
                    onChange={setPriceRange}
                    colorScheme="blue"
                  >
                    <RangeSliderTrack bg="gray.200" h={3} borderRadius="full">
                      <RangeSliderFilledTrack borderRadius="full" />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} boxSize={6} shadow="lg" />
                    <RangeSliderThumb index={1} boxSize={6} shadow="lg" />
                  </RangeSlider>
                  <HStack justify="space-between" mt={4} fontSize="xs" color={mutedTextColor} fontWeight="600">
                    <Text>$0</Text>
                    <Text>$1,500</Text>
                  </HStack>
                </Box>
              </FilterSection>

              {/* unts sold rng */}
              <FilterSection title={`Units Sold: ${unitsSoldRange[0]} - ${unitsSoldRange[1]}`} icon={Package}>
                <Box w="full">
                  <RangeSlider
                    min={0}
                    max={300}
                    step={10}
                    value={unitsSoldRange}
                    onChange={setUnitsSoldRange}
                    colorScheme="green"
                  >
                    <RangeSliderTrack bg="gray.200" h={3} borderRadius="full">
                      <RangeSliderFilledTrack borderRadius="full" />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} boxSize={6} shadow="lg" />
                    <RangeSliderThumb index={1} boxSize={6} shadow="lg" />
                  </RangeSlider>
                  <HStack justify="space-between" mt={4} fontSize="xs" color={mutedTextColor} fontWeight="600">
                    <Text>0</Text>
                    <Text>300</Text>
                  </HStack>
                </Box>
              </FilterSection>

              {/* stk lvl rng */}
              <FilterSection title={`Stock Level: ${inStockRange[0]} - ${inStockRange[1]}`} icon={Package}>
                <Box w="full">
                  <RangeSlider
                    min={0}
                    max={100}
                    step={5}
                    value={inStockRange}
                    onChange={setInStockRange}
                    colorScheme="purple"
                  >
                    <RangeSliderTrack bg="gray.200" h={3} borderRadius="full">
                      <RangeSliderFilledTrack borderRadius="full" />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} boxSize={6} shadow="lg" />
                    <RangeSliderThumb index={1} boxSize={6} shadow="lg" />
                  </RangeSlider>
                  <HStack justify="space-between" mt={4} fontSize="xs" color={mutedTextColor} fontWeight="600">
                    <Text>0</Text>
                    <Text>100</Text>
                  </HStack>
                </Box>
              </FilterSection>

              {/* Low stck alrt */}
              <FilterSection title="Low Stock Alert" icon={AlertTriangle}>
                <VStack spacing={5} align="start" w="full">
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm" fontWeight="500">Enable Alert</Text>
                    <Switch 
                      isChecked={showLowStock} 
                      onChange={(e) => setShowLowStock(e.target.checked)}
                      colorScheme="red"
                      size="lg"
                    />
                  </HStack>
                  <Box w="full">
                    <Text fontSize="xs" color={mutedTextColor} mb={3} fontWeight="600">
                      Alert Threshold: {lowStockThreshold} units
                    </Text>
                    <Slider
                      min={1}
                      max={50}
                      step={1}
                      value={lowStockThreshold}
                      onChange={setLowStockThreshold}
                      colorScheme="red"
                    >
                      <SliderTrack bg="gray.200" h={3} borderRadius="full">
                        <SliderFilledTrack borderRadius="full" />
                      </SliderTrack>
                      <SliderThumb boxSize={6} shadow="lg" />
                    </Slider>
                  </Box>
                </VStack>
              </FilterSection>

              {/* quick access for filters */}
              <FilterSection title="Quick Stock Actions" icon={Package}>
                <VStack spacing={3} w="full">
                  <QuickActionButton
                    colorScheme="red"
                    onClick={() => applyStockFilter('critical')}
                    w="full"
                  >
                    Critical Stock (≤10)
                  </QuickActionButton>
                  <QuickActionButton
                    colorScheme="orange"
                    onClick={() => applyStockFilter('low')}
                    w="full"
                  >
                    Low Stock (11-25)
                  </QuickActionButton>
                  <QuickActionButton
                    colorScheme="green"
                    onClick={() => applyStockFilter('good')}
                    w="full"
                  >
                    Good Stock (26+)
                  </QuickActionButton>
                </VStack>
              </FilterSection>
            </SimpleGrid>

            {/* actv fltrs */}
            {activeFiltersCount > 0 && (
              <>
                <Divider mb={6} borderColor={borderColor} />
                <Box
                  p={6}
                  bg={useColorModeValue('blue.50', 'blue.900')}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor={useColorModeValue('blue.200', 'blue.700')}
                >
                  <Text fontWeight="700" color={textColor} mb={4} fontSize="sm">
                    Active Filters ({activeFiltersCount}):
                  </Text>
                  <Flex wrap="wrap" gap={3}>
                    {searchTerm && (
                      <Badge colorScheme="blue" variant="subtle" px={4} py={2} borderRadius="full" fontSize="xs">
                        Search: "{searchTerm}"
                      </Badge>
                    )}
                    {selectedCategories.length < allCategories.length && selectedCategories.map((category) => (
                      <Badge key={category} colorScheme="green" variant="subtle" px={4} py={2} borderRadius="full" fontSize="xs">
                        {category}
                      </Badge>
                    ))}
                    {(priceRange[0] > 0 || priceRange[1] < 1500) && (
                      <Badge colorScheme="blue" variant="subtle" px={4} py={2} borderRadius="full" fontSize="xs">
                        Price: ${priceRange[0]} - ${priceRange[1]}
                      </Badge>
                    )}
                    {(unitsSoldRange[0] > 0 || unitsSoldRange[1] < 300) && (
                      <Badge colorScheme="green" variant="subtle" px={4} py={2} borderRadius="full" fontSize="xs">
                        Units: {unitsSoldRange[0]} - {unitsSoldRange[1]}
                      </Badge>
                    )}
                    {(inStockRange[0] > 0 || inStockRange[1] < 100) && (
                      <Badge colorScheme="purple" variant="subtle" px={4} py={2} borderRadius="full" fontSize="xs">
                        Stock: {inStockRange[0]} - {inStockRange[1]}
                      </Badge>
                    )}
                    {showLowStock && (
                      <Badge colorScheme="red" variant="subtle" px={4} py={2} borderRadius="full" fontSize="xs">
                        Low Stock Alert Active
                      </Badge>
                    )}
                  </Flex>
                </Box>
                </>
              )}
            </CardBody>
        </Collapse>
      </Card>
    </Container>
  );
};

export default Filters;