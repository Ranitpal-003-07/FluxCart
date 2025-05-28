import {
  VStack,
} from '@chakra-ui/react';

import DataTable from './DataTable';
import ChartPanel from './ChartPanel';
import SummaryCards from './SummaryCards';



export default function MainDashboard() {

  
  return (
      <VStack spacing={6} align="stretch">
        {/* Summary Cards */}
        <SummaryCards />

        {/* Chart Panel */}
        <ChartPanel/>

        <DataTable/>

      </VStack>
  );
}