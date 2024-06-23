import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  Container,
  Image,
} from '@chakra-ui/react';
import contactImage from './../../assets/Images/image8.png'; // Update this path with your image path

const ContactUs = () => (
  <Box p={8} >
    <Container maxW="container.xl">
      <Flex direction={{ base: 'column', md: 'row' }} align="center">
        <Box flex="1" mb={{ base: 4, md: 0 }}>
          <Image src={contactImage} borderRadius="md" />
        </Box>
        <Box flex="1" ml={{ md: 8 }}>
          <Heading mb={4}>Contact Us</Heading>
          <Text mb={8}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <FormControl mb={4}>
            <Flex>
              <Box flex="1" mr={2}>
                <FormLabel>First name</FormLabel>
                <Input placeholder="Enter your first name" />
              </Box>
              <Box flex="1" ml={2}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Enter your last name" />
              </Box>
            </Flex>
          </FormControl>
          <FormControl mb={4}>
            <Flex>
              <Box flex="1" mr={2}>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email" />
              </Box>
              <Box flex="1" ml={2}>
                <FormLabel>Phone number</FormLabel>
                <Input type="tel" placeholder="Enter your phone number" />
              </Box>
            </Flex>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Choose a topic</FormLabel>
            <Select placeholder="Select one...">
              <option>General Inquiry</option>
              <option>Appointment</option>
              <option>Support</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Type your message..." />
          </FormControl>
          <FormControl mb={4}>
            <Checkbox>I accept the terms</Checkbox>
          </FormControl>
          <Button colorScheme="purple" type="submit">Submit</Button>
        </Box>
      </Flex>
    </Container>
  </Box>
);

export default ContactUs;
