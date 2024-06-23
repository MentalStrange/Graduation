// src/components/Navbar.jsx
import { Box, Flex, Button, Container, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "./../../assets/Images/purpleLogo.png";

const Navbar = () => (
  <Box bg="yellow.50" py={4}>
    <Container maxW="container.xl">
      <Flex align="center" justify="space-between">
        <Link to="/" _hover={{ textDecoration: "none" }}>
          <Image src={logo} alt="Logo" width="150px" height="45px" />
        </Link>
        <Flex align="center" justify="center">
          <Text
            m={0}
            mx={4}
            fontSize="lg"
            color="purple.600"
            _hover={{ textDecoration: "none" }}
          >
            <Link to="#hero">Home</Link>
          </Text>
          <Text
            m={0}
            mx={4}
            fontSize="lg"
            color="purple.600"
            _hover={{ textDecoration: "none" }}
          >
            <Link to="#about">About Us</Link>
          </Text>
          <Text
            m={0}
            mx={4}
            fontSize="lg"
            color="purple.600"
            _hover={{ textDecoration: "none" }}
          >
            <Link to="#services">Services</Link>
          </Text>
          <Text
            m={0}
            mx={4}
            fontSize="lg"
            color="purple.600"
            _hover={{ textDecoration: "none" }}
          >
            <Link to="#testimonial">Testimonial</Link>
          </Text>
        </Flex>
        <Flex align="center">
          <Button mr={4} colorScheme="purple">
            <Link to="/questions">Try Now</Link>
          </Button>
          <Button
            bg="purple.50"
            color="black"
            _hover={{ bg: "purple.500", color: "white" }}
          >
            <Link to="/auth">Login</Link>
          </Button>
        </Flex>
      </Flex>
    </Container>
  </Box>
);

export default Navbar;
