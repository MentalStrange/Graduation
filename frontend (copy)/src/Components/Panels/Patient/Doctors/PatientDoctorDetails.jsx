/* eslint-disable react/prop-types */
import { useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import StarIcon from '@mui/icons-material/Star';
import { DoctorsContext } from '../../../../Context/PatientContext/PatientDoctorsContext';

function PatientDoctorDetails({ isOpen, onClose, doctorId }) {
  const { doctors, loading, error } = useContext(DoctorsContext);
  const doctor = doctors.data.find((doc) => doc.id === doctorId);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

  if (!doctor) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{doctor.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign="center">
            <Image src={doctor.image} alt={doctor.name} borderRadius="full" boxSize="150px" mx="auto" />
            <VStack spacing={2} mt={4}>
              <Text fontWeight="bold">{doctor.name}</Text>
              <Text fontSize="sm" color="gray.500">{doctor.specialization}</Text>
              <HStack spacing={1}>
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <StarIcon key={i} color={i < doctor.rating ? 'yellow.400' : 'gray.300'} />
                  ))}
                <Text fontSize="sm" color="gray.500">({doctor.rating})</Text>
              </HStack>
              <Text>{doctor.description}</Text>
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="center" gap={5}>
          <Button colorScheme="blue" onClick={() => {/* Handle booking logic here */}}>
            Book Appointment
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PatientDoctorDetails;