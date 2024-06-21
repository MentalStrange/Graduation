/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { DoctorPatientsContext } from '../../../../Context/DoctorContext/DoctorPatientsContext';

function DoctorPatientDetails({ isOpen, onClose, patientId }) {
  const { patients, loading, error } = useContext(DoctorPatientsContext);
  const navigate = useNavigate();
  const patient = patients.data.find((pat) => pat.id === patientId);

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

  if (!patient) {
    return null;
  }

  const handleOpenPatientPage = () => {
    navigate(`${patientId}`, { state: { patient } });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{patient.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign="center">
            <Image src={patient.image} alt={patient.name} borderRadius="full" boxSize="150px" mx="auto" />
            <VStack spacing={2} mt={4}>
              <Text fontWeight="bold">{patient.name}</Text>
              <Text fontSize="sm" color="gray.500">{patient.age} years old</Text>
              <Text>{patient.description}</Text>
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="center" gap={2}>
          <Button onClick={handleOpenPatientPage} colorScheme='purple'>Open</Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DoctorPatientDetails;