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
import { DoctorsContext } from '../../../../Context/PatientContext/DoctorsContext';

function AddAppointment({ isOpen, onClose, onAppointmentAdded }) {
  const { doctors, loading: doctorsLoading, error: doctorsError } = useContext(DoctorsContext);
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
      const response = await axios.get(`http://localhost:5000/api/v1/doctor/${doctorId}/available-times`);
      setAvailableTimes(response.data);
    } catch (error) {
      setErrorTimes(error);
    } finally {
      setLoadingTimes(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/appointments', {
        doctorId: selectedDoctor,
        time: selectedTime,
      });
      onAppointmentAdded(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Appointment</ModalHeader>
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
                  {doctors.data.map((doctor) => (
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
                    {availableTimes.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
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
    </>
  );
}

export default AddAppointment;