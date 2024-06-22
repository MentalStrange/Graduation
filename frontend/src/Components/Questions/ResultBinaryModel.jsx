/* eslint-disable react/prop-types */
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import MRIBackground from './../../assets/Images/MRIBackground.jpg';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';

function ResultBinaryModel({ result }) {
  const resultMessage = result === 1 
    ? "You Need To Book an Appointment"
    : "You Do Not Need To Book an Appointment";

  const buttonText = result === 1 
    ? "Book your appointment"
    : "Explore More";

  const linkTo = result === 1 
    ? "/book-appointment"
    : "/explore";

  return (
    <Box
      height="100vh"
      backgroundImage={`url(${MRIBackground})`}
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        zIndex="1"
      />
      <Box
        textAlign="center"
        width="100%"
        maxWidth="600px"
        p={8}
        zIndex="2"
        position="relative"
        backgroundColor="rgba(255, 255, 255, 0.9)"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading as="h2" size="xl" mb={6}>{resultMessage}</Heading>
        <VStack spacing={4}>
          <Button
            as={RouterLink}
            to={linkTo}
            colorScheme="purple"
            size="lg"
            rightIcon={<ArrowForwardIcon />}
          >
            {buttonText}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default ResultBinaryModel;
