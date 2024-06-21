import { Flex, Heading, Icon, Stack, Text, SimpleGrid, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AppointmentsWorkingArea from "./AppointmentsWorkingArea";
import DoctorCard from "./DoctorCard";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { DoctorsContext } from "../../../Context/PatientContext/PatientDoctorsContext";
import { PatientContext } from "../../../Context/PatientContext/PatientContext";
import ReportWorkingAreaPatient from "./ReportWorkingAreaPatient";

function PatientPanelWorkingArea() {
  const { doctors, loading: doctorsLoading, error: doctorsError } = useContext(DoctorsContext);
  const { patient, loading: patientLoading, error: patientError } = useContext(PatientContext);

  if (doctorsLoading || patientLoading) {
    return <Spinner />;
  }

  if (doctorsError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {doctorsError.message}
      </Alert>
    );
  }

  if (patientError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {patientError.message}
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
            <Heading m={0}>Welcome {patient.data.name}</Heading>
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
              {doctors.data.map((doctor) => (
                <DoctorCard key={doctor.id} {...doctor} />
              ))}
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