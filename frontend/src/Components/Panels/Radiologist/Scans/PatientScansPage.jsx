import { Box, SimpleGrid, Alert, AlertIcon, Image, Text, Stack, Button } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

function PatientScansPage() {
  const location = useLocation();
  const { patientScans } = location.state || { patientScans: [] };
  if (!patientScans.data.length) {
    return <Alert status="info"><AlertIcon />No scans available for this patient.</Alert>;
  }
  console.log(patientScans.data);
  return (
    <Box p={4}>
        <Text fontWeight={"bold"} as={"h4"}>Patient Name: {patientScans.data[0].patient}</Text>
        <hr/>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {patientScans.data.map((scan) => (
          <Stack key={scan._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md" justify="center" align="center">
            <Box position="relative">
              <Image src={scan.image} alt={scan.name} borderRadius="md" mb={4} />
              <a href={scan.image} download>
                <Button position="absolute" right="1" top="1" size="sm">Download</Button>
              </a>
            </Box>
            <Text m={0}>Date: {new Date(scan.date).toLocaleDateString()}</Text>
            <Text m={0}>Type: {scan.type}</Text>
            <Text m={0}>Status: {scan.status == "notReported" ? "Not Reported" : "Reported"}</Text>
            <Text m={0}>Radiologist: {scan.radiologist}</Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default PatientScansPage;
