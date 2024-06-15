import { useState } from 'react';
import { Box, Flex, Heading, Text, Badge, SimpleGrid, Button, VStack, Grid } from '@chakra-ui/react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const reports = [
  { type: 'MRI Report', doctor: 'Mohamed Ramadan', dueDate: 'February 10, 2024', status: 'Not Submitted' },
  { type: 'CT Report', doctor: 'Ahmed Mohamed', dueDate: 'March 5, 2024', status: 'Completed' },
  { type: 'X-ray', doctor: 'Amany Mohamed', dueDate: 'April 15, 2024', status: 'In Progress' },
  { type: 'MRI Report', doctor: 'Enas Mohamed', dueDate: 'April 8, 2024', status: 'Not Started' },
  { type: 'CT Report', doctor: 'Yasmin Mohamed', dueDate: 'May 20, 2024', status: 'Not Submitted' },
  { type: 'CT Report', doctor: 'Yasmin Mohamed', dueDate: 'May 20, 2024', status: 'Not Submitted' },
  { type: 'CT Report', doctor: 'Yasmin Mohamed', dueDate: 'May 20, 2024', status: 'Not Submitted' },
  { type: 'CT Report', doctor: 'Yasmin Mohamed', dueDate: 'May 20, 2024', status: 'Not Submitted' },
  { type: 'CT Report', doctor: 'Yasmin Mohamed', dueDate: 'May 20, 2024', status: 'Not Submitted' },
  { type: 'CT Report', doctor: 'Yasmin Mohamed', dueDate: 'May 20, 2024', status: 'Not Submitted' },
  { type: 'CT Report', doctor: 'Yasmin Mohamed', dueDate: 'May 20, 2024', status: 'Not Submitted' },
];

const statusColorScheme = {
  'Not Submitted': 'red',
  'Completed': 'green',
  'In Progress': 'purple',
  'Not Started': 'orange',
};

function DoctorReports() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Send request to get the report by date
    fetchReportsByDate(date);
  };

  const fetchReportsByDate = (date) => {
    // Implement the logic to fetch reports by date
    console.log('Fetching reports for date:', date);
  };

  return (
    <Box p="4" height="85vh" overflowY="auto">
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap="4">
        <Box>
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="lg">Welcome, Patient</Heading>
            <Button variant="link" colorScheme="blue">View all</Button>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
            {reports.map((report, index) => (
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
    </Box>
  );
}

export default DoctorReports;