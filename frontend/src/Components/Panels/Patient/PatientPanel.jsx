import { Box, Flex } from "@chakra-ui/react";
import PatientPanelNavbar from "./PatientPanelNavbar";
// import PatientPanelWorkingArea from "./PatientPanelWorkingArea";
// import PatientReports from "./Report/PatientReports";
import PatientAppointments from "./Appointments/PatientAppointments";
import PatientPrescriptions from "./Prescriptions/PatientPrescriptions";

function PatientPanel() {
  return (
    <Flex direction="column" height="100vh">
      <Box m={4}>
        <PatientPanelNavbar />
      </Box>
      <hr style={{ padding: 0, margin: 0 }} />
      <Box flex="1" overflow="hidden">
        {/* <PatientPanelWorkingArea /> */}
        {/* <AllReports/> */}
        {/* <PatientAppointments/> */}
        <PatientPrescriptions/>
      </Box>
    </Flex>
  );
}

export default PatientPanel;
