import { Avatar, Flex, IconButton, Input, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import { useRadiologyCenterState } from "../../../Context/RadiologyCenterContext/RadiologyCenterContext";
import { Link } from "react-router-dom";

function RadiologyCenterNavbar() {
  const { radiologyCenter, loading, error } = useRadiologyCenterState();

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
        <Link to="/panel/radiologyCenter">
          <Avatar src={radiologyCenter?.data?.data?.image} name={radiologyCenter?.data?.data?.name} height="40px" width="40px" ml={4}/>
        </Link>
      </Flex>
    </Flex>
  );
}

export default RadiologyCenterNavbar;

