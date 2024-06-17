import { Box, Button, Flex, Heading, IconButton, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon, useDisclosure } from '@chakra-ui/react';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useContext } from 'react';
import AddAppointment from './AddAppointment';
import { AppointmentsContext } from '../../../../Context/PatientContext/AppointmentContext';

function PatientAppointments() {
  const { appointments, loading, error, setAppointments } = useContext(AppointmentsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAppointmentAdded = (newAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
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
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="lg">Manage Appointments</Heading>
        <Button colorScheme="purple" leftIcon={<ArrowForwardIcon />} onClick={onOpen}>
          Add Appointment
        </Button>
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Dr.Name</Th>
            <Th>Specialization</Th>
            <Th>Phone Number</Th>
            <Th>Appointment Date & Time</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {appointments.data.map((appointment, index) => (
            <Tr key={index}>
              <Td>{appointment.doctor}</Td>
              <Td>{appointment.user}</Td>
              <Td>{appointment.date}</Td>
              <Td>{appointment.timeSlot}</Td>
              <Td>
                <Button size="sm" colorScheme={appointment.status === 'Completed' ? 'red' : 'green'} variant="outline">
                  {appointment.status}
                </Button>
              </Td>
              <Td>
                <Flex align="center">
                  <Button size="sm" colorScheme="purple" mr={2}>Pay Now</Button>
                  <Button size="sm" colorScheme="purple" mr={2} w={"80px"} isDisabled={appointment.status === 'Booked'}>
                    {appointment.status === 'Completed' ? 'Re-Book' : 'Book Now'}
                  </Button>
                  <IconButton aria-label="Delete" icon={<DeleteIcon />} size="sm" colorScheme="red" mr={2} />
                  <IconButton aria-label="View" icon={<VisibilityIcon />} size="sm" colorScheme="blackAlpha" />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Pagination */}
      <Flex justify="center" align="center" mt={4}>
        <Button size="sm" mr={2}>Previous</Button>
        <Button size="sm" mr={2}>1</Button>
        <Button size="sm" mr={2}>2</Button>
        <Button size="sm" mr={2}>3</Button>
        <Button size="sm">Next</Button>
      </Flex>
      <AddAppointment isOpen={isOpen} onClose={onClose} onAppointmentAdded={handleAppointmentAdded} />
    </Box>
  );
}

export default PatientAppointments;