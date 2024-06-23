import { useState } from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, Button, VStack, Grid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFetch from '../../../../Hooks/useFetch';
import { decodeToken } from '../../../../../Utils/JWT_Decode';

const itemsPerPage = 6;

function DoctorPrescriptions() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const token = localStorage.getItem('userToken');
  const doctorId = decodeToken(token).id;
  const { data, loading, error } = useFetch(`http://localhost:5001/api/v1/prescription/doctor/${doctorId}?date=${selectedDate.toISOString()}`);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = data && data.data ? data.data.slice(offset, offset + itemsPerPage) : [];
  const pageCount = data && data.data ? Math.ceil(data.data.length / itemsPerPage) : 0;

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

  if (!data || !data.data) {
    return (
      <Alert status="info">
        <AlertIcon />
        No prescriptions available.
      </Alert>
    );
  }

  return (
    <Box p="4" height="85vh" overflowY="auto">
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap="4">
        <Box>
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="lg">Prescriptions</Heading>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
            {currentItems.map((prescription, index) => (
              <Box key={index} p="4" borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Text fontSize="xl">Doctor: {prescription.doctor}</Text>
                <Text>Due Date: {formatDate(prescription.date)}</Text>
                <Text>Patient: {prescription.patient}</Text>
                <Text>Description: {prescription.description}</Text>
                <Text>Examination: {prescription.examination}</Text>
                <Text>Drugs:</Text>
                <ul>
                  {prescription.drugs.length > 0 ? prescription.drugs.map((drug, i) => (
                    <li key={i}>{drug}</li>
                  )) : <li>No drugs prescribed</li>}
                </ul>
                <Text>Scans:</Text>
                <ul>
                  {prescription.scans.length > 0 ? prescription.scans.map((scan, i) => (
                    <li key={i}>{scan}</li>
                  )) : <li>No scans prescribed</li>}
                </ul>
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

export default DoctorPrescriptions;
