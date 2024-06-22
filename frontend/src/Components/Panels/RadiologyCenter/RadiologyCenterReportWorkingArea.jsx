/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Link, Stack, Text, Alert, AlertIcon } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "../../../../Utils/formatDate";

function RadiologyCenterReportWorkingArea({reports}) {
  console.log({reports});
  const color=[
    "blue.200",
    "green.200",
    "red.200",
    "orange.200",
  ]

  if (!reports || reports?.data?.length === 0) {
    return (
      <>  
    <Flex align={"center"} mb={5}>
          <Icon mr={1} as={ContentPasteSearchIcon} />
      <Text m={0}>Reports</Text>
    </Flex>
      <Alert status="info">
        <AlertIcon />
        No reports available.
      </Alert>
      </>
    );
  }

  return (
    <Box mt={8} maxHeight="calc(100vh - 200px)" overflowY="auto">
      <Flex align={"center"} justify={"space-between"} mb={4}>
        <Flex align={"center"}>
          <Icon mr={1} as={ContentPasteSearchIcon} />
          <Text m={0}>Reports</Text>
        </Flex>
        <Link as={RouterLink} to="/reports" color="blue.500">
          View All <Icon as={ArrowForwardIcon} />
        </Link>
      </Flex>
      <Stack spacing={4}>
        {reports?.data?.map((report, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="1.5px"
            borderRadius="md"
            borderColor={color[index % color.length]}
            color="white"
          >
            <Flex justifyContent="space-between" alignItems="center" mb={2}>
              <Text fontWeight="bold" color={'black'} mb={1}>Radiologist: {report.radiologist}</Text>
            </Flex>
            <Text color={'black'} >Patient Name: {report.patient}</Text>
            <Text color={'black'}>Due Date: {formatDate(report.date)}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default RadiologyCenterReportWorkingArea;
