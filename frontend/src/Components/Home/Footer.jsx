// src/components/Footer.jsx
import { Box, Flex, IconButton, Container, Input, Link, Button, Heading, Image } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from './../../assets/Images/logo.png';

const Footer = () => (
  <Box bg="black" color="white" pt={16}>
    <Box bg="orange.50" color="black" py={16} textAlign="center">
      <Container maxW="container.xl">
        <Heading as="h3" size="lg" mb={4}>
          Sign Up For An Appointment With The Doctor Today!
        </Heading>
        <Flex justify="center" align="center">
          <Input
            placeholder="Your Email Address"
            size="lg"
            maxW="400px"
            mr={4}
            bg="white"
          />
          <Button colorScheme="orange" size="lg">
            Subscribe
          </Button>
        </Flex>
      </Container>
    </Box>
    <Container maxW="container.xl" mt={16} pt={8} pb={8} borderTop="1px solid gray">
      <Flex direction="column" align="center">
      <Link to="/" _hover={{ textDecoration: 'none' }}>
          <Image src={logo} alt="Logo" width="150px" height="45px" mb={4}/>
        </Link>
        <Flex mb={8}>
          <Link href="#hero" mx={2}>Home</Link>
          <Link href="#about" mx={2}>About Me</Link>
          <Link href="#services" mx={2}>Services</Link>
          <Link href="#testimonial" mx={2}>Testimonial</Link>
          <Link href="#topDoctors" mx={2}>Top Doctors</Link>
        </Flex>
        <Flex>
          <IconButton as="a" href="#" icon={<FaFacebook />} bg="black" color="white" mx={2} />
          <IconButton as="a" href="#" icon={<FaInstagram />} bg="black" color="white" mx={2} />
          <IconButton as="a" href="#" icon={<FaLinkedin />} bg="black" color="white" mx={2} />
          <IconButton as="a" href="#" icon={<FaYoutube />} bg="black" color="white" mx={2} />
          <IconButton as="a" href="#" icon={<FaTwitter />} bg="black" color="white" mx={2} />
        </Flex>
      </Flex>
    </Container>
  </Box>
);

export default Footer;
