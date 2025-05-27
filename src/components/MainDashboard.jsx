/* eslint-disable no-unused-vars */
import {
  Box,
  VStack,
 
} from '@chakra-ui/react';

import DataTable from './DataTable';
import ChartPanel from './ChartPanel';
import SummaryCards from './SummaryCards';



export default function MainDashboard() {
  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Summary Cards */}
        <SummaryCards />

        {/* Chart Panel */}
        <ChartPanel/>

        <DataTable/>

      </VStack>

      
    </Box>
  );
}