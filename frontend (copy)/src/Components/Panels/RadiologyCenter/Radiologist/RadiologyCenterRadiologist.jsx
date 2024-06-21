import { Box, Button, Flex, Heading, IconButton, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon, useDisclosure } from '@chakra-ui/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useContext, useState } from 'react';
import RadiologyCenterAssignScanToRadiologist from './RadiologyCenterAssignScanToRadiologist';
import { RadiologyCenterRadiologistContext } from '../../../../Context/RadiologyCenterContext/RadiologyCenterRadiologistContext';

function RadiologyCenterRadiologists() {
  const { radiologists, loading, error } = useContext(RadiologyCenterRadiologistContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRadiologistId, setSelectedRadiologistId] = useState('');
  const handleAssignScan = (radiologistId) => {
    setSelectedRadiologistId(radiologistId);
    onOpen();
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
        <Heading as="h1" size="lg">Manage Radiologists</Heading>
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Number of Working Scans</Th>
            <Th>Start Working Hour</Th>
            <Th>End Working Hour</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {radiologists.data.map((radiologist, index) => (
            <Tr key={index}>
              <Td>{radiologist.name}</Td>
              <Td>{radiologist.numberOfFinishedScans}</Td>
              <Td>{radiologist.startHour}</Td>
              <Td>{radiologist.endHour}</Td>
              <Td>
                <Flex align="center">
                  <IconButton aria-label="View Details" icon={<VisibilityIcon />} size="sm" colorScheme="blackAlpha" mr={2} />
                  <Button colorScheme="purple" onClick={() => handleAssignScan(radiologist.id)} size="sm" >Assign Scan</Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <RadiologyCenterAssignScanToRadiologist isOpen={isOpen} onClose={onClose} selectedRadiologistId={selectedRadiologistId} />
    </Box>
  );
}

export default RadiologyCenterRadiologists;