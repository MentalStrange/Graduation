import { Box, Flex, Icon, Link, Stack, Text } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const reportsData = [
  {
    type: "MRI Report",
    patientName: "Mohamed Ramadan",
    dueDate: "February 10, 2024",
    status: "Not Submitted",
    statusColor: "red.500",
    borderColor: "red.200",
  },
  {
    type: "CT Report",
    patientName: "Ahmed Mohamed",
    dueDate: "March 5, 2024",
    status: "Completed",
    statusColor: "green.500",
    borderColor: "green.200",
  },
  {
    type: "X-ray",
    patientName: "Amany Mohamed",
    dueDate: "April 15, 2024",
    status: "In Progress",
    statusColor: "purple.500",
    borderColor: "purple.200",
  },
  {
    type: "MRI Report",
    patientName: "Enas Mohamed",
    dueDate: "April 8, 2024",
    status: "Not Submitted",
    statusColor: "red.500",
    borderColor: "red.200",
  },
  {
    type: "CT Report",
    patientName: "Yasmin Mohamed",
    dueDate: "May 20, 2024",
    status: "Not Submitted",
    statusColor: "red.500",
    borderColor: "red.200",
  },
];

function ReportWorkingArea() {
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
        {reportsData.map((report, index) => (
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

export default ReportWorkingArea;
