import { useState, useContext } from 'react';
import { SimpleGrid, Spinner, Alert, AlertIcon, Box, Heading, useDisclosure } from '@chakra-ui/react';
import { DoctorsContext } from '../../../../Context/PatientContext/DoctorsContext';
import PatientDoctorDetails from './PatientDoctorDetails';
import DoctorCard from '../DoctorCard';

function PatientDoctors() {
  const { doctors, loading, error } = useContext(DoctorsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleDoctorClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    onOpen();
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
      <Heading as="h1" size="lg" mb={4}>Available Doctors</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {doctors.data.map((doctor) => (
          <Box key={doctor.id} onClick={() => handleDoctorClick(doctor.id)} cursor={"pointer"}>
            <DoctorCard
              name={doctor.name}
              image={doctor.image}
              rating={doctor.rating}
              specialization={doctor.specialization}
              
            />
          </Box>
        ))}
      </SimpleGrid>
      <PatientDoctorDetails isOpen={isOpen} onClose={onClose} doctorId={selectedDoctorId} />
    </Box>
  );
}

export default PatientDoctors;