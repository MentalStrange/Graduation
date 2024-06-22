import { Box, Flex, Divider, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import RadiologistNavbar from "./RadiologistNavbar";

function RadiologistPanel() {
  return (
    <Flex direction="column" height="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <Box m={4}>
        <RadiologistNavbar />
      </Box>
      <Divider />
      <Box >
        <Outlet/>
      </Box>
    </Flex>
  );
}

export default RadiologistPanel;