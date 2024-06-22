import { Box, SimpleGrid, Spinner, Alert, AlertIcon, Heading, Text, Image, Stack } from '@chakra-ui/react';
import useFetch from '../../../../Hooks/useFetch';
import { decodeToken } from '../../../../../Utils/JWT_Decode';

function RadiologyCenterScans() {
  const token = localStorage.getItem('userToken');
  const radiologyCenterId = decodeToken(token).id;
  const { data: scans, loading, error } = useFetch(`http://localhost:5001/api/v1/scan/radiologyCenter/${radiologyCenterId}`);
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
    <Box p={4} overflow={'auto'} h={'85vh'}>
      <Heading as="h1" size="lg" mb={4}>Scans</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {scans.data.map((scan) => (
          <Stack key={scan.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md" justify="center" align="center">
            <Image src={scan.image} alt={scan.name} borderRadius="md" mb={4} />
            <Text m={0} fontWeight={"bold"}>{scan.patient}</Text>
            <Text fontWeight="bold" mb={1}>{scan.name}</Text>
            <Text mb={2}>Date: {new Date(scan.date).toLocaleDateString()}</Text>
            <Text mb={2}>Type: {scan.type}</Text>
            <Text>Status: {scan.status=="notReported"?"Not Reported":"Reported"}</Text>
            <Text>Radiologist: {scan.radiologist}</Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default RadiologyCenterScans;