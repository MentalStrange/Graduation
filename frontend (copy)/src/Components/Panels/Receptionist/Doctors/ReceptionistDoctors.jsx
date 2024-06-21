import { Box, Button, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useContext } from 'react';
import { ReceptionistDoctorsContext } from '../../../../Context/ReceptionistContext.jsx/ReceptionistDoctorsContext';

function ReceptionistDoctors() {
  const { doctors, loading, error } = useContext(ReceptionistDoctorsContext);

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
        <Heading as="h1" size="lg">Manage Doctors</Heading>
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Doctor Name</Th>
            <Th>Specialization</Th>
            <Th>Phone Number</Th>
            <Th>Availability</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {doctors.data.map((doctor, index) => (
            <Tr key={index}>
              <Td>{doctor.name}</Td>
              <Td>{doctor.specialization}</Td>
              <Td>{doctor.phone}</Td>
              <Td>{doctor.availability}</Td>
              <Td>
                <Flex align="center">
                  <Button size="sm" colorScheme="purple" mr={2}>Edit</Button>
                  <Button size="sm" colorScheme="red">Delete</Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default ReceptionistDoctors;
