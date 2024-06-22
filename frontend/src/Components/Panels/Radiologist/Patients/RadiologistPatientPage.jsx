import { Flex, Heading, Icon, Stack, Text, SimpleGrid, Box, Spinner, useToast } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RadiologistPageAppointments from "./RadiologistPageComponents/RadiologistPageAppointments";
import RadiologistPagePrescriptions from "./RadiologistPageComponents/RadiologistPagePrescriptions";
import RadiologistPageReports from "./RadiologistPageComponents/RadiologistPageReports";
import RadiologistPageScans from "./RadiologistPageComponents/RadiologistPageScans";
import useFetch from "../../../../Hooks/useFetch";
import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

function RadiologistPatientPage() {
  const { patientId } = useParams(); // Corrected usage
  const { data, loading, error } = useFetch(`http://localhost:5001/api/v1/patient/${patientId}/details`);
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom"
      });
    }
  }, [error, toast]);

  if (loading) return <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" />;
  if (!data || data.status !== 'success') return (
    <Box>
      <Text>No data available for this patient.</Text>
    </Box>
  );

  const patientData = data.data;

  return (
    <Flex mx={4} flexDirection={{ base: "column", lg: "row" }} gap={4} overflow={'auto'} h={'85vh'}>
      <Box flex="3">
        <Stack>
          <Heading m={0}>Patient Name: {patientData.patient.name}</Heading>
          <Flex align={"center"} justify={"space-between"}>
            <Flex align={"center"}>
              <Icon mr={1} as={HistoryIcon} />
              <Text m={0}>Appointments</Text>
            </Flex>
            <Link to="appointments" color="blue.500">
              View All <Icon as={ArrowForwardIcon} />
            </Link>
          </Flex>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
            {patientData.appointments.slice(0, 4).map((item, index) => (
              <RadiologistPageAppointments key={index} appointments={item} />
            ))}
          </SimpleGrid>
          <RadiologistPagePrescriptions prescriptions={patientData.prescriptions} />
        </Stack>
      </Box>
      <Stack flex="1">
        <Flex direction="column" height="10%">
          <Box flex="2">
            <RadiologistPageScans scans={patientData.scans} />
          </Box>
          <Box flex="1">
            <RadiologistPageReports reports={patientData.reports}/>
          </Box>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default RadiologistPatientPage;