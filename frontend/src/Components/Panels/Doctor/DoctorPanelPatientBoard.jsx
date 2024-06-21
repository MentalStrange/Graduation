import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Icon, Box, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useDoctorState } from "../../../Context/DoctorContext/DoctorContext"; // Use the combined DoctorContext

function DoctorPanelPatientBoard() {
  const { patients, loading, error } = useDoctorState();
  console.log("patients", patients?.data?.data);

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

  const patientsData = patients?.data?.data || [];
  console.log();

  return (
    <Box mt={8}>
      <Flex align={"center"} justify={"space-between"} mb={2}>
        <Flex align={"center"}>
          <Icon mr={1} as={EditNoteIcon} />
          <Text m={0}>Patient Board</Text>
        </Flex>
        <Link to="patients" color="blue.500">View All <Icon as={ArrowForwardIcon} /></Link>
      </Flex>
      <hr />
      <TableContainer maxH="300px" overflowY="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
        <Table variant="striped" colorScheme="gray">
          <Thead position="sticky" top={0} bgColor="gray.100" zIndex={1}>
            <Tr>
              <Th>Patient Name</Th>
              <Th>Gender</Th>
              <Th>Phone</Th>
              <Th>Age</Th>
            </Tr>
          </Thead>
          <Tbody>
            {patientsData.length > 0 ? (
              patientsData.map((patient, index) => (
                <Tr key={index}>
                  <Td>{patient.name}</Td>
                  <Td>{patient.gender}</Td>
                  <Td>{patient.phone}</Td>
                  <Td>{patient.age}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="6" textAlign="center">No patients found</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DoctorPanelPatientBoard;
