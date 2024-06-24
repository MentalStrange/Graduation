// src/components/Navbar.jsx
import { Link,Box, Flex, Button, Container, Image, Text, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import {  useNavigate, Link as RouterLink } from "react-router-dom";
import logo from "./../../assets/Images/purpleLogo.png";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthenticationContext";
import { useDoctorState } from "../../Context/DoctorContext/DoctorContext";
import { usePatientState } from "../../Context/PatientContext/PatientContext";
import { useRadiologistState } from "../../Context/RadiologistContext/RadiologistContext";
import { useRadiologyCenterState } from "../../Context/RadiologyCenterContext/RadiologyCenterContext";
import { useReceptionistState } from "../../Context/ReceptionistContext.jsx/ReceptionistContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const {doctor} = useDoctorState();
  const {patient} = usePatientState();
  const {receptionist} = useReceptionistState();
  const {radiologist} = useRadiologistState();
  const {radiologyCenter} = useRadiologyCenterState();
  const navigate = useNavigate();

  console.log(patient);
  const handleProfileClick = () => {
    switch (user.role) {
      case "doctor":
        navigate("/panel/doctor");
        break;
      case "patient":
        navigate("/panel/patient");
        break;
      case "receptionist":
        navigate("/panel/receptionist");
        break;
      case "radiologist":
        navigate("/panel/radiologist");
        break;
      case "radiologyCenter":
        navigate("/panel/radiologyCenter");
        break;
      default:
        navigate("/");
    }
  };
  const getUserAvatar = () => {
    switch (user.role) {
      case "doctor":
        return doctor?.data?.data?.image || user.imageUrl;
      case "patient":
        return patient?.data?.data?.image || user.imageUrl;
      case "receptionist":
        return receptionist?.data?.data?.image || user.imageUrl;
      case "radiologist":
        return radiologist?.data?.data?.image || user.imageUrl;
      case "radiologyCenter":
        return radiologyCenter?.data?.data?.image || user.imageUrl;
      default:
        return user.imageUrl;
    }
  };

  return (
    <Box bg="purple.50" py={4} zIndex={"1000"}>
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between">
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Image src={logo} alt="Logo" width="150px" height="45px" />
          </Link>
          <Flex align="center" justify="center">
            <Text m={0} mx={4} fontSize="lg" color="purple.600" _hover={{ textDecoration: "none" }}>
              <Link as={RouterLink} to="/">Home</Link>
            </Text>
            <Text m={0} mx={4} fontSize="lg" color="purple.600" _hover={{ textDecoration: "none" }}>
              <Link href="#about">About Us</Link>
            </Text>
            <Text m={0} mx={4} fontSize="lg" color="purple.600" _hover={{ textDecoration: "none" }}>
              <Link href="#services">Services</Link>
            </Text>
            <Text m={0} mx={4} fontSize="lg" color="purple.600" _hover={{ textDecoration: "none" }}>
              <Link href="#testimonial">Testimonial</Link>
            </Text>
          </Flex>
          <Flex align="center">
            { user?.role !== "radiologist" && user?.role !== "doctor" && user?.role !== "radiologyCenter" && user?.role !== "receptionist"&& (
              <Button as={RouterLink} to="/questions" mr={4} colorScheme="purple"> 
                Try Now
              </Button>
            )}
            {isAuthenticated ? (
              <Menu>
                <MenuButton as={Button} bg="transparent" _hover={{ bg: "transparent" }} _focus={{ boxShadow: "none" }}>
                  <Avatar name={user.name} src={getUserAvatar()} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button as={RouterLink} to="/auth" bg="purple.50" color="black" _hover={{ bg: "purple.500", color: "white" }}>
                Login
              </Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
