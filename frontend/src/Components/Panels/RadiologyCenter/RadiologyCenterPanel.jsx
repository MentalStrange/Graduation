import { Box, Flex, Divider, useColorModeValue } from "@chakra-ui/react";
import RadiologyCenterNavbar from "./RadiologyCenterNavbar";
import MakeScan from "./Scans/MakeScan";
import RadiologyCenterWorkingArea from "./RadiologyCenterWorkingArea";
import RadiologyCenterAppointments from "./Appointments/RadiologyCenterAppointments";

function RadiologyCenterPanel() {
  return (
    <Flex direction="column" height="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <Box m={4}>
        <RadiologyCenterNavbar />
      </Box>
      <Divider />
      <Box >
        {/* <MakeScan /> */}
        {/* <RadiologyCenterWorkingArea/> */}
        <RadiologyCenterAppointments/>
      </Box>
    </Flex>
  );
}

export default RadiologyCenterPanel;