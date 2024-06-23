/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { decodeToken } from '../../../../../../Utils/JWT_Decode';
import api from '../../../../../Api/Api';


function PrescriptionModal({ isOpen, onClose, patientId, reportId }) {
  const [description, setDescription] = useState('');
  const [examination, setExamination] = useState('');
  const [drugs, setDrugs] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    const token = localStorage.getItem('userToken');
    const doctorId = decodeToken(token).id;

    const payload = {
      patient: patientId,
      doctor: doctorId,
      description,
      examination,
      drugs: drugs.split(',').map((drug) => drug.trim()), // Convert to array of drugs
      report: reportId,
    };

    try {
      const response = await api.post(`/prescription`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast({
          title: 'Prescription created.',
          description: 'The prescription has been successfully created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } else {
        throw new Error(response.data.message || 'Failed to create prescription.');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Write Prescription</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Examination</FormLabel>
            <Textarea
              value={examination}
              onChange={(e) => setExamination(e.target.value)}
              placeholder="Enter examination details"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Drugs</FormLabel>
            <Input
              value={drugs}
              onChange={(e) => setDrugs(e.target.value)}
              placeholder="Enter drugs separated by commas"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PrescriptionModal;
