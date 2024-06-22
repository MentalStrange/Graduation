/* eslint-disable react/prop-types */
import { Box, VStack, Text, Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Section3({ text1, text2, textClass, description, icon, button }) {
  return (
    <Box bg="purple.500" py={10} color="white" textAlign="center">
      <VStack spacing={4}>
        <FontAwesomeIcon className="p-3 display-6" icon={icon} size="2x" />
        <Heading as="h2" size="xl" className={textClass}>
          {text1}
        </Heading>
        <Text fontSize="xl" className="text-light font-weight-bold">
          {text2}
        </Text>
        <Text>{description}</Text>
        {button && button}
      </VStack>
    </Box>
  );
}

export default Section3;
