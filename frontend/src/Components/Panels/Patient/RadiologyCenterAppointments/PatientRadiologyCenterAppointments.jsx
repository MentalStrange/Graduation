import { Box, Button, Flex, Heading, IconButton, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import AddRadiologyCenterAppointment from './AddRadiologyCenterAppointment';
import { usePatientState, usePatientDispatch } from '../../../../Context/PatientContext/PatientContext';
import axios from 'axios';
import { decodeToken } from '../../../../../Utils/JWT_Decode';

function PatientRadiologyCenterAppointments() {
  const { loading, error, radiologyCenterAppointments } = usePatientState();
  const dispatch = usePatientDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const token = localStorage.getItem('userToken');
  const user = decodeToken(token);
  const patientId = user.id;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/radiologyCenter/appointment/patient/${patientId}`);
      dispatch({ type: 'SET_APPOINTMENTS', payload: { data: response.data.data } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  };

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await axios.patch('http://localhost:5001/api/v1/radiologyCenter/appointment/status', {
        appointmentId: selectedAppointment.id,
        status: "cancelled",
      });
      dispatch({
        type: 'SET_APPOINTMENTS',
        payload: {
          data: radiologyCenterAppointments.data.data.map(app => 
            app.id === selectedAppointment.id ? { ...app, status: 'Cancelled' } : app
          )
        }
      });
      closeDeleteModal();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleAppointmentAdded = (newAppointment) => {
    dispatch({
      type: 'SET_APPOINTMENTS',
      payload: { data: [...radiologyCenterAppointments.data.data, newAppointment] }
    });
  };

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

  const radiologyCenterAppointmentsData = Array.isArray(radiologyCenterAppointments.data.data) ? radiologyCenterAppointments.data.data : [];
  console.log(radiologyCenterAppointmentsData);

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="lg">Manage Radiology Center Appointments</Heading>
        <Button colorScheme="purple" leftIcon={<ArrowForwardIcon />} onClick={onOpen}>
          Add Appointment
        </Button>
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Center Name</Th>
            <Th>Phone Number</Th>
            <Th>Appointment Date & Time</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {radiologyCenterAppointmentsData.map((appointment, index) => (
            <Tr key={index}>
              <Td>{appointment.centerName}</Td>
              <Td>{appointment.phone}</Td>
              <Td>{appointment.timeSlot}</Td>
              <Td>
                <Button size="sm" colorScheme={appointment.status === 'completed' ? 'green' : appointment.status === 'cancelled' ? 'red' : 'blue'} variant="outline">
                  {appointment.status}
                </Button>
              </Td>
              <Td>
                <IconButton aria-label="Delete" icon={<DeleteIcon />} mr={2} colorScheme='red' size={"sm"} onClick={() => handleDeleteClick(appointment)}/>
                <IconButton aria-label="View" icon={<VisibilityIcon />} colorScheme='blackAlpha' size={"sm"}/>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AddRadiologyCenterAppointment isOpen={isOpen} onClose={onClose} onAppointmentAdded={handleAppointmentAdded} />
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to cancel this appointment?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDelete}>
              Yes, Cancel it
            </Button>
            <Button variant="ghost" onClick={closeDeleteModal}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PatientRadiologyCenterAppointments;
