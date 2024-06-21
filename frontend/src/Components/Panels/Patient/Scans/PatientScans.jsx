import { useState } from 'react';
import { Box, SimpleGrid, Spinner, Alert, AlertIcon, Heading, Text, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { usePatientState } from '../../../../Context/PatientContext/PatientContext';
import { formatDate } from '../../../../../Utils/formatDate';
import axios from 'axios';

function PatientScans() {
  const { scans, loading, error } = usePatientState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScan, setSelectedScan] = useState(null);
  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState(null);

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

  const scansData = Array.isArray(scans.data.data) ? scans.data.data : [];

  const handleOpenModal = async (scan) => {
    setSelectedScan(scan);
    setIsModalOpen(true);
    setReportLoading(true);
    console.log(scan);
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/report/${scan.reportId}`);
      setReport(response.data);
    } catch (error) {
      setReportError(error);
    } finally {
      setReportLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScan(null);
    setReport(null);
    setReportError(null);
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4} textAlign="center">Your Scans</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4} alignItems="center" justifyContent="center">
        {scansData.map((scan) => (
          <Box key={scan.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md" textAlign="center">
            <Image src={scan.image} alt={scan.name} borderRadius="md" mb={4} mx="auto" />
            <Text fontWeight="bold" mb={2}>{scan.name}</Text>
            <Text mb={2}>Date: {formatDate(scan.date)}</Text>
            <Text mb={2}>Type: {scan.type}</Text>
            <Text mb={2}>
              Status: {scan.status === "notReported" ? <Text color="red" display={'inline'}>Not Reported Yet</Text> : "Reported"}
            </Text>
            {scan.status === "reported" && (
              <Button colorScheme="blue" onClick={() => handleOpenModal(scan)}>View Report</Button>
            )}
          </Box>
        ))}
      </SimpleGrid>

      {selectedScan && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Report for {selectedScan.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {reportLoading ? (
                <Spinner />
              ) : reportError ? (
                <Alert status="error">
                  <AlertIcon />
                  {reportError.message}
                </Alert>
              ) : (
                <Box>
                  <Text><strong>Report ID:</strong> {report.id}</Text>
                  <Text><strong>Scan Name:</strong> {selectedScan.name}</Text>
                  <Text><strong>Scan Date:</strong> {formatDate(selectedScan.date)}</Text>
                  <Text><strong>Report Content:</strong> {report.content}</Text>
                  {/* Add more fields as necessary */}
                </Box>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default PatientScans;
