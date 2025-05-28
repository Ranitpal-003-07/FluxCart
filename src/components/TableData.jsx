/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  Button,
  Text,
  Select,
  HStack,
  VStack,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Tooltip,
  Input,
  InputGroup,
  InputLeftElement,
  Checkbox,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  EditIcon,
  DeleteIcon,
  TriangleUpIcon,
  TriangleDownIcon,
  AddIcon
} from '@chakra-ui/icons';
import { useProducts } from '../context/ProductContext';

const TableData = () => {
  const {
    sortedProducts,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    deleteProduct,
    deleteProducts,
    updateProduct,
    addProduct,
    allCategories
  } = useProducts();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  
  // Selection state
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    unitsSold: '',
    inStock: ''
  });
  
  const toast = useToast();
  const cancelRef = React.useRef();

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  // Filter products based on search term
  const searchFilteredProducts = useMemo(() => {
    if (!searchTerm) return sortedProducts;
    
    return sortedProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm)
    );
  }, [sortedProducts, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(searchFilteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = searchFilteredProducts.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  // Sorting handler
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Selection handlers
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(currentProducts.map(p => p.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          size="sm"
          variant={i === currentPage ? 'solid' : 'outline'}
          colorScheme={i === currentPage ? 'blue' : 'gray'}
          onClick={() => goToPage(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  // Stock status badge
  const getStockBadge = (stock) => {
    if (stock <= 10) {
      return <Badge colorScheme="red" variant="solid">Critical</Badge>;
    } else if (stock <= 25) {
      return <Badge colorScheme="orange" variant="solid">Low</Badge>;
    } else {
      return <Badge colorScheme="green" variant="solid">Good</Badge>;
    }
  };

  // Edit product handler
  const handleEdit = (product) => {
    setEditingProduct({ ...product });
    onEditOpen();
  };

  // Delete handlers
  const handleDeleteSingle = (product) => {
    setProductToDelete(product);
    onDeleteOpen();
  };

  const handleDeleteMultiple = () => {
    if (selectedItems.length === 0) return;
    
    deleteProducts(selectedItems);
    setSelectedItems([]);
    toast({
      title: 'Products deleted',
      description: `${selectedItems.length} products have been deleted.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      toast({
        title: 'Product deleted',
        description: `${productToDelete.name} has been deleted.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    onDeleteClose();
    setProductToDelete(null);
  };

  // Save edit handler
  const handleSaveEdit = () => {
    updateProduct(editingProduct.id, editingProduct);
    toast({
      title: 'Product updated',
      description: `${editingProduct.name} has been updated.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onEditClose();
    setEditingProduct(null);
  };

  // Add product handler
  const handleAddProduct = () => {
    // Validation
    if (!newProduct.name || !newProduct.category || !newProduct.price || 
        !newProduct.unitsSold || !newProduct.inStock) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const productData = {
      ...newProduct,
      price: Number(newProduct.price),
      unitsSold: Number(newProduct.unitsSold),
      inStock: Number(newProduct.inStock)
    };

    addProduct(productData);
    toast({
      title: 'Product added',
      description: `${newProduct.name} has been added successfully.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    // Reset form
    setNewProduct({
      name: '',
      category: '',
      price: '',
      unitsSold: '',
      inStock: ''
    });
    onAddClose();
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? <TriangleUpIcon ml={1} /> : <TriangleDownIcon ml={1} />;
  };

  return (
    <Box p={6} bg={bgColor} borderRadius="lg" shadow="sm">
      {/* Header with Search and Actions */}
      <VStack spacing={4} mb={6}>
        <Flex justify="space-between" align="center" w="full" wrap="wrap" gap={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Products ({searchFilteredProducts.length})
          </Text>
          
          <HStack spacing={3}>
            <Button
              colorScheme="blue"
              leftIcon={<AddIcon />}
              onClick={onAddOpen}
            >
              Add Product
            </Button>
            
            {selectedItems.length > 0 && (
              <Button
                colorScheme="red"
                variant="outline"
                size="sm"
                onClick={handleDeleteMultiple}
                leftIcon={<DeleteIcon />}
              >
                Delete Selected ({selectedItems.length})
              </Button>
            )}
          </HStack>
        </Flex>

        {/* Search Bar */}
        <InputGroup maxW="400px" alignSelf="flex-start">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </VStack>

      {/* Table */}
      <TableContainer
        border="1px"
        borderColor={borderColor}
        borderRadius="lg"
        overflowX="auto"
      >
        <Table variant="simple" size="sm">
          <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
            <Tr>
              <Th w="40px" px={2}>
                <Checkbox
                  isChecked={
                    currentProducts.length > 0 &&
                    selectedItems.length === currentProducts.length
                  }
                  isIndeterminate={
                    selectedItems.length > 0 &&
                    selectedItems.length < currentProducts.length
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('id')}
                _hover={{ bg: hoverBg }}
                w="60px"
              >
                ID <SortIcon field="id" />
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('name')}
                _hover={{ bg: hoverBg }}
                minW="180px"
              >
                Name <SortIcon field="name" />
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('category')}
                _hover={{ bg: hoverBg }}
                w="120px"
              >
                Category <SortIcon field="category" />
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('price')}
                _hover={{ bg: hoverBg }}
                w="100px"
                isNumeric
              >
                Price <SortIcon field="price" />
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('unitsSold')}
                _hover={{ bg: hoverBg }}
                w="100px"
                isNumeric
              >
                Units Sold <SortIcon field="unitsSold" />
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('inStock')}
                _hover={{ bg: hoverBg }}
                w="120px"
                isNumeric
              >
                In Stock <SortIcon field="inStock" />
              </Th>
              <Th 
                cursor="pointer" 
                onClick={() => handleSort('date')}
                _hover={{ bg: hoverBg }}
                w="100px"
              >
                Date <SortIcon field="date" />
              </Th>
              <Th w="100px">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentProducts.map((product) => (
              <Tr 
                key={product.id}
                _hover={{ bg: hoverBg }}
                bg={selectedItems.includes(product.id) ? useColorModeValue('blue.50', 'blue.900') : 'transparent'}
              >
                <Td px={2}>
                  <Checkbox
                    isChecked={selectedItems.includes(product.id)}
                    onChange={(e) => handleSelectItem(product.id, e.target.checked)}
                  />
                </Td>
                <Td fontWeight="semibold">{product.id}</Td>
                <Td>
                  <Text 
                    fontWeight="medium" 
                    noOfLines={2}
                    title={product.name}
                  >
                    {product.name}
                  </Text>
                </Td>
                <Td>
                  <Badge variant="subtle" colorScheme="blue">
                    {product.category}
                  </Badge>
                </Td>
                <Td isNumeric fontWeight="semibold">
                  ${product.price}
                </Td>
                <Td isNumeric>{product.unitsSold}</Td>
                <Td isNumeric>
                  <VStack spacing={1} align="end">
                    <Text fontWeight="medium">{product.inStock}</Text>
                    {getStockBadge(product.inStock)}
                  </VStack>
                </Td>
                <Td fontSize="sm" color="gray.600">
                  {new Date(product.date).toLocaleDateString()}
                </Td>
                <Td>
                  <HStack spacing={1}>
                    <Tooltip label="Edit product">
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => handleEdit(product)}
                      />
                    </Tooltip>
                    <Tooltip label="Delete product">
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDeleteSingle(product)}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Flex justify="space-between" align="center" mt={6} wrap="wrap" gap={4}>
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.600">
              Items per page:
            </Text>
            <Select
              size="sm"
              w="80px"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Select>
          </HStack>

          <Text fontSize="sm" color="gray.600">
            Showing {startIndex + 1}-{Math.min(endIndex, searchFilteredProducts.length)} of{' '}
            {searchFilteredProducts.length} products
          </Text>

          <HStack spacing={2}>
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
              size="sm"
              isDisabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            />
            
            {getPaginationButtons()}
            
            <IconButton
              aria-label="Next page"
              icon={<ChevronRightIcon />}
              size="sm"
              isDisabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
            />
          </HStack>
        </Flex>
      )}

      {/* Add Product Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({
                  ...newProduct,
                  name: e.target.value
                })}
              />
              <Select
                placeholder="Select Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({
                  ...newProduct,
                  category: e.target.value
                })}
              >
                {allCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <Input
                placeholder="Price"
                type="number"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({
                  ...newProduct,
                  price: e.target.value
                })}
              />
              <Input
                placeholder="Units Sold"
                type="number"
                min="0"
                value={newProduct.unitsSold}
                onChange={(e) => setNewProduct({
                  ...newProduct,
                  unitsSold: e.target.value
                })}
              />
              <Input
                placeholder="In Stock"
                type="number"
                min="0"
                value={newProduct.inStock}
                onChange={(e) => setNewProduct({
                  ...newProduct,
                  inStock: e.target.value
                })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAddClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddProduct}>
              Add Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {editingProduct && (
              <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    name: e.target.value
                  })}
                />
                <Select
                  placeholder="Select Category"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    category: e.target.value
                  })}
                >
                  {allCategories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
                <Input
                  placeholder="Price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    price: Number(e.target.value)
                  })}
                />
                <Input
                  placeholder="Units Sold"
                  type="number"
                  min="0"
                  value={editingProduct.unitsSold}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    unitsSold: Number(e.target.value)
                  })}
                />
                <Input
                  placeholder="In Stock"
                  type="number"
                  min="0"
                  value={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    inStock: Number(e.target.value)
                  })}
                />
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onEditClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </ModalFooter>
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
              Delete Product
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default TableData;