/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  Spinner,
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react';
import { RadiologyCenterPatientsContext } from '../../../../Context/RadiologyCenterContext/RadiologyCenterPatientsContext';
import axios from 'axios';
import { decodeToken } from '../../../../../Utils/JWT_Decode';

function RadiologyCenterAssignScanToRadiologist({ isOpen, onClose, selectedRadiologistId }) {
  const { patients, loading, error } = useContext(RadiologyCenterPatientsContext);
  const [scanPhoto, setScanPhoto] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [notes, setNotes] = useState('');
  const toast = useToast();

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScanPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!patientId || !scanPhoto) {
      toast({
        title: "Missing fields",
        description: "Please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
      return;
    }

    const token = localStorage.getItem('userToken');
    const radiologyCenterId = decodeToken(token).id;

    const payload = {
      radiologistId: selectedRadiologistId,
      userId: patientId,
      notes: notes,
      radiologyCenterId: radiologyCenterId,
      type: 'patient', // Assuming type is always 'patient' for this context
      image: scanPhoto // Base64 string of the image
    };

    try {
      const response = await axios.post('http://localhost:5001/api/v1/scan', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Scan assigned successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        });
      } else {
        throw new Error(response.data.message || 'Failed to assign scan');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to assign scan",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });
    }
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Assign Scan to Radiologist</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <Alert status="error">
              <AlertIcon />
              {error.message}
            </Alert>
          ) : (
            <FormControl>
              <FormLabel>Patient</FormLabel>
              <Select placeholder="Select patient" onChange={(e) => setPatientId(e.target.value)}>
                {patients.data.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </Select>
              <FormLabel mt={4}>Scan Photo</FormLabel>
              <Input type="file" onChange={handlePhotoChange}/>
              <FormLabel mt={4}>Notes</FormLabel>
              <Textarea placeholder="Enter any notes" onChange={(e) => setNotes(e.target.value)} />
            </FormControl>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple" mr={3} onClick={handleSubmit} isDisabled={!scanPhoto || !patientId}>
            Assign
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RadiologyCenterAssignScanToRadiologist;