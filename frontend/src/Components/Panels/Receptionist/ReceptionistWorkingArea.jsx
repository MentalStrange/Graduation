import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Icon, Text, TableContainer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditNoteIcon from '@mui/icons-material/EditNote';

const ReceptionistWorkingArea = () => {
  const records = [
    { name: 'Ahmed Mohamed', service: 'Scan', date: 'Jan 25, 2024', time: '10:00 AM', location: 'Design Studio A', status: 'Completed' },
    { name: 'Mohamed Ahmed Abas', service: 'Prescription', date: 'Feb 5, 2024', time: '02:00 PM', location: 'Computer Lab 2', status: 'Completed' },
    { name: 'Mohsen Elsayed', service: 'Visit', date: 'Mar 10, 2024', time: '01:00 PM', location: 'Design Lab 1', status: 'Upcoming' },
    { name: 'Hassen hassan', service: 'Pharmacy', date: 'Apr 2, 2024', time: '09:45 AM', location: 'Lecture Hall B', status: 'Upcoming' },
    { name: 'Amr Mohsen', service: 'Radiology', date: 'May 15, 2024', time: '11:15 AM', location: 'Prototype Lab', status: 'Upcoming' },
    { name: 'Mohamed Saied', service: 'Radiology Center', date: 'June 8, 2024', time: '02:15 PM', location: 'Design Studio B', status: 'Upcoming' },
    { name: 'Ehasan saad', service: 'Therapist', date: 'Nov 20, 2024', time: '2:00 PM', location: 'Design Studio B', status: 'Upcoming' },
    { name: 'Ehasan saad', service: 'Therapist', date: 'Nov 20, 2024', time: '2:00 PM', location: 'Design Studio B', status: 'Upcoming' },
    { name: 'Ehasan saad', service: 'Therapist', date: 'Nov 20, 2024', time: '2:00 PM', location: 'Design Studio B', status: 'Upcoming' },
    { name: 'Ehasan saad', service: 'Therapist', date: 'Nov 20, 2024', time: '2:00 PM', location: 'Design Studio B', status: 'Upcoming' },
    { name: 'Ehasan saad', service: 'Therapist', date: 'Nov 20, 2024', time: '2:00 PM', location: 'Design Studio B', status: 'Upcoming' },
  ];

  return (
    <Box p={5}>
      <Box display="flex" justifyContent="space-around" mb={5}>
        <Link to={'/panel/receptionist/addNewDoctor'}>
        <Button colorScheme="purple">Add New Doctor <Icon as={ArrowForwardIcon}/></Button>
        </Link>

        <Link to={'/panel/receptionist/addNewRadiologyCenter'}>
        <Button colorScheme="purple">Add Radiology Center <Icon as={ArrowForwardIcon}/></Button>
        </Link>
        <Link to={'/panel/receptionist/addNewRadiologist'}>
        <Button colorScheme="purple">Add New Radiologist <Icon as={ArrowForwardIcon}/></Button>
        </Link>
      </Box>
      <Box mt={8}>
      <Flex align={"center"} justify={"space-between"} mb={2}>
      <Flex align={"center"}>
              <Icon mr={1} as={EditNoteIcon} />
              <Text m={0}>Patient Board</Text>
            </Flex>
        <Link href="#" color="blue.500">View All <Icon as={ArrowForwardIcon} /></Link>
      </Flex>
      <hr />
      <TableContainer maxH="600px" overflowY="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
        <Table variant="striped" colorScheme="gray">
          <Thead position="sticky" top={0} bgColor="gray.100" zIndex={1}>
            <Tr>
              <Th>Patient Name</Th>
              <Th>Type</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Location</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {records.map((patient, index) => (
              <Tr key={index}>
                <Td>{patient.name}</Td>
                <Td>{patient.type}</Td>
                <Td>{patient.date}</Td>
                <Td>{patient.time}</Td>
                <Td>{patient.location}</Td>
                <Td>{patient.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
    </Box>
  );
};

export default ReceptionistWorkingArea;