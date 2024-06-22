import { useState } from 'react';
import { Box, Flex, Heading, Text, Badge, SimpleGrid, Button, VStack, Grid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRadiologistState, useRadiologistDispatch } from '../../../../Context/RadiologistContext/RadiologistContext';
import { formatDate } from '../../../../../Utils/formatDate';
import api from '../../../../Api/Api';

const statusColorScheme = {
  pending: 'orange',
  completed: 'green',
  delayed: 'red',
  inProgress: 'purple'
};

const itemsPerPage = 6;

function RadiologistReports() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { reports, loading, error } = useRadiologistState();
  const dispatch = useRadiologistDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchReportsByDate(date);
  };

  const fetchReportsByDate = async (date) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.get(`/report/radiologist/date/${date.toISOString()}`);
      dispatch({ type: 'SET_REPORTS', payload: { data: response.data.data } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  if (loading) {
    return <Spinner color="blue.500" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  const reportsData = Array.isArray(reports.data.data) ? reports.data.data : [];
  const offset = currentPage * itemsPerPage;
  const currentItems = reportsData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(reportsData.length / itemsPerPage);

  return (
    <Box p="4" height="85vh" overflowY="auto">
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap="4">
        <Box bg="white">
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="lg">Reports</Heading>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
            {currentItems.map((report, index) => (
              <Box key={index} p="4" borderWidth="1px" borderRadius="lg">
                <Flex justify="space-between" align="center" mb="2">
                  <Heading size="md" color="purple.800">{report.patient}</Heading>
                  <Badge colorScheme={statusColorScheme[report.status]}>{report.status}</Badge>
                </Flex>
                <Text fontSize="sm">Doctor Name: {report.radiologist}</Text>
                <Text fontSize="sm">Due Date: {formatDate(report.date)}</Text>
                <Text fontSize="sm">Examination: {report.examination}</Text>
                <Text fontSize="sm">Description: {report.description}</Text>
                <Text fontSize="sm">Note: {report.note}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
        <Box bg="white" shadow="md">
          <VStack spacing="4">
            <Text fontSize="lg" fontWeight="bold">{selectedDate.toDateString()}</Text>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              calendarClassName="custom-datepicker"
            />
          </VStack>
        </Box>
      </Grid>
      <Flex justify="center" align="center" mt={7}>
        <Button
          size="sm"
          mr={2}
          onClick={() => handlePageClick(currentPage - 1)}
          isDisabled={currentPage === 0}
          colorScheme="purple"
        >
          Previous
        </Button>
        {Array.from({ length: pageCount }, (_, index) => (
          <Button
            key={index}
            size="sm"
            mr={2}
            onClick={() => handlePageClick(index)}
            isActive={currentPage === index}
            colorScheme="gray"
          >
            {index + 1}
          </Button>
        ))}
        <Button
          size="sm"
          onClick={() => handlePageClick(currentPage + 1)}
          isDisabled={currentPage === pageCount - 1}
          colorScheme="purple"
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}

export default RadiologistReports;
