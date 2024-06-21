/* eslint-disable react/prop-types */
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer,  Link, Flex, Icon, Box, Text } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditNoteIcon from '@mui/icons-material/EditNote';

function PatientPagePrescriptions( {prescriptions}) {
  return (
    <Box mt={8}>
      <Flex align={"center"} justify={"space-between"} mb={2}>
      <Flex align={"center"}>
              <Icon mr={1} as={EditNoteIcon} />
              <Text m={0}>Patient Board</Text>
            </Flex>
        <Link href="#" color="blue.500">View All <Icon as={ArrowForwardIcon} /></Link>
      </Flex>
      <hr />
      <TableContainer maxH="300px" overflowY="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
        <Table variant="striped" colorScheme="gray">
          <Thead position="sticky" top={0} bgColor="gray.100" zIndex={1}>
            <Tr>
              <Th>Patient Name</Th>
              <Th>Type</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Location</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {prescriptions.map((patient, index) => (
              <Tr key={index}>
                <Td>{patient.name}</Td>
                <Td>{patient.type}</Td>
                <Td>{patient.date}</Td>
                <Td>{patient.time}</Td>
                <Td>{patient.location}</Td>
                <Td>{patient.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PatientPagePrescriptions;
