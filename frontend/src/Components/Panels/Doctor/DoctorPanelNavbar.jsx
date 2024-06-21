import { Avatar, Flex, IconButton, Input, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { useDoctorState } from "../../../Context/DoctorContext/DoctorContext"; // Adjust the import path as necessary
import { Link } from "react-router-dom";

function DoctorPanelNavbar() {
  const { doctor, loading, error } = useDoctorState();
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
    <Flex justify="space-between" align="center" height="30px" bg="white">
      <Flex flex="1" align="center">
        <IconButton icon={<SearchIcon />} colorScheme="purple" size={'md'}/>
        <Input 
          type="search" 
          placeholder="Search..." 
          ml={2} 
          flex="1" 
          borderRadius="md" 
          bg="gray.50"
          _focus={{ bg: "white" }} 
        />
      </Flex>
      <Flex align="center">
        <Link to="/panel/doctor/chat">
          <IconButton
            icon={<ChatIcon />}
            bg="transparent"
            _hover={{ bg: "gray.100" }}
            mx={4}
            aria-label="Chat"
          />
        </Link>
        <Link to="/panel/doctor">
          <Avatar src={doctor?.data?.data?.image} name={doctor?.data?.data?.name} height="40px" width="40px" />
        </Link>
      </Flex>
    </Flex>
  );
}

export default DoctorPanelNavbar;
