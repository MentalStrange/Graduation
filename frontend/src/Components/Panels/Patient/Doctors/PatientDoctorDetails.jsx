/* eslint-disable react/prop-types */
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
import { usePatientState } from '../../../../Context/PatientContext/PatientContext';

function PatientDoctorDetails({ isOpen, onClose, doctorId }) {
  const { doctors, loading, error } = usePatientState();

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

  // Ensure doctors.data.data is defined and an array
  const doctorsData = doctors.data && doctors.data.data ? doctors.data.data : [];

  // Find the doctor by ID
  const doctor = doctorsData.find((doc) => doc.id === doctorId);

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
          <Button onClick={onClose}>Close</Button>
          <Button colorScheme="purple" onClick={() => {/* Handle booking logic here */}}>
            Book Appointment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PatientDoctorDetails;
