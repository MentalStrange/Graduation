import { useState } from 'react';
import { SimpleGrid, Spinner, Alert, AlertIcon, Box, Heading, useDisclosure, Text } from '@chakra-ui/react';
import PatientCard from './DoctorPatientCard';
import DoctorPatientDetails from './DoctorPatientDetails';
import { useDoctorState } from '../../../../Context/DoctorContext/DoctorContext'; // Use the combined DoctorContext

function DoctorPatient() {
  const { patients, loading, error } = useDoctorState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handlePatientClick = (patientId) => {
    setSelectedPatientId(patientId);
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

  // Access the nested data array
  const patientsData = patients?.data?.data || [];
  if (!Array.isArray(patientsData)) {
    return <Text>No Patients Available</Text>;
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4}>Patients</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {patientsData.length > 0 ? (
          patientsData.map((patient) => (
            <Box key={patient.id} onClick={() => handlePatientClick(patient.id)} cursor={"pointer"}>
              <PatientCard
                name={patient.name}
                image={patient.image}
                age={patient.age}
                description={patient.description}
              />
            </Box>
          ))
        ) : (
          <Text>No Patients Available</Text>
        )}
      </SimpleGrid>
      <DoctorPatientDetails isOpen={isOpen} onClose={onClose} patientId={selectedPatientId} />
    </Box>
  );
}

export default DoctorPatient;
