import { Avatar, Box, Flex, IconButton, Input, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { useContext } from "react";
import { DoctorContext } from "../../../Context/DoctorContext/DoctorContext"; // Adjust the import path as necessary

function DoctorPanelNavbar() {
  const { doctor, loading, error } = useContext(DoctorContext);

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
            <Avatar mr={4} src={doctor?.data.image} /> {/* Assuming doctor data has an image */}
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

export default DoctorPanelNavbar;
