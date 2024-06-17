import { useState, useContext } from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, Button, VStack, Grid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PrescriptionsContext } from '../../../../Context/PatientContext/PrescriptionsContext';

const itemsPerPage = 6;

function PatientPrescriptions() {
  const { prescriptions, loading, error } = useContext(PrescriptionsContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Implement the logic to fetch prescriptions by date if needed
    console.log('Fetching prescriptions for date:', date);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  const offset = currentPage * itemsPerPage;
  const currentItems = prescriptions.data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(prescriptions.length / itemsPerPage);

  return (
    <Box p="4" height="85vh" overflowY="auto">
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap="4">
        <Box>
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="lg">Prescriptions</Heading>
            <Button variant="link" colorScheme="blue">View all</Button>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
            {currentItems.map((prescription, index) => (
              <Box key={index} p="4" borderWidth="1px" borderRadius="lg">
                <Text fontSize="xl">{prescription.doctor}</Text>
                <Text>Due Date: {prescription.dueDate}</Text>
                {prescription.drugs.map((drug, i) => (
                  <Text key={i}>{drug}</Text>
                ))}
                {prescription.scans.map((scan, i) => (
                  <Text key={i}>{scan}</Text>
                ))}
              </Box>
            ))}
          </SimpleGrid>
          <Flex justify="center" mt={4}>
            <Button
              onClick={() => handlePageClick(currentPage - 1)}
              isDisabled={currentPage === 0}
              size="sm" mr={2}
            >
              Previous
            </Button>
            {Array.from({ length: pageCount }, (_, index) => (
              <Button
                key={index}
                onClick={() => handlePageClick(index)}
                isActive={currentPage === index}
                size="sm" mr={2}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              onClick={() => handlePageClick(currentPage + 1)}
              isDisabled={currentPage === pageCount - 1}
              size="sm" mr={2}
            >
              Next
            </Button>
          </Flex>
        </Box>
        <Box>
          <VStack>
            <Text>{selectedDate.toDateString()}</Text>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
            />
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}

export default PatientPrescriptions;