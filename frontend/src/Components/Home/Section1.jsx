/* eslint-disable react/prop-types */
import { Box, Flex, Heading, Text, Image, VStack, Container } from '@chakra-ui/react';

function Section1({ title, subtitle, description, imageUrl, reverse }) {
  return (
    <Box bg="gray.100" py={10}>
      <Container maxW="container.xl">
        <Flex direction={reverse ? "row-reverse" : "row"} alignItems="center" justifyContent="space-between">
          <VStack align="start" spacing={4} maxW="lg">
            <Heading as="h2" size="xl" fontWeight="bold">{title}</Heading>
            <Text fontSize="lg">{subtitle}</Text>
            <Text>{description}</Text>
          </VStack>
          <Image src={imageUrl} borderRadius="md" />
        </Flex>
      </Container>
    </Box>
  );
}

export default Section1;
