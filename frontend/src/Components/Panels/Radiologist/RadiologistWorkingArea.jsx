import { Flex, Heading, Icon, Link, Stack, Text, SimpleGrid, Box } from "@chakra-ui/react";
import HistoryIcon from "@mui/icons-material/History";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RadiologistPatientBoard from "./RadiologistPatientBoard";
import RadiologistReportWorkingArea from "./RadiologistReportWorkingArea";

function RadiologistWorkingArea() {
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
            {/* {data.map((item, index) => (
              <RadiologistAppointmentsWorkingArea key={index} data={item} />
            ))} */}
          </SimpleGrid>
          <RadiologistPatientBoard />
        </Stack>
      </Box>

      {/* Right Side - Reports */}
      <Box flex="1">
        <RadiologistReportWorkingArea />
      </Box>
    </Flex>
  );
}

export default RadiologistWorkingArea;
