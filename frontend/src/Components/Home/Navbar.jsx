import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, HStack, Link, Button, Spacer, Image } from '@chakra-ui/react';
import logo from './../../assets/Images/purpleLogo.png';

function Navbar() {
  return (
    <Box bg="white" px={4} py={4} boxShadow="sm" position="fixed" width="100%" zIndex="1000">
      <Flex alignItems="center">
        <RouterLink to='/'>
          <Image src={logo} alt="logo" width="120px" />
        </RouterLink>
        <Spacer />
        <HStack spacing={8} as="nav">
          <Link
            as={RouterLink}
            to='/'
            fontWeight="bold"
            _hover={{
              textDecoration: 'none',
              color: 'purple.500',
            }}
          >
            Home
          </Link>
          <Link
            as={RouterLink}
            to='/about'
            fontWeight="bold"
            _hover={{
              textDecoration: 'none',
              color: 'purple.500',
            }}
          >
            About
          </Link>
          <Link
            as={RouterLink}
            to='/services'
            fontWeight="bold"
            _hover={{
              textDecoration: 'none',
              color: 'purple.500',
            }}
          >
            Services
          </Link>
        </HStack>
        <Spacer />
        <HStack spacing={4}>
          <Button as={RouterLink} to='/auth' variant="outline" colorScheme="purple">Log In</Button>
          <Button as={RouterLink} to='/questions' colorScheme="purple">Try for Free</Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
