import { Box, Button, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useContext } from 'react';
import { ReceptionistRadiologyCenterContext } from '../../../../Context/ReceptionistContext.jsx/ReceptionistRadiologyCenterContext';


function ReceptionistRadiologyCenter() {
  const { radiologyCenter, loading, error } = useContext(ReceptionistRadiologyCenterContext);

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
            <Th>Radiology Center Name</Th>
            <Th>Specialization</Th>
            <Th>Phone Number</Th>
            <Th>Availability</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {radiologyCenter.data.map((radiologyCenter, index) => (
            <Tr key={index}>
              <Td>{radiologyCenter.name}</Td>
              <Td>{radiologyCenter.specialization}</Td>
              <Td>{radiologyCenter.phoneNumber}</Td>
              <Td>{radiologyCenter.availability}</Td>
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