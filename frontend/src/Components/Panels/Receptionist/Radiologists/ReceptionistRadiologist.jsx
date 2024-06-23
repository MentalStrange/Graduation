import { Box, Button, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useReceptionistState } from '../../../../Context/ReceptionistContext.jsx/ReceptionistContext';

function ReceptionistRadiologist() {
  const { radiologists, loading, error } = useReceptionistState();

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

  if (!radiologists || radiologists.length === 0) {
    return (
      <Box p={4}>
        <Alert status="info">
          <AlertIcon />
          No radiologists available.
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="lg">Manage Radiologists</Heading>
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Radiologist Name</Th>
            <Th>Specialization</Th>
            <Th>Phone Number</Th>
            <Th>Availability</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {radiologists?.data?.map((radiologist, index) => (
            <Tr key={index}>
              <Td>{radiologist.name}</Td>
              <Td>{radiologist.specialization}</Td>
              <Td>{radiologist.phoneNumber}</Td>
              <Td>{radiologist.availability}</Td>
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

export default ReceptionistRadiologist;
