import React, { useState } from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, Button, VStack, Grid } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const prescriptionsData = [
  {
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },
  {
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },{
    doctor: "Dr. Ahmed Mohamed",
    dueDate: "February 10, 2024",
    drugs: ["Drug 1: lorem lorem lorem lorem", "Drug 2: lorem lorem lorem lorem", "Drug 3: lorem lorem lorem lorem"],
    scans: ["Scan 1: MRI on Brain", "Scan 2: CT on Brain"]
  },
];

const itemsPerPage = 6;

function PatientPrescriptions() {
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

  const offset = currentPage * itemsPerPage;
  const currentItems = prescriptionsData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(prescriptionsData.length / itemsPerPage);

  return (
    <Box p="4" height="85vh" overflowY="auto">
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap="4">
        <Box>
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="lg">Welcome, Patient</Heading>
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