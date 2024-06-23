// src/components/HeroSection.jsx
import { Box, Heading, Text, Button, Flex, Stack } from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import CountUp from 'react-countup';
import hero from './../../assets/Images/MRIBackground.jpg';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  const stats = [
    { id: 1, end: 95, label: 'Positive Reviews', description: 'From My Satisfied Client' },
    { id: 2, end: 2400, label: 'Questions And Answers', description: 'Find Answer To Your Questions' },
    { id: 3, end: 50, label: 'Award Winning', description: 'Most Award Winning' }
  ];

  return (
    <>
      <Box 
        position="relative" 
        bgImage={`url(${hero})`} 
        bgSize="cover" 
        bgPos="center" 
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        id='hero'
      >
        <Box 
          position="absolute" 
          top="0" 
          left="0" 
          width="100%" 
          height="100%" 
          bg="rgba(0, 0, 0, 0.6)" // overlay to focus on content
        />
        <Box position="relative" maxW="800px" textAlign="center" zIndex="1">
          <Heading mb={4}>Providing Quality Care With Patient</Heading>
          <Text mb={4}>
            This Is A Great Site For Everything Around The Home, And It Also Has A Useful Beauty Section. 
            You Can See The Best Products In Each Category And They Even Have Test Results To Back Up The 
            Information They Are Giving You.
          </Text>
          <Stack direction="row" spacing={4} justify="center">
            <NavLink to="/questions">
            <Button colorScheme="purple">Get Started</Button>
            </NavLink>
            <Button leftIcon={<PhoneIcon />} colorScheme="whiteAlpha" variant="solid">
              Call now <br /> +20 101 577 5920
            </Button>
          </Stack>
        </Box>
      </Box>
      <Box bg="gray.100" py={8}>
        <Flex justify="center" align="center" wrap="wrap">
          {stats.map((stat) => (
            <Box key={stat.id} p={4} mx={4} textAlign="center">
              <CountUp end={stat.end} duration={5}>
                {({ countUpRef }) => (
                  <Heading fontSize="4xl" ref={countUpRef} color="blue.600" />
                )}
              </CountUp>
              <Text fontSize="xl" color="gray.700">{stat.label}</Text>
              <Text color="gray.500">{stat.description}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default HeroSection;
