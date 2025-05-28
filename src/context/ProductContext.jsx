/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import productsData from '../products.json';

// Helper function to get min/max range from data
const getMinMax = (items, key) => {
  if (!items.length) return [0, 0];
  return items.reduce(([min, max], item) => [
    Math.min(min, item[key]),
    Math.max(max, item[key])
  ], [Infinity, -Infinity]);
};

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  // Initialize ranges based on actual data
  const [products, setProducts] = useState(productsData);
  const [priceRange, setPriceRange] = useState(() => getMinMax(productsData, 'price'));
  const [unitsSoldRange, setUnitsSoldRange] = useState(() => getMinMax(productsData, 'unitsSold'));
  const [inStockRange, setInStockRange] = useState(() => getMinMax(productsData, 'inStock'));
  
  const [showLowStock, setShowLowStock] = useState(false);
  const [lowStockThreshold, setLowStockThreshold] = useState(15);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const toast = useToast();

  // Get unique categories from products
  const allCategories = useMemo(() => {
    return [...new Set(products.map(product => product.category))];
  }, [products]);

  // Initialize selected categories
  useEffect(() => {
    if (selectedCategories.length === 0 && allCategories.length > 0) {
      setSelectedCategories(allCategories);
    }
  }, [allCategories, selectedCategories]);

  // Filter products based on criteria
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const inUnitsSoldRange = product.unitsSold >= unitsSoldRange[0] && product.unitsSold <= unitsSoldRange[1];
      const inStockRangeCheck = product.inStock >= inStockRange[0] && product.inStock <= inStockRange[1];
      const isLowStock = showLowStock && product.inStock <= lowStockThreshold;
      const inSelectedCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
     
      return inPriceRange &&
             inUnitsSoldRange &&
             inStockRangeCheck &&
             (!showLowStock || isLowStock) &&
             inSelectedCategory;
    });
  }, [products, priceRange, unitsSoldRange, inStockRange, showLowStock, lowStockThreshold, selectedCategories]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
     
      if (typeof aValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
     
      return sortOrder === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });
  }, [filteredProducts, sortBy, sortOrder]);

  // Stock filter presets
  const applyStockFilter = (type) => {
    switch(type) {
      case 'critical':
        setInStockRange([0, 10]);
        setShowLowStock(true);
        break;
      case 'low':
        setInStockRange([11, 25]);
        setShowLowStock(false);
        break;
      case 'good':
        setInStockRange([26, 100]);
        setShowLowStock(false);
        break;
      default:
        setInStockRange([0, 100]);
    }
  };

  // Reset all filters to initial data ranges
  const resetFilters = () => {
    setPriceRange(getMinMax(products, 'price'));
    setUnitsSoldRange(getMinMax(products, 'unitsSold'));
    setInStockRange(getMinMax(products, 'inStock'));
    setShowLowStock(false);
    setSelectedCategories(allCategories);
    setSortBy('name');
    setSortOrder('asc');
  };

  // Add new product
  const addProduct = (newProduct) => {
    const id = Math.max(0, ...products.map(p => p.id)) + 1;
    const product = {
      ...newProduct,
      id,
      date: new Date().toISOString().split('T')[0]
    };
   
    setProducts([...products, product]);
    return product;
  };

  // Delete single product
  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Delete multiple products
  const deleteProducts = (ids) => {
    setProducts(products.filter(product => !ids.includes(product.id)));
  };

  // Update product
  const updateProduct = (id, updatedFields) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, ...updatedFields } : product
    ));
  };

  // Context value
  const value = {
    products,
    filteredProducts,
    sortedProducts,
    priceRange,
    unitsSoldRange,
    inStockRange,
    showLowStock,
    lowStockThreshold,
    sortBy,
    sortOrder,
    selectedCategories,
    allCategories,
    setPriceRange,
    setUnitsSoldRange,
    setInStockRange,
    setShowLowStock,
    setLowStockThreshold,
    setSortBy,
    setSortOrder,
    setSelectedCategories,
    addProduct,
    deleteProduct,
    deleteProducts,
    updateProduct,
    applyStockFilter,
    resetFilters, 
    getMinMax 
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);