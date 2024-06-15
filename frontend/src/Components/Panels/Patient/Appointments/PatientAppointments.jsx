import { Box, Button, Flex, Heading, IconButton, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon  from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const appointments = [
  { firstName: 'Jane', lastName: 'Cooper', phoneNumber: '+91 9876543210', dateTime: '13-Aug-2023 at 10:00 AM', status: 'Open' },
  { firstName: 'Wade', lastName: 'Warren', phoneNumber: '+91 9876543210', dateTime: '13-Aug-2023 at 10:00 AM', status: 'Booked' },
  { firstName: 'Brooklyn', lastName: 'Simmons', phoneNumber: '+91 9876543210', dateTime: '13-Aug-2023 at 10:00 AM', status: 'Completed' },
  { firstName: 'Cameron', lastName: 'Williamson', phoneNumber: '+91 9876543210', dateTime: '13-Aug-2023 at 10:00 AM', status: 'Open' },
  // Add more appointment objects here...
];

function PatientAppointments() {
  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="lg">Manage Appointments</Heading>
        <Button colorScheme="purple" leftIcon={<ArrowForwardIcon />}>
          Add Appointment
        </Button>
      </Flex>
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
              <Td>{appointment.phoneNumber}</Td>
              <Td>{appointment.dateTime}</Td>
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
    </Box>
  );
}

export default PatientAppointments;