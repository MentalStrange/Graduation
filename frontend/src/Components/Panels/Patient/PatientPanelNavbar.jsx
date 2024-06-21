import { Avatar, Flex, IconButton, Input, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import { usePatientState } from "../../../Context/PatientContext/PatientContext";
import { Link } from "react-router-dom";

function PatientPanelNavbar() {
  const { patient, loading, error } = usePatientState();

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
        <Link to="/panel/patient/chat">
          <IconButton
            icon={<ChatIcon />}
            bg="transparent"
            _hover={{ bg: "gray.100" }}
            mx={4}
            aria-label="Chat"
          />
        </Link>
        <Link to="/panel/patient">
          <Avatar src={patient?.data?.data?.image} name={patient?.data?.data?.name} height="40px" width="40px" />
        </Link>
      </Flex>
    </Flex>
  );
}

export default PatientPanelNavbar;
