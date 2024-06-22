/* eslint-disable react/prop-types */
import { Box, Image, Text, VStack } from '@chakra-ui/react';
import { formatDate } from '../../../../Utils/formatDate';

const ScanCard = ({data}) => {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      p={4}
      w="200px"
      m={2}
    >
      <Image src={data?.image} alt={data?.patient} borderRadius="full" boxSize="150px" mx="auto" />
      <VStack spacing={2} mt={4} textAlign="center">
        <Text m={0} fontWeight="bold">{data?.patient}</Text>
        <Text m={0} fontSize="sm" color="gray.500">{formatDate(data?.date)}</Text>
        <Text fontSize="sm" color="gray.500">{data?.status =='notReported'?'Not Reported Yet':'Reported'}</Text>
      </VStack>
    </Box>
  );
};

export default ScanCard;
