import { Flex, Heading, Icon, Link, Stack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReportWorkingArea from "../Doctor/ReportWorkingArea";
import AppointmentsWorkingArea from "./AppointmentsWorkingArea";
import DoctorCard from "./DoctorCard";

const doctors = [
  {
    name: 'Dr. Dredor Smith',
    title: 'Medicine specialist',
    img: 'https://bit.ly/sage-adebayo',
    rating: 4.8,
    patients: 4356,
    location: 'Arizona Medical Center, NYC',
  },
  {
    name: 'Dr. Christine Jones',
    title: 'Pediatrician',
    img: 'https://bit.ly/sage-adebayo',
    rating: 4.9,
    patients: 5213,
    location: 'Boston Medical Center, NYC',
  },
  {
    name: 'Dr. Christine Jones',
    title: 'Pediatrician',
    img: 'https://bit.ly/sage-adebayo',
    rating: 4.9,
    patients: 5213,
    location: 'Boston Medical Center, NYC',
  },
  {
    name: 'Dr. Christine Jones',
    title: 'Pediatrician',
    img: 'https://bit.ly/sage-adebayo',
    rating: 4.9,
    patients: 5213,
    location: 'Boston Medical Center, NYC',
  },
  // Add more doctor objects here...
];

function PatientPanelWorkingArea() {
  return (
    <Flex direction="column" height="100%" overflow="auto" p={4}>
      {/* Main Content */}
      <Flex flexDirection={{ base: "column", lg: "row" }} gap={4} height="100%">
        {/* Left Side - Appointments and Patients Board */}
        <Box flex="3">
          <Stack>
            <Heading m={0}>Welcome Dr. {"Ahmed"}</Heading>
            <Flex align={"center"} justify={"space-between"}>
              <Flex align={"center"}>
                <Icon mr={1} as={HistoryIcon} />
                <Text m={0}>Doctors</Text>
              </Flex>
              <Link href="#" color="blue.500">
                View All <Icon as={ArrowForwardIcon} />
              </Link>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.name} {...doctor} />
              ))}
            </SimpleGrid>
            <AppointmentsWorkingArea />
          </Stack>
        </Box>
        {/* Right Side - Reports */}
        <Box flex="1">
          <ReportWorkingArea />
        </Box>
      </Flex>
    </Flex>
  );
}

export default PatientPanelWorkingArea;
