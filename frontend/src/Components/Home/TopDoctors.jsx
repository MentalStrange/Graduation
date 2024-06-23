import { Box, Heading, Text, Grid, GridItem, Image, Container, Button, Link } from '@chakra-ui/react';
import doctor1 from './../../assets/Images/avatar.jpg'
import doctor2 from './../../assets/Images/avatar2.jpg'
import doctor3 from './../../assets/Images/avatar3.jpg'
const TopDoctors = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. John Doe",
      specialty: "Neurologist",
      image: doctor1,
      description: "Expert in stroke management and neurological disorders.",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialty: "Radiologist",
      image: doctor2,
      description: "Specialist in diagnostic imaging and stroke detection.",
    },
    {
      id: 3,
      name: "Dr. Emily White",
      specialty: "Neurosurgeon",
      image: doctor3,
      description: "Experienced in surgical interventions for stroke patients.",
    },
  ];

  return (
    <Box p={8} bg="purple.50" id="topDoctors">
      <Container maxW="container.xl" textAlign="center">
        <Text color="purple.600" fontWeight="bold" fontSize="lg">Top Doctors</Text>
        <Heading mb={4}>Meet Our Experts</Heading>
        <Text mb={8}>
          Our team of specialists is dedicated to providing the highest level of care for stroke patients.
        </Text>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={6}>
          {doctors.map((doctor) => (
            <GridItem key={doctor.id} bg="gray.50" p={6} borderRadius="md" boxShadow="md">
              <Image src={doctor.image} alt={doctor.name} borderRadius="md" mb={4} w={'350px'} h={'350px'} />
              <Heading size="md" mb={2}>{doctor.name}</Heading>
              <Text fontWeight="bold" color="gray.600" mb={2}>{doctor.specialty}</Text>
              <Text mb={4}>{doctor.description}</Text>
              <Link href={`/appointments?doctorId=${doctor.id}`}>
                <Button colorScheme="purple">Make an Appointment</Button>
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TopDoctors;
