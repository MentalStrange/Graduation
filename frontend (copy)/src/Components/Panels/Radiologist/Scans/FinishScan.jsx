/* eslint-disable react/prop-types */

import { Box, SimpleGrid, Spinner, Alert, AlertIcon, Image, Text, Stack, Button } from '@chakra-ui/react';

function FinishScan({scans, loading, error}) {
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
            <Text fontWeight="bold" mb={1}>{scan.name}</Text>
            <Text mb={2}>Date: {new Date(scan.date).toLocaleDateString()}</Text>
            <Text mb={2}>Type: {scan.type}</Text>
            <Text>Status: Finished</Text>
            <Text>Radiologist: {scan.radiologist}</Text>
            {/* <Button mt={2} onClick={() => openPatientScans(scan.patient)}>View All Scans for {scan.patient}</Button> */}
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default FinishScan;