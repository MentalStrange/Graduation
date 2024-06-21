import { Box, Button, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useContext } from 'react';
import { ReceptionistRadiologistsContext } from '../../../../Context/ReceptionistContext.jsx/ReceptionistRadiologistsContext';



function ReceptionistRadiologist() {
  const { radiologists, loading, error } = useContext(ReceptionistRadiologistsContext);

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
          {radiologists.data.map((radiologist, index) => (
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
