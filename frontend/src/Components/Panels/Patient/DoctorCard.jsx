import { Box, Image, Text, VStack, HStack } from '@chakra-ui/react';
import StarIcon from '@mui/icons-material/Star';
import PropTypes from 'prop-types';

const DoctorCard = ({ name, title, img, rating, patients, location }) => {
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
      <Image src={img} alt={name} borderRadius="full" boxSize="150px" mx="auto" />
      <VStack spacing={2} mt={4} textAlign="center">
        <Text m={0} fontWeight="bold">{name}</Text>
        <Text m={0} fontSize="sm" color="gray.500">{title}</Text>
        <HStack spacing={1}>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon key={i} color={i < rating ? 'yellow.400' : 'gray.300'} />
            ))}
          <Text fontSize="sm" color="gray.500">({rating})</Text>
        </HStack>
        <Text m={0} fontSize="sm" color="gray.500">{patients} Patients</Text>
        <Text m={0} fontSize="sm" color="gray.500">{location}</Text>
      </VStack>
    </Box>
  );
};

DoctorCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  patients: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
};

export default DoctorCard;
