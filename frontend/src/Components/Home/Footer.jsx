import {
  Box,
  Text,
  HStack,
  Link,
  VStack,
  Divider,
  Container,
  Flex,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <Box bg="gray.200" py={5}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <VStack align="start">
            <Text fontWeight="bold">Contact Us</Text>
            <Divider />
            <VStack align="start" spacing={1}>
              <Text>Tel: 000-000-000</Text>
              <Text>Address: Benha</Text>
              <Text>Fax: 000-000-000</Text>
            </VStack>
          </VStack>
          <VStack align="start">
            <Text fontWeight="bold">Important Links</Text>
            <Divider />
            <HStack spacing={4}>
              <Link href="https://www.facebook.com" isExternal>
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </Link>
              <Link href="https://www.youtube.com" isExternal>
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </Link>
              <Link href="https://www.linkedin.com" isExternal>
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </Link>
            </HStack>
          </VStack>
        </Flex>
        <Text textAlign="center" mt={4}>
          &copy; 2024 All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;
