/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
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
import { usePatientState } from '../../../../Context/PatientContext/PatientContext';
import { decodeToken } from '../../../../../Utils/JWT_Decode';

function AddAppointment({ isOpen, onClose, onAppointmentAdded }) {
  const { doctors, loading: doctorsLoading, error: doctorsError } = usePatientState();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [errorTimes, setErrorTimes] = useState(null);

  useEffect(() => {
    if (selectedDoctor) {
      fetchAvailableTimes(selectedDoctor);
    }
  }, [selectedDoctor]);

  const fetchAvailableTimes = async (doctorId) => {
    setLoadingTimes(true);
    setErrorTimes(null);
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/doctor/appointment/availableTimeSlots/${doctorId}`);
      setAvailableTimes(response.data.data);
    } catch (error) {
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
      const selectedAppointment = availableTimes.find(appointment => appointment.timeSlot === selectedTime);
      if (!selectedAppointment) {
        throw new Error('Selected time slot not found');
      }
      await axios.patch(`http://localhost:5001/api/v1/appointment/status`, {
        appointmentId: selectedAppointment._id,
        status: "selected",
        userId: userId
      });

      setAvailableTimes(prevTimes => prevTimes.filter(time => time._id !== selectedAppointment._id));

      onAppointmentAdded(selectedAppointment);
      onClose();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const doctorsData = Array.isArray(doctors?.data?.data) ? doctors.data.data : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Doctor Appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {doctorsLoading ? (
            <Spinner />
          ) : doctorsError ? (
            <Alert status="error">
              <AlertIcon />
              {doctorsError.message}
            </Alert>
          ) : (
            <FormControl>
              <FormLabel>Select Doctor</FormLabel>
              <Select placeholder="Select doctor" onChange={(e) => setSelectedDoctor(e.target.value)}>
                {doctorsData.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
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
            selectedDoctor && (
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
          <Button colorScheme="purple" mr={3} onClick={handleSubmit} isDisabled={!selectedDoctor || !selectedTime}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddAppointment;
