/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { Link } from "react-router-dom";

function PatientPageReports({ reports }) {
  // Fake reports data
  return (
    <Box mt={8} maxHeight="calc(100vh - 200px)" overflowY="auto">
      <Flex align={"center"} justify={"space-between"} mb={4}>
        <Flex align={"center"}>
          <Icon mr={1} as={ContentPasteSearchIcon} />
          <Text m={0}>Reports</Text>
        </Flex>
        <Text color="blue.500" m={0}>
          <Link to={"reports"}>
            View All <Icon as={ArrowForwardIcon} />
          </Link>
        </Text>
      </Flex>
      <Stack spacing={4}>
        {reports.map((report, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            borderColor={report.borderColor}
            color="white"
          >
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
              <Text fontWeight="bold" color={'black'}>{report.type}</Text>
              <Text fontSize="sm" color={report.statusColor}>
                {report.status}
              </Text>
            </Flex>
            <Text color={'black'}>Patient Name: {report.patientName}</Text>
            <Text color={'black'}>Due Date: {report.dueDate}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default PatientPageReports;