import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Icon, Box, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { usePatientState } from "../../../Context/PatientContext/PatientContext";

function AppointmentsWorkingArea() {
  const { appointments, loading, error } = usePatientState();

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

  // Ensure appointments.data exists and is an array
  const appointmentsData = appointments.data.data|| [];
  return (
    <Box mt={8}>
      <Flex align={"center"} justify={"space-between"} mb={2}>
        <Flex align={"center"}>
          <Icon mr={1} as={EditNoteIcon} />
          <Text m={0}>Appointments Board</Text>
        </Flex>
        <Text color="blue.500" m={0}>
          <Link to="/panel/patient/appointments">View All <Icon as={ArrowForwardIcon} /></Link>
        </Text>
      </Flex>
      <hr />
      <TableContainer maxH="300px" overflowY="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
        <Table variant="striped" colorScheme="gray">
          <Thead position="sticky" top={0} bgColor="gray.100" zIndex={1}>
            <Tr>
              <Th>Doctor Name</Th>
              <Th>Specialization</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointmentsData.map((appointment, index) => (
              <Tr key={index}>
                <Td>{appointment.doctor}</Td>
                <Td>{appointment.specialization}</Td>
                <Td>{appointment.date}</Td>
                <Td>{appointment.timeSlot}</Td>
                <Td>{appointment.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AppointmentsWorkingArea;
