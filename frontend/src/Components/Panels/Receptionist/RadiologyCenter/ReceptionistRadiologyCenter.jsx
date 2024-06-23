import { Box, Button, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useReceptionistState } from '../../../../Context/ReceptionistContext.jsx/ReceptionistContext';

function ReceptionistRadiologyCenter() {
  const { radiologyCenter, loading, error } = useReceptionistState();

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

  if (!radiologyCenter || radiologyCenter.length === 0) {
    return (
      <Box p={4}>
        <Alert status="info">
          <AlertIcon />
          No radiology centers available.
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="lg">Manage Radiology Centers</Heading>
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Radiology Center Name</Th>
            <Th>Specialization</Th>
            <Th>Phone Number</Th>
            <Th>Availability</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {radiologyCenter?.data?.map((center, index) => (
            <Tr key={index}>
              <Td>{center.name}</Td>
              <Td>{center.specialization}</Td>
              <Td>{center.phoneNumber}</Td>
              <Td>{center.availability}</Td>
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

export default ReceptionistRadiologyCenter;