import { Flex, Heading, Icon, Stack, Text, SimpleGrid, Box, Spinner, useToast } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PatientPageAppointments from "./PatientPageComponents/PatientPageAppointments";
import PatientPagePrescriptions from "./PatientPageComponents/PatientPagePrescriptions";
import PatientPageReports from "./PatientPageComponents/PatientPageReports";
import PatientPageScans from "./PatientPageComponents/PatientPageScans";
import useFetch from "../../../../Hooks/useFetch";
import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

function DoctorPatientPage() {
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
          <Heading mt={4} size="lg">Patient Name: {patientData.patient.name}</Heading>
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
            {patientData.appointments.map((item, index) => (
              <PatientPageAppointments key={index} appointments={item} />
            ))}
          </SimpleGrid>
          <PatientPagePrescriptions prescriptions={patientData.prescriptions} />
        </Stack>
      </Box>
      <Stack flex="1">
        <Stack>
          <PatientPageReports reports={patientData.reports} />
        </Stack>
        <Stack>
          <PatientPageScans scans={patientData.scans} />
        </Stack>
      </Stack>
    </Flex>
  );
}

export default DoctorPatientPage;
