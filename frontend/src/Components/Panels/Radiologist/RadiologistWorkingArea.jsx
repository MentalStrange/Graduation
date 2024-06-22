import { Flex, Heading, Icon, Stack, Text, SimpleGrid, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";
import { useRadiologistState } from "../../../Context/RadiologistContext/RadiologistContext";
import RadiologistPatientBoard from "./RadiologistPatientBoard";
import RadiologistReportWorkingArea from "./RadiologistReportWorkingArea";
import ScanCard from "./ScanCard";

function RadiologistWorkingArea() {
  const { scans, radiologist, reports,patients, loading, error } = useRadiologistState();

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

  const radiologistData = radiologist?.data?.data || {};

  return (
    <Flex mx={2} flexDirection={{ base: "column", lg: "row" }} gap={2} overflow={'auto'} h={'85vh'}>
      {/* Left Side - Appointments and Patients Board */}
      <Box flex="3">
        <Stack>
          <Heading m={0}>Welcome Dr. {radiologistData.name || 'N/A'}</Heading>
          <Flex align={"center"} justify={"space-between"}>
            <Flex align={"center"}>
              <Icon mr={1} as={HistoryIcon} />
              <Text m={0}>Scans</Text>
            </Flex>
            <Text color={"blue.500"}>
              <Link to="appointments" color="blue.500">
                View All <Icon as={ArrowForwardIcon} />
              </Link>
            </Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
            {scans?.data?.data?.length > 0 ? (
              scans?.data?.data?.slice(0, 4).map((item, index) => (
                <ScanCard key={index} data={item} />
              ))
            ) : (
              <Text>No Appointments Available</Text>
            )}
          </SimpleGrid>
          <RadiologistPatientBoard patients={patients} />
        </Stack>
      </Box>

      {/* Right Side - Reports */}
      <Box flex="1">
        <RadiologistReportWorkingArea reports={reports} />
      </Box>
    </Flex>
  );
}

export default RadiologistWorkingArea;
