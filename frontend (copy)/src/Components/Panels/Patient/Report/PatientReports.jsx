import { useState, useContext } from 'react';
import { Box, Flex, Heading, Text, Badge, SimpleGrid, Button, VStack, Grid, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ReportsContext } from '../../../../Context/PatientContext/PatientReportsContext';

const statusColorScheme = {
  'Not Submitted': 'red',
  'Completed': 'green',
  'In Progress': 'purple',
  'Not Started': 'orange',
};

function PatientReports() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { reports, loading, error } = useContext(ReportsContext);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Send request to get the report by date
    fetchReportsByDate(date);
  };

  const fetchReportsByDate = (date) => {
    // Implement the logic to fetch reports by date
    console.log('Fetching reports for date:', date);
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

  return (
    <Box p="4" height="85vh" overflowY="auto">
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap="4">
        <Box>
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="lg">Welcome, Patient</Heading>
            <Button variant="link" colorScheme="blue">View all</Button>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
            {reports.data.map((report, index) => (
              <Box key={index} p="4" borderWidth="1px" borderRadius="lg">
                <Flex justify="space-between" align="center" mb="2">
                  <Heading size="md">{report.type}</Heading>
                  <Badge colorScheme={statusColorScheme[report.status]}>{report.status}</Badge>
                </Flex>
                <Text>Doctor Name: {report.doctor}</Text>
                <Text>Due Date: {report.dueDate}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
        <Box>
          <VStack>
            {/* <CalendarIcon boxSize="6" /> */}
            <Text>{selectedDate.toDateString()}</Text>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
            />
          </VStack>
        </Box>
      </Grid>
      <Flex justify="center" align="center" mt={7}>
        <Button size="sm" mr={2}>Previous</Button>
        <Button size="sm" mr={2}>1</Button>
        <Button size="sm" mr={2}>2</Button>
        <Button size="sm" mr={2}>3</Button>
        <Button size="sm">Next</Button>
      </Flex>
    </Box>
  );
}

export default PatientReports;