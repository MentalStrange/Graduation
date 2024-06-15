import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Icon, Box, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditNoteIcon from '@mui/icons-material/EditNote';

const patientData = [
  {
    name: "Ahmed Mohamed",
    type: "patient",
    date: "Jan 25, 2024",
    time: "10:00 AM",
    location: "Design Studio A",
    status: "Completed"
  },
  {
    name: "Mohamed Ahmed Abas",
    type: "patient",
    date: "Feb 5, 2024",
    time: "02:00 PM",
    location: "Computer Lab 2",
    status: "Completed"
  },
  {
    name: "Mohsen Elsayed",
    type: "patient",
    date: "Mar 10, 2024",
    time: "01:00 PM",
    location: "Design Lab 1",
    status: "Upcoming"
  },
  {
    name: "Hasnen hassan",
    type: "patient",
    date: "Apr 2, 2024",
    time: "09:45 AM",
    location: "Lecture Hall B",
    status: "Upcoming"
  },
  {
    name: "Amr Mohsen",
    type: "Guest",
    date: "May 15, 2024",
    time: "11:15 AM",
    location: "Prototype Lab",
    status: "Upcoming"
  },
  {
    name: "Mohamed Saied",
    type: "Guest",
    date: "June 8, 2024",
    time: "02:15 PM",
    location: "Design Studio B",
    status: "Upcoming"
  },
  {
    name: "Ehasan saad",
    type: "Guest",
    date: "Nov 20, 2024",
    time: "02:00 PM",
    location: "Design Studio B",
    status: "Upcoming"
  },
];
  
function AppointmentsWorkingArea() {
  return (
    <Box mt={8}>
      <Flex align={"center"} justify={"space-between"} mb={2}>
      <Flex align={"center"}>
              <Icon mr={1} as={EditNoteIcon} />
              <Text m={0}>Patient Board</Text>
            </Flex>
        <Link color="blue.500">
          <Link to="/panel/patient/appointments">View All <Icon as={ArrowForwardIcon} /></Link>
          </Link>
      </Flex>
      <hr />
      <TableContainer maxH="300px" overflowY="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
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
            {patientData.map((patient, index) => (
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
  );
}

export default AppointmentsWorkingArea;
