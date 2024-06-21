/* eslint-disable react/prop-types */
import { Box, Image, Text, VStack } from '@chakra-ui/react';

function PatientCard({ name, image, age, description }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} width={"300px"} height={"300px"} alignContent={"center"}>
      <Image src={image} alt={name} borderRadius="full" boxSize="150px" mx="auto" />
      <VStack spacing={2} mt={4}>
        <Text fontWeight="bold">{name}</Text>
        <Text fontSize="sm" color="gray.500">{age} years old</Text>
        <Text>{description}</Text>
      </VStack>
    </Box>
  );
}

export default PatientCard;