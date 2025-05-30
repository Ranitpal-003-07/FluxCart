import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductsProvider } from './context/ProductContext.jsx';

createRoot(document.getElementById('root')).render(
    <ChakraProvider>
      <AuthProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </AuthProvider>
    </ChakraProvider>
)
