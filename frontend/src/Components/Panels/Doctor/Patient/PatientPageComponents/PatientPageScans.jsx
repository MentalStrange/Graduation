/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Stack, Text, Image } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { Link } from "react-router-dom";
import { formatDate } from "../../../../../../Utils/formatDate";

function PatientPageScans({ scans }) {
  return (
    <Box mt={8} maxHeight="calc(100vh - 200px)" overflowY="auto">
      <Flex align={"center"} justify={"space-between"} mb={4}>
        <Flex align={"center"}>
          <Icon mr={1} as={ContentPasteSearchIcon} />
          <Text m={0}>Scans</Text>
        </Flex>
        <Text color="blue.500" m={0}>
          <Link to={"scans"}>
            View All <Icon as={ArrowForwardIcon} />
          </Link>
        </Text>
      </Flex>
      <Stack spacing={2} align={'center'} justifySelf={'center'}>
        {scans.length > 0 ? (
          scans.map((scan, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              bg="white"
              boxShadow="md"
              align={'center'}
            >
              <Image src={scan.image} borderRadius="md" mb={4} />
              <Text mb={2}>Patient Name: {scan.patient}</Text>
              <Text mb={2}>Due Date: {formatDate(scan.date)}</Text>
              <Text>Status: {scan.status =="notReported"?"Not Reported":"Reported"}</Text>
            </Box>
          ))
        ) : (
          <Text>No scans found</Text>
        )}
      </Stack>
    </Box>
  );
}

export default PatientPageScans;
