import { useState } from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, VStack, Grid, Alert, AlertIcon, Spinner } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRadiologyCenterState } from '../../../../Context/RadiologyCenterContext/RadiologyCenterContext';
import { formatDate } from '../../../../../Utils/formatDate';

const color = [
  'red.100',
  'green.100',
  'blue.100',
  'orange.100',
]

function RadiologyCenterReports() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const state = useRadiologyCenterState();  // Corrected the use of the hook
  const { reports, loading, error } = state;
  console.log(reports);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
            <Heading size="lg">Reports</Heading>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
            {reports.data?.data?.map((report, index) => (
              <Box key={index} p="4" borderWidth="2.5px" borderRadius="lg" borderColor={color[index % color.length]}>
                <Flex justify="space-between" align="center" mb="2">
                  <Heading size="md">{report.patient}</Heading>
                </Flex>
                <Text>Radiologist: {report.radiologist}</Text>
                <Text>Due Date: {formatDate(report.date)}</Text>
                <Text>Description: {report.description}</Text>
                <Text>Examination: {report.examination}</Text>
              </Box>
            ))}
          </SimpleGrid>
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

export default RadiologyCenterReports;
