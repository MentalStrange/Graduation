import { useContext } from 'react';
import { Box, Flex, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Badge, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DoctorAppointmentsContext } from '../../../../Context/DoctorContext/DoctorAppointmentsContext';

function DoctorAppointments() {
  const { appointments, loading, error } = useContext(DoctorAppointmentsContext);

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
    <Flex height="85vh" overflowY="auto">
      <Box flex="1" p="4">
        <Heading mb="4">Manage Appointments</Heading>
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
                    <Button colorScheme="blue" size="sm" mr="2">Pay Now</Button>
                    <Button colorScheme="green" size="sm" mr="2">Accept</Button>
                    <Button colorScheme="red" size="sm" mr="2">🗑️</Button>
                    <Button colorScheme="gray" size="sm">👁️</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justify="center" mt="4">
          <Button variant="outline" mr="2">Previous</Button>
          <Button colorScheme="blue" mr="2">1</Button>
          <Button variant="outline" mr="2">2</Button>
          <Button variant="outline" mr="2">3</Button>
          <Button variant="outline">Next</Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default DoctorAppointments;