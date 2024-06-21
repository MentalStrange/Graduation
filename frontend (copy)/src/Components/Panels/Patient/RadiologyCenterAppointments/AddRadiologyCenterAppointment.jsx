/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react';
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
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import axios from 'axios';
import { PatientRadiologyCenterContext } from '../../../../Context/PatientContext/PatientRadiologyCenterContext';
import { decodeToken } from '../../../../../Utils/JWT_Decode';

function AddRadiologyCenterAppointment({ isOpen, onClose, onAppointmentAdded }) {
  const { radiologyCenters, loading: centersLoading, error: centersError } = useContext(PatientRadiologyCenterContext);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [errorTimes, setErrorTimes] = useState(null);

  useEffect(() => {
    if (selectedCenter) {
      fetchAvailableTimes(selectedCenter);
    }
  }, [selectedCenter]);

  const fetchAvailableTimes = async (centerId) => {
    setLoadingTimes(true);
    setErrorTimes(null);
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/radiologyCenter/appointment/availableTimeSlots/${centerId}`);
      console.log("Available times response:", response.data.data); // Debugging log
      setAvailableTimes(response.data.data);
    } catch (error) {
      console.error("Error fetching available times:", error); // Debugging log
      setErrorTimes(error);
    } finally {
      setLoadingTimes(false);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('userToken');
    const user = decodeToken(token);
    const userId = user.id;

    try {
      // Find the appointment ID for the selected time slot
      const selectedAppointment = availableTimes.find(appointment => appointment.timeSlot === selectedTime);
      if (!selectedAppointment) {
        throw new Error('Selected time slot not found');
      }
      console.log("selectedAppointment", selectedAppointment);
      // Update the status of the selected time slot to "selected" and add the userId
      await axios.patch('http://localhost:5001/api/v1/radiologyCenter/appointment/status', {
        appointmentId: selectedAppointment._id,
        status: "selected",
        userId: userId
      });

      // Update the available times by filtering out the booked time
      setAvailableTimes(prevTimes => prevTimes.filter(time => time._id !== selectedAppointment._id));

      onAppointmentAdded(selectedAppointment);
      onClose();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Radiology Center Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {centersLoading ? (
              <Spinner />
            ) : centersError ? (
              <Alert status="error">
                <AlertIcon />
                {centersError.message}
              </Alert>
            ) : (
              <FormControl>
                <FormLabel>Select Radiology Center</FormLabel>
                <Select placeholder="Select radiology center" onChange={(e) => setSelectedCenter(e.target.value)}>
                  {radiologyCenters.data.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}

            {loadingTimes ? (
              <Spinner mt={4} />
            ) : errorTimes ? (
              <Alert status="error" mt={4}>
                <AlertIcon />
                {errorTimes.message}
              </Alert>
            ) : (
              selectedCenter && (
                <FormControl mt={4}>
                  <FormLabel>Select Time</FormLabel>
                  <Select placeholder="Select time" onChange={(e) => setSelectedTime(e.target.value)}>
                    {availableTimes.map((appointment) => (
                      <option key={appointment._id} value={appointment.timeSlot}>
                        {appointment.timeSlot}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleSubmit} isDisabled={!selectedCenter || !selectedTime}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddRadiologyCenterAppointment;