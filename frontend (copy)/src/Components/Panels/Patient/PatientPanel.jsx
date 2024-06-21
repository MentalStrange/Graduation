import { Box, Flex } from "@chakra-ui/react";
import PatientPanelNavbar from "./PatientPanelNavbar";
import { Outlet } from "react-router-dom";
import PatientPanelWorkingArea from "./PatientPanelWorkingArea";

function PatientPanel() {

  return (
    <Flex direction="column" height="100vh">
      <Box m={4}>
        <PatientPanelNavbar />
      </Box>
      <hr style={{ padding: 0, margin: 0 }} />
      <Box flex="1" overflow="hidden">
        <PatientPanelWorkingArea/>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default PatientPanel;