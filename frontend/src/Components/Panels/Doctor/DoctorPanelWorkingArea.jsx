import { Flex, Heading, Icon, Stack, Text, SimpleGrid, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import AppointmentsWorkingArea from "./AppointmentsWorkingArea";
import DoctorPanelPatientBoard from "./DoctorPanelPatientBoard";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDoctorState } from "../../../Context/DoctorContext/DoctorContext"; // Use the combined DoctorContext
import PrescriptionWorkingArea from "./PrescriptionWorkingArea";
import { Link } from "react-router-dom";

function DoctorPanelWorkingArea() {
  const { appointments, doctor, loading, error } = useDoctorState();
  
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

  // Access the nested data array
  const appointmentsData = appointments?.data?.data || [];
  const doctorData = doctor?.data?.data || {};

  return (
    <Flex mx={4} flexDirection={{ base: "column", lg: "row" }} gap={4}>
      {/* Left Side - Appointments and Patients Board */}
      <Box flex="3">
        <Stack>
          <Heading mt={4} size="lg">Welcome Dr. {doctorData.name || 'N/A'}</Heading>
          <Flex align={"center"} justify={"space-between"}>
            <Flex align={"center"}>
              <Icon mr={1} as={HistoryIcon} />
              <Text m={0}>Appointments</Text>
            </Flex>
            <Text color={"blue.500"}>  
            <Link to="appointments" color="blue.500">
              View All <Icon as={ArrowForwardIcon} />
            </Link>
            </Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
            {appointmentsData.length > 0 ? (
              appointmentsData.slice(0, 4).map((item, index) => (
                <AppointmentsWorkingArea key={index} data={item} />
              ))
            ) : (
              <Text>No Appointments Available</Text>
            )}
          </SimpleGrid>
          <DoctorPanelPatientBoard />
        </Stack>
      </Box>

      {/* Right Side - Prescriptions */}
      <Box flex="1">
        <PrescriptionWorkingArea />
      </Box>
    </Flex>
  );
}

export default DoctorPanelWorkingArea;
