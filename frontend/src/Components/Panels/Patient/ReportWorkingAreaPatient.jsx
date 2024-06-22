import { Box, Flex, Icon, Stack, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { Link } from "react-router-dom";
import { usePatientState } from '../../../Context/PatientContext/PatientContext'; // Use the combined PatientContext
import { formatDate } from "../../../../Utils/formatDate";

function ReportWorkingAreaPatient() {
  const borderColor = [
    "orange.200",
    "green.200",
    "red.200",
    "blue.200",
    "purple.200",
    "pink.200",
    "yellow.200",
    "cyan.200",
  ]
  const { reports, loading, error } = usePatientState();

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

  // Ensure reports.data exists and is an array
  const reportsData = reports && Array.isArray(reports.data.data) ? reports.data.data : [];

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
        {reportsData.length > 0 ? (
          reportsData.map((report, index) => (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              borderColor={borderColor[index]}
              color="white"
            >
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontWeight="bold" color={'black'}>{report.radiologist}</Text>
              </Flex>
              <Text color={'black'}>Patient Name: {report.patient}</Text>
              <Text color={'black'}>Due Date: {formatDate(report.date)}</Text>
            </Box>
          ))
        ) : (
          <Text>No reports found</Text>
        )}
      </Stack>
    </Box>
  );
}

export default ReportWorkingAreaPatient;
