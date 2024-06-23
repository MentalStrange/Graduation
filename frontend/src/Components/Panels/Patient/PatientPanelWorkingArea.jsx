import { Flex, Heading, Icon, Stack, Text, SimpleGrid, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AppointmentsWorkingArea from "./AppointmentsWorkingArea";
import DoctorCard from "./DoctorCard";
import { Link } from "react-router-dom";
import ReportWorkingAreaPatient from "./ReportWorkingAreaPatient";
import { usePatientState } from "../../../Context/PatientContext/PatientContext";


function PatientPanelWorkingArea() {
  const { doctors, patient, loading, error } = usePatientState();
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
    <Flex direction="column" height="100%" overflow="auto" p={4}>
      {/* Main Content */}
      <Flex flexDirection={{ base: "column", lg: "row" }} gap={4} height="100%">
        {/* Left Side - Appointments and Patients Board */}
        <Box flex="3">
          <Stack>
            <Heading m={0}>Welcome {patient?.data?.data?.name || "Patient"}</Heading>
            <Flex align={"center"} justify={"space-between"}>
              <Flex align={"center"}>
                <Icon mr={1} as={HistoryIcon} />
                <Text m={0}>Top Doctors</Text>
              </Flex>
              <Text color={"blue.500"} m={0}>
                <Link to='doctors'>
                  View All <Icon as={ArrowForwardIcon} />
                </Link>
              </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
              {Array.isArray(doctors.data.data) && doctors.data.data.length > 0 ? (
                doctors.data.data.map((doctor) => (
                  <DoctorCard key={doctor.id} {...doctor} />
                ))
              ) : (
                <Alert status="info" borderRadius="md" width="100%">
                  <AlertIcon />
                  No Doctors Available
                </Alert>
              )}
            </SimpleGrid>
            <AppointmentsWorkingArea />
          </Stack>
        </Box>
        <Box flex="1">
          <ReportWorkingAreaPatient />
        </Box>
      </Flex>
    </Flex>
  );
}

export default PatientPanelWorkingArea;
