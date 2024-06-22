/* eslint-disable react/prop-types */
import { Box, Image, VStack, Text, Heading } from "@chakra-ui/react";

function Section2({ image, textData }) {
  const { title, description } = textData ?? {};

  return (
    <Box p={4} flexBasis="30%">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        textAlign="center"
      >
        <Image src={image} alt={title} />
        <VStack p={4} spacing={3}>
          <Heading as="h4" size="md">
            {title}
          </Heading>
          <Text>{description}</Text>
        </VStack>
      </Box>
    </Box>
  );
}

export default Section2;
