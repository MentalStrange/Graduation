import { useContext } from 'react';
import { Box, SimpleGrid, Spinner, Alert, AlertIcon, Heading, Text, Image } from '@chakra-ui/react';
import { ScansContext } from '../../../../Context/PatientContext/ScansContext';

function PatientScans() {
  const { scans, loading, error } = useContext(ScansContext);

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
      <Heading as="h1" size="lg" mb={4}>Your Scans</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {scans.data.map((scan) => (
          <Box key={scan.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md">
            <Image src={scan.image} alt={scan.name} borderRadius="md" mb={4} />
            <Text fontWeight="bold" mb={2}>{scan.name}</Text>
            <Text mb={2}>Date: {new Date(scan.date).toLocaleDateString()}</Text>
            <Text mb={2}>Type: {scan.type}</Text>
            <Text>Status: {scan.status}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default PatientScans;