import { Alert, AlertIcon, Avatar, Flex, IconButton, Input, Link, Spinner } from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import { useRadiologistState } from "../../../Context/RadiologistContext/RadiologistContext";

function RadiologistNavbar() {
  const { radiologist, loading, error } = useRadiologistState();

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
        <Link to="/panel/radiologist">
          <Avatar src={radiologist?.data?.data?.image} name={radiologist?.data?.data?.name} height="40px" width="40px" ml={2}/>
        </Link>
      </Flex>
    </Flex>
  );
}

export default RadiologistNavbar;
