import { Flex, Heading, Icon, Link, Stack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import AppointmentsWorkingArea from "./AppointmentsWorkingArea";
import DoctorPanelPatientBoard from "./DoctorPanelPatientBoard";
import ReportWorkingArea from "./ReportWorkingArea";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const data = [
  {
    name: "Dr. John Doe",
    title: "Cardiologist",
    time: "10-20 pm",
    address: "https://bit.ly/sage-adebayo",
    bgColor: "purple.100"
  },
  {
    name: "Dr. Jane Smith",
    title: "Surgeon",
    time: "10-20 pm",
    address: "https://bit.ly/sage-adebayo",
    bgColor: "orange.100"
  },
  {
    name: "Dr. Alice Brown",
    title: "Radiologist",
    time: "10-20 pm",
    address: "https://bit.ly/sage-adebayo",
    bgColor: "green.100"
  },
  {
    name: "Dr. Bob Johnson",
    title: "Radiologist",
    time: "10-20 pm",
    address: "https://bit.ly/sage-adebayo",
    bgColor: "blue.100"
  },
];

function DoctorPanelWorkingArea() {
  return (
    <Flex mx={4} flexDirection={{ base: "column", lg: "row" }} gap={4}>
      {/* Left Side - Appointments and Patients Board */}
      <Box flex="3">
        <Stack>
          <Heading m={0}>Welcome Dr. {"Ahmed"}</Heading>
          <Flex align={"center"} justify={"space-between"}>
            <Flex align={"center"}>
              <Icon mr={1} as={HistoryIcon} />
              <Text m={0}>Appointments</Text>
            </Flex>
            <Link href="#" color="blue.500">
          View All <Icon as={ArrowForwardIcon} />
        </Link>
          </Flex>
          {/* <hr /> */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
            {data.map((item, index) => (
              <AppointmentsWorkingArea key={index} data={item} />
            ))}
          </SimpleGrid>
          <DoctorPanelPatientBoard />
        </Stack>
      </Box>

      {/* Right Side - Reports */}
      <Box flex="1">
        <ReportWorkingArea />
      </Box>
    </Flex>
  );
}

export default DoctorPanelWorkingArea;
