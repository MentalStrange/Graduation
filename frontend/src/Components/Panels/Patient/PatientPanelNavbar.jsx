import { Avatar, Box, Flex, IconButton, Input, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { useContext } from "react";
import { PatientContext } from "../../../Context/PatientContext/PatientContext";

function PatientPanelNavbar() {
  const { patient, loading, error } = useContext(PatientContext);

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
    <>
      <Flex justify={"space-between"}>
        <Flex>
          <IconButton icon={<SearchIcon />} mr={2} colorScheme="purple" />
          <Input type="search" w={'fit-content'} />
        </Flex>
        <Box>
          <Flex align={"center"} flexDirection={"row-reverse"}>
            <Avatar mr={4} src={patient?.data.image} />
            <IconButton
              mr={4}
              icon={<ChatIcon />}
              bg={"transparent"}
              _hover={"transparent"}
            />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default PatientPanelNavbar;