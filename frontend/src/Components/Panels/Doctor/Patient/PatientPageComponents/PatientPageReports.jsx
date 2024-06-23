/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../../../../../Utils/formatDate";

function PatientPageReports({ reports }) {
  const { patientId } = useParams();
  return (
    <Box mt={8} maxHeight="calc(100vh - 200px)" overflowY="auto">
      <Flex align={"center"} justify={"space-between"} mb={4}>
        <Flex align={"center"}>
          <Icon mr={1} as={ContentPasteSearchIcon} />
          <Text m={0}>Reports</Text>
        </Flex>
        <Text color="blue.500" m={0}>
          <Link to={`/panel/doctor/patients/${patientId}/reports`}>
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
              <Text fontWeight="bold" color={'black'}>{report.patient}</Text>
            </Flex>
            <Text color={'black'} m={0}>Radiologist: {report.radiologist}</Text>
            <Text color={'black'}>Date: {formatDate(report.date)}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default PatientPageReports;