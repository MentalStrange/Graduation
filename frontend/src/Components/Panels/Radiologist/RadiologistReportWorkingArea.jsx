/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Link, Stack, Text } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { formatDate } from "../../../../Utils/formatDate";

function RadiologistReportWorkingArea({ reports }) {
  const borderColor = [
    "red.200",
    "green.200",
    "blue.200",
    "yellow.200",
    "purple.200",
    "orange.200",
  ]
  return (
    <Box mt={8} maxHeight="calc(100vh - 200px)" overflowY="auto">
      <Flex align={"center"} justify={"space-between"} mb={4}>
        <Flex align={"center"}>
          <Icon mr={1} as={ContentPasteSearchIcon} />
          <Text m={0}>Reports</Text>
        </Flex>
        <Link href="#" color="blue.500">
          View All <Icon as={ArrowForwardIcon} />
        </Link>
      </Flex>
      <Stack spacing={4}>
        {reports?.data?.data?.map((report, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            borderColor={borderColor[index % borderColor.length]} // Use modulo to cycle through colors
            color="white"
          >
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
              <Text fontWeight="bold" color={'black'}>{report.patient}</Text>
              <Text fontSize="sm" color={report.status === "Not Submitted" ? "red.500" : "green.500"}>
                {report.status === "Not Submitted" ? "Not Reported" : "Reported"}
              </Text>
            </Flex>
            <Text color={'black'} m={2}>Due Date: {formatDate(report.date)}</Text>
            <Text color={'black'} m={2}>Examination: {report.examination}</Text>
            <Text color={'black'} m={2}>Description: {report.description}</Text>
            <Text color={'black'} m={2}>Note: {report.note}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default RadiologistReportWorkingArea;
