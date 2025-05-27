import { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Avatar,
  Grid,
  useColorModeValue,
  Container,
  Heading,
  Divider
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, CheckCircle, FolderOpen, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar'; 
import Sidebar from '../components/Sidebar';
import MainDashboard from '../components/MainDashboard';
import Profile from './Profile';
import HowToUse from './HowToUse';



const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <Profile />
        );
      
      case 'howtouse':
        return (
          <HowToUse />
        );
      
      default:
        return (
          <MainDashboard />
        );
    }
  };

 return (
  <Flex h="100vh" bg={bgColor}>
    {/* Sidebar with fixed width */}
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

    {/* Main Content Area */}
    <Box 
      flex={1} 
      overflow="auto" 
      ml="280px" // Add margin-left equal to sidebar width
      width="calc(100% - 280px)" // Subtract sidebar width
    >
      {/* Navbar */}
      <Navbar  activeTab={activeTab}/>
      
      {/* Page Content */}
      {renderContent()}
    </Box>
  </Flex>
);
}

export default Dashboard;