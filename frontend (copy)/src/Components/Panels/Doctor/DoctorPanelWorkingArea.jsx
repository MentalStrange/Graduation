import { Flex, Heading, Icon, Link, Stack, Text, SimpleGrid, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import AppointmentsWorkingArea from "./AppointmentsWorkingArea";
import DoctorPanelPatientBoard from "./DoctorPanelPatientBoard";
import ReportWorkingArea from "./ReportWorkingArea";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useContext } from "react";
import { DoctorAppointmentsContext } from "../../../Context/DoctorContext/DoctorAppointmentsContext";
import { DoctorContext } from "../../../Context/DoctorContext/DoctorContext";

function DoctorPanelWorkingArea() {
  const {appointments,loading:appointmentsLoading, error:appointmentsError}= useContext(DoctorAppointmentsContext)
  const {doctor, loading:doctorLoading, error:doctorError} = useContext(DoctorContext)
  if(appointmentsLoading || doctorLoading){
    return <Spinner/>
  }

  if(doctorError){
    return (
      <Alert status="error">
        <AlertIcon/>
        {doctorError.message}
      </Alert>
    )
  }
  if(appointmentsError){
    return (
      <Alert status="error">
        <AlertIcon/>
        {appointmentsError.message}
      </Alert>
    )
  }
  return (
    <Flex mx={4} flexDirection={{ base: "column", lg: "row" }} gap={4}>
      {/* Left Side - Appointments and Patients Board */}
      <Box flex="3">
        <Stack>
          <Heading m={0}>Welcome Dr. {doctor.data.name}</Heading>
          <Flex align={"center"} justify={"space-between"}>
            <Flex align={"center"}>
              <Icon mr={1} as={HistoryIcon} />
              <Text m={0}>Appointments</Text>
            </Flex>
            <Link href="#" color="blue.500">
          View All <Icon as={ArrowForwardIcon} />
        </Link>
          </Flex>
          {/* <hr /> */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
            {appointments.data.map((item, index) => (
              <AppointmentsWorkingArea key={index} data={item} />
            ))}
          </SimpleGrid>
          <DoctorPanelPatientBoard />
        </Stack>
      </Box>

      {/* Right Side - Reports */}
      <Box flex="1">
        <ReportWorkingArea />
      </Box>
    </Flex>
  );
}

export default DoctorPanelWorkingArea;
