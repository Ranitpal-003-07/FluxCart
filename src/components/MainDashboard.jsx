import {
  VStack,
} from '@chakra-ui/react';

import DataTable from './DataTable';
import ChartPanel from './ChartPanel';
import SummaryCards from './SummaryCards';



export default function MainDashboard() {

  
  return (
      <VStack spacing={6} align="stretch">
        <SummaryCards />
        <ChartPanel/>
        <DataTable/>
      </VStack>
  );
}