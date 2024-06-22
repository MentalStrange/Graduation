import { Box, Flex, Divider, useColorModeValue } from "@chakra-ui/react";
import RadiologyCenterNavbar from "./RadiologyCenterNavbar";
import { Outlet } from "react-router-dom";

function RadiologyCenterPanel() {
  return (
    <Flex direction="column" height="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <Box m={4}>
        <RadiologyCenterNavbar />
      </Box>
      <Divider />
      <Box >
        <Outlet/>
      </Box>
    </Flex>
  );
}

export default RadiologyCenterPanel;