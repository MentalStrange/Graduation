import { Flex, Heading, Icon,  Stack, Text, SimpleGrid, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RadiologyCenterAppointmentsWorkingArea from "./RadiologyCenterAppointmentsWorkingArea";
import RadiologyCenterReportWorkingArea from "./RadiologyCenterReportWorkingArea";
import { useRadiologyCenterState } from "../../../Context/RadiologyCenterContext/RadiologyCenterContext";
import RadiologyCenterPatientBoard from "./RadiologyCenterPatientBoard";
import { Link } from "react-router-dom";

function RadiologyCenterWorkingArea() {
  const { radiologyCenter, appointments, patients, reports, loading, error } = useRadiologyCenterState();

  if (loading) return <Spinner />;
  if (error) return <Alert status="error"><AlertIcon />{error.message}</Alert>;

  return (
    <Flex mx={4} flexDirection={{ base: "column", lg: "row" }} gap={4}>
      {/* Left Side - Appointments and Patients Board */}
      <Box flex="3">
        <Stack>
          <Heading m={0}>Welcome {radiologyCenter?.data?.data?.name}</Heading>
          <Flex align={"center"} justify={"space-between"}>
            <Flex align={"center"}>
              <Icon mr={1} as={HistoryIcon} />
              <Text m={0}>Appointments</Text>
            </Flex>
            <Text m={0} color={"blue.500"}>
              <Link to={'appointment'}>
                View All <Icon as={ArrowForwardIcon} />
            </Link>
            </Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
            {appointments?.data?.data?.slice(0, 4).map((appointment, index) => (
              <RadiologyCenterAppointmentsWorkingArea key={index} data={appointment} />
            ))}
          </SimpleGrid>
          <RadiologyCenterPatientBoard patients={patients.data} />
        </Stack>
      </Box>

      {/* Right Side - Reports */}
      <Box flex="1">
        <RadiologyCenterReportWorkingArea reports={reports.data} />
      </Box>
    </Flex>
  );
}

export default RadiologyCenterWorkingArea;
