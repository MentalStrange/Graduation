import { useContext, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Alert,
  AlertIcon,
  IconButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  useToast,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DoctorAppointmentsContext } from "../../../../Context/DoctorContext/DoctorAppointmentsContext";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function DoctorAppointments() {
  const { appointments, loading, error, updateAppointmentStatus } = useContext(
    DoctorAppointmentsContext
  );
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAcceptModalOpen, setAcceptModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const toast = useToast();

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setDeleteModalOpen(true);
  };

  const handleAcceptClick = (appointment) => {
    setSelectedAppointment(appointment);
    setAcceptModalOpen(true);
  };

  const handleUpdateStatus = async (status) => {
    try {
      const result = await updateAppointmentStatus(
        selectedAppointment.id,
        status
      );
      if (result.success) {
        toast({
          title: "Success",
          description: `Appointment status updated to ${status}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Failed to update the appointment status. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteConfirm = () => {
    handleUpdateStatus("cancelled");
    setDeleteModalOpen(false);
  };

  const handleAcceptConfirm = () => {
    handleUpdateStatus("completed");
    setAcceptModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const closeAcceptModal = () => {
    setAcceptModalOpen(false);
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
    <Flex height="85vh" overflowY="auto">
      <Box flex="1" p="4">
        <Heading mb="4">Manage Appointments</Heading>
        <TableContainer>
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Patient Name</Th>
                <Th>Phone Number</Th>
                <Th>Appointment Date & Time</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointments.data.map((appointment, index) => (
                <Tr key={index}>
                  <Td>{appointment.user}</Td>
                  <Td>{appointment.phone}</Td>
                  <Td>{appointment.date}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme={
                        appointment.status === "completed" ? "green" : "red"
                      }
                      variant="outline"
                    >
                      {appointment.status}
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="green"
                      size="sm"
                      mr="2"
                      onClick={() => handleAcceptClick(appointment)}
                    >
                      Accept
                    </Button>
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      mr={2}
                      onClick={() => handleDeleteClick(appointment)}
                    />
                    <IconButton
                      aria-label="View"
                      icon={<VisibilityIcon />}
                      size="sm"
                      colorScheme="blackAlpha"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justify="center" align="center" mt={4}>
          <Button size="sm" mr={2}>
            Previous
          </Button>
          <Button size="sm" mr={2}>
            1
          </Button>
          <Button size="sm" mr={2}>
            2
          </Button>
          <Button size="sm" mr={2}>
            3
          </Button>
          <Button size="sm">Next</Button>
        </Flex>
        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to cancel this appointment?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDeleteConfirm}>
                Yes, Cancel it
              </Button>
              <Button variant="ghost" onClick={closeDeleteModal}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isAcceptModalOpen} onClose={closeAcceptModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Acceptance</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to mark this appointment as completed?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={handleAcceptConfirm}>
                Yes, Mark as Completed
              </Button>
              <Button variant="ghost" onClick={closeAcceptModal}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default DoctorAppointments;
