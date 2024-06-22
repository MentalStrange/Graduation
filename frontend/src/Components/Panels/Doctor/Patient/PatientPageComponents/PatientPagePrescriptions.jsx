/* eslint-disable react/prop-types */
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Icon, Box, Text } from "@chakra-ui/react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link } from "react-router-dom";
import { formatDate } from "../../../../../../Utils/formatDate";

function PatientPagePrescriptions( {prescriptions}) {
  return (
    <Box mt={8}>
      <Flex align={"center"} justify={"space-between"} mb={2}>
      <Flex align={"center"}>
              <Icon mr={1} as={EditNoteIcon} />
              <Text m={0}>Prescriptions</Text>
            </Flex>
            <Text color={"purple.500"} m={0}>
        <Link to="prescriptions">View All <Icon as={ArrowForwardIcon} /></Link>
            </Text>
      </Flex>
      <hr />
      <TableContainer maxH="300px" overflowY="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
        <Table variant="striped" colorScheme="gray">
          <Thead position="sticky" top={0} bgColor="gray.100" zIndex={1}>
            <Tr>
              <Th>Patient Name</Th>
              <Th>Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {prescriptions.map((patient, index) => (
              <Tr key={index}>
                <Td>{patient.patient}</Td>
                <Td>{formatDate(patient.date)}</Td>
                <Td>{patient.examination}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PatientPagePrescriptions;
