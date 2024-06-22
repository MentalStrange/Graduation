import { Box, Flex, Icon, Stack, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { Link } from "react-router-dom";
import { useDoctorState } from "../../../Context/DoctorContext/DoctorContext"; // Use the combined DoctorContext
import { formatDate } from "../../../../Utils/formatDate";

function PrescriptionWorkingArea() {
  const { prescriptions, loading, error } = useDoctorState();
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

  // Ensure prescriptions.data exists and is an array
  const prescriptionsData = prescriptions?.data?.data || [];

  return (
    <Box mt={8} maxHeight="calc(100vh - 200px)" overflowY="auto">
      <Flex align={"center"} justify={"space-between"} mb={4}>
        <Flex align={"center"}>
          <Icon mr={1} as={ContentPasteSearchIcon} />
          <Text m={0}>Prescriptions</Text>
        </Flex>
        <Text color="blue.500" m={0}>
          <Link to={"prescriptions"}>
            View All <Icon as={ArrowForwardIcon} />
          </Link>
        </Text>
      </Flex>
      <Stack spacing={4}>
        {prescriptionsData.length > 0 ? (
          prescriptionsData.map((prescription, index) => (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              borderColor={
                prescription.status === "Completed"
                  ? "green.200"
                  : prescription.status === "In Progress"
                  ? "purple.200"
                  : "red.200"
              }
              color="white"
            >
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontWeight="bold" color={'black'}>{prescription.type}</Text>
                <Text
                  fontSize="sm"
                  color={
                    prescription.status === "Completed"
                      ? "green.500"
                      : prescription.status === "In Progress"
                      ? "purple.500"
                      : "red.500"
                  }
                >
                  {prescription.status}
                </Text>
              </Flex>
              <Text color={'black'}>Patient Name: {prescription.patient}</Text>
              <Text color={'black'}>Due Date: {formatDate(prescription.date)}</Text>
              <Text color={'black'}>Examination: {prescription.examination.slice(0, 100) + '...'}</Text>
            </Box>
          ))
        ) : (
          <Text>No prescriptions found</Text>
        )}
      </Stack>
    </Box>
  );
}

export default PrescriptionWorkingArea;
