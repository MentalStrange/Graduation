import { Box, Flex, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Alert, AlertIcon, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRadiologyCenterState } from '../../../../Context/RadiologyCenterContext/RadiologyCenterContext';

function RadiologyCenterAppointments() {
  const { appointments, loading, error } = useRadiologyCenterState();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  console.log(appointments);

  const handlePageClick = (page) => {
    setCurrentPage(page);
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

  const pageCount = Math.ceil(appointments?.data?.data?.length / itemsPerPage);
  const currentAppointments = appointments?.data?.data?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <Flex height="85vh" overflowY="auto">
      <Box flex="1" p="1">
        <Heading mb="4" textAlign={'center'}>Manage Appointments</Heading>
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Patient Name</Th>
                <Th>Phone Number</Th>
                <Th>Appointment Date & Time</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentAppointments?.map((appointment, index) => (
                <Tr key={index}>
                  <Td>{appointment.patient}</Td>
                  <Td>{appointment.phone}</Td>
                  <Td>{appointment.timeSlot}</Td>
                  <Td>
                    <Button colorScheme={appointment.status === 'Open' ? 'green' : appointment.status === 'Booked' ? 'orange' : 'red'} variant="outline">
                      {appointment.status}
                    </Button>
                  </Td>
                  <Td>
                    <Button colorScheme="green" size="sm" mr="2">Accept</Button>
                    <IconButton aria-label="Delete" icon={<DeleteIcon />} size="sm" colorScheme="red" mr={2} />
                    <IconButton aria-label="View" icon={<VisibilityIcon />} size="sm" colorScheme="blackAlpha" />
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
