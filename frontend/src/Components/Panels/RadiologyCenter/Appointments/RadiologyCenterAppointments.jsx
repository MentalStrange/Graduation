import { Box, Flex, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function RadiologyCenterAppointments() {
  const appointments = [
    { firstName: 'Jane', lastName: 'Cooper', phone: '+91 9876543210', date: '13-Aug-2023 at 10:00 AM', status: 'Open' },
    { firstName: 'Wade', lastName: 'Warren', phone: '+91 9876543210', date: '13-Aug-2023 at 10:00 AM', status: 'Booked' },
    { firstName: 'Brooklyn', lastName: 'Simmons', phone: '+91 9876543210', date: '13-Aug-2023 at 10:00 AM', status: 'Completed' },
    { firstName: 'Cameron', lastName: 'Williamson', phone: '+91 9876543210', date: '13-Aug-2023 at 10:00 AM', status: 'Open' },
    { firstName: 'Leslie', lastName: 'Alexander', phone: '+91 9876543210', date: '13-Aug-2023 at 10:00 AM', status: 'Open' },
    { firstName: 'Savannah', lastName: 'Nguyen', phone: '+91 9876543210', date: '13-Aug-2023 at 10:00 AM', status: 'Open' },
    { firstName: 'Darlene', lastName: 'Robertson', phone: '+91 9876543210', date: '13-Aug-2023 at 10:00 AM', status: 'Completed' },
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
const itemsPerPage = 6;
  const pageCount = Math.ceil(appointments.length / itemsPerPage);
  return (
    
    <Flex height="85vh" overflowY="auto">
      <Box flex="1" p="4" >
        <Heading mb="4" textAlign={'center'}>Manage Appointments</Heading>
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Phone Number</Th>
                <Th>Appointment Date & Time</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments.map((appointment, index) => (
                <Tr key={index}>
                  <Td>{appointment.firstName}</Td>
                  <Td>{appointment.lastName}</Td>
                  <Td>{appointment.phone}</Td>
                  <Td>{appointment.date}</Td>
                  <Td>
                    <Badge colorScheme={appointment.status === 'Open' ? 'green' : appointment.status === 'Booked' ? 'orange' : 'red'}>
                      {appointment.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Button colorScheme="green" size="sm" mr="2">Accept</Button>
                    <Button colorScheme="red" size="sm" mr="2">🗑️</Button>
                    <Button colorScheme="gray" size="sm">👁️</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
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
    </Flex>
  );
}

export default RadiologyCenterAppointments;