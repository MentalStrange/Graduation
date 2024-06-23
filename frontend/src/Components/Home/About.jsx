import { Box, Heading, Text, Flex, Image, List, ListItem, ListIcon, Container } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import about from './../../assets/Images/blog1.png';

const About = () => (
  <Box p={8} id="about">
    <Container maxW="container.xl">
      <Flex direction={{ base: 'column', md: 'row' }} align="center">
        <Box flex="1" mb={{ base: 4, md: 0 }}>
          <Image src={about} borderRadius="md" />
        </Box>
        <Box flex="1" ml={{ md: 8 }}>
          <Text color="purple.600" fontWeight="bold" fontSize="lg">Who We Are</Text>
          <Heading mb={4}>Hello, We are the Stroke Detection Project</Heading>
          <Text mb={4}>
            Our mission is to leverage advanced machine learning and AI technologies to assist radiologists and improve patient outcomes in stroke detection. 
            By integrating AI into radiology, we aim to provide accurate and timely diagnoses, ultimately saving lives and enhancing the quality of care.
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="purple.600" />
              Advanced AI algorithms for stroke detection
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="purple.600" />
              Collaboration with top radiologists and radiology centers
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="purple.600" />
              Continuous improvement through machine learning
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="purple.600" />
              Emergency and express care services
            </ListItem>
          </List>
        </Box>
      </Flex>
    </Container>
  </Box>
);

export default About;
