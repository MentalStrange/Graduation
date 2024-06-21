import { Box, Button, Flex, Heading, IconButton, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useContext, useEffect, useState } from 'react';
import AddAppointment from './AddAppointment';
import { AppointmentsContext } from '../../../../Context/PatientContext/PatientAppointmentContext';
import axios from 'axios';

function PatientAppointments() {
  const { appointments, loading, error, fetchAppointments, setAppointments } = useContext(AppointmentsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const confirmDelete = () => {
    setAppointments(prevAppointments => prevAppointments.map(app => 
      app.id === selectedAppointment.id ? { ...app, status: 'Cancelled' } : app
    ));
    console.log("selectedAppointment", selectedAppointment);
    axios.patch(`http://localhost:5001/api/v1/appointment/status`, {
        appointmentId: selectedAppointment.id,
        status: "cancelled",
      });
    closeDeleteModal();
  };

  const handleAppointmentAdded = (newAppointment) => {
    setAppointments(prev => [...prev, newAppointment]);
    fetchAppointments();
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

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="lg">Manage Appointments</Heading>
        <Button colorScheme="purple" leftIcon={<ArrowForwardIcon />} onClick={onOpen}>
          Add Appointment
        </Button>
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Dr.Name</Th>
            <Th>Specialization</Th>
            <Th>Phone Number</Th>
            <Th>Appointment Date & Time</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {appointments.map((appointment, index) => (
            <Tr key={index}>
              <Td>{appointment.doctor}</Td>
              <Td>{appointment.specialization}</Td>
              <Td>{appointment.phone}</Td>
              <Td>{appointment.date} {appointment.timeSlot}</Td>
              <Td>
                <Button size="sm" colorScheme={appointment.status === 'Completed' ? 'red' : 'green'} variant="outline">
                  {appointment.status}
                </Button>
              </Td>
              <Td>
                <Flex align="center">
                  {/* <Button size="sm" colorScheme="purple" mr={2}>Pay Now</Button> */}
                  {/* <Button size="sm" colorScheme="purple" mr={2} w={"80px"} isDisabled={appointment.status === 'Booked'}>
                    {appointment.status === 'Completed' ? 'Re-Book' : 'Book Now'}
                  </Button> */}
                  <IconButton aria-label="Delete" icon={<DeleteIcon />} size="sm" colorScheme="red" mr={2} onClick={() => handleDeleteClick(appointment)} />
                  <IconButton aria-label="View" icon={<VisibilityIcon />} size="sm" colorScheme="blackAlpha" />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Pagination */}
      <Flex justify="center" align="center" mt={4}>
        <Button size="sm" mr={2}>Previous</Button>
        <Button size="sm" mr={2}>1</Button>
        <Button size="sm" mr={2}>2</Button>
        <Button size="sm" mr={2}>3</Button>
        <Button size="sm">Next</Button>
      </Flex>
      <AddAppointment isOpen={isOpen} onClose={onClose} onAppointmentAdded={handleAppointmentAdded} />
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

export default PatientAppointments;