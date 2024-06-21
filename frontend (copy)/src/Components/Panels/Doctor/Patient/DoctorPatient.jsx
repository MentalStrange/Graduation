import { useState, useContext } from 'react';
import { SimpleGrid, Spinner, Alert, AlertIcon, Box, Heading, useDisclosure } from '@chakra-ui/react';
import PatientCard from './DoctorPatientCard';
import DoctorPatientDetails from './DoctorPatientDetails';
import { DoctorPatientsContext } from '../../../../Context/DoctorContext/DoctorPatientsContext';

function DoctorPatient() {
  const { patients, loading, error } = useContext(DoctorPatientsContext);
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

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4}>My Patients</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {patients.data.map((patient) => (
          <Box key={patient.id} onClick={() => handlePatientClick(patient.id)} cursor={"pointer"}>
            <PatientCard
              name={patient.name}
              image={patient.image}
              age={patient.age}
              description={patient.description}
            />
          </Box>
        ))}
      </SimpleGrid>
      <DoctorPatientDetails isOpen={isOpen} onClose={onClose} patientId={selectedPatientId} />
    </Box>
  );
}

export default DoctorPatient;