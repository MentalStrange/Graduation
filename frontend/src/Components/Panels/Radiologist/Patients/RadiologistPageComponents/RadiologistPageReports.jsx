/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { Link } from "react-router-dom";
import { formatDate } from "../../../../../../Utils/formatDate";

function RadiologistPageReports({ reports }) {
  const colors = [
    "red.100",
    "orange.100",
    "yellow.100",
    "green.100",
    "blue.100",
    "purple.100",
  ]
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
            borderWidth="2px"
            borderRadius="md"
            borderColor={colors[index % colors.length]} // Use the colors array for borderColor
            color="white"
          >
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
            </Flex>
            <Text color={'black'} m={0}>Due Date: {formatDate(report.date)}</Text>
            <Text color={'black'} m={0}>Examination: {report.examination}</Text>
            <Text color={'black'} m={0}>Description: {report.description}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default RadiologistPageReports;