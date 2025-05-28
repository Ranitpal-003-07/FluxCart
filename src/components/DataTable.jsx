import {
  VStack,
} from '@chakra-ui/react';
import Filters from './Filters';
import TableData from './TableData';

const DataTable = () => {

  return (
      <VStack spacing={6} align="stretch" position="relative" zIndex={1}>
        {/* Filters Card */}
        <Filters />
        
        {/* Data Table */}
        <TableData />
      </VStack>
  );
};

export default DataTable;