/* eslint-disable react/prop-types */
import { Box, SimpleGrid, Spinner, Alert, AlertIcon, Image, Text, Stack, Button, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WorkingScan({scans,loading,error}) {
  const navigate = useNavigate();
  const openPatientScans = async (patientId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/scan/patient/${patientId}`);
      const patientScans = response.data;
      console.log(patientScans);
      // Assuming there's a route and component set up to handle viewing all scans for a patient
      navigate(`/panel/radiologist/scans/${patientId}`, { state: { patientScans } });
    } catch (error) {
      console.error('Failed to fetch patient scans:', error);
      alert('Error fetching scans for this patient.');
    }
  };

  const makeScan = (patientId, scanId) => {
  navigate(`/panel/radiologist/patients/${patientId}/makeScan`, { state: { scanId } });
}
  if (loading) return <Spinner />;
  if (error) return <Alert status="error"><AlertIcon />{error.message}</Alert>;

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {scans.data.map((scan) => (
          <Stack key={scan.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md" justify="center" align="center">
            <Box position="relative">
              <Image src={scan.image} alt={scan.name} borderRadius="md" mb={4} />
              <a href={scan.image} download>
                <Button position="absolute" right="1" top="1" size="sm">Download</Button>
              </a>
            </Box>
            <Text m={0} fontWeight={"bold"}>{scan.patient}</Text>
            <Text fontWeight="bold" mb={0}>{scan.name}</Text>
            <Text m={0}>Date: {new Date(scan.date).toLocaleDateString()}</Text>
            <Text m={0}>Type: {scan.type}</Text>
            <Text>Status: Working</Text>
            <Text>Radiologist: {scan.radiologist}</Text>
            <Flex gap={2}>
              <Button  onClick={() => openPatientScans(scan.patientId)} size='sm' variant='outline'>View</Button>
              <Button onClick={() => makeScan(scan.patientId, scan.id)} size='sm' colorScheme='purple'>Make Scan</Button>
            </Flex>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default WorkingScan;