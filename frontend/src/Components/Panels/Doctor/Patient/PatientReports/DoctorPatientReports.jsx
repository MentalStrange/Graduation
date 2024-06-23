/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, SimpleGrid, Button, VStack, Grid, Stack, useToast, Spinner } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from '../../../../../../Utils/formatDate';
import useFetch from '../../../../../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import PrescriptionModal from './PrescriptionModal';

const colors = [
  'red.100',
  'orange.100',
  'yellow.100',
  'green.100',
  'cyan.100',
  'purple.100',
  'teal.100',
  'blue.100',
  'pink.100'
];

const itemsPerPage = 6;

function DoctorPatientReports() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const toast = useToast();

  const { patientId } = useParams();
  const { data: reports, loading, error } = useFetch(`http://localhost:5001/api/v1/report/patient/${patientId}`);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="85vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const reportsData = Array.isArray(reports?.data) ? reports?.data : [];
  const offset = currentPage * itemsPerPage;
  const currentItems = reportsData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(reportsData.length / itemsPerPage);

  return (
    <Box p="4" height="85vh" overflowY="auto">
      <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap="4">
        <Box bg="white">
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="lg">Patient {reportsData[0]?.patient}</Heading>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="2">
            {currentItems.map((report, index) => (
              <Stack key={index} p="4" borderWidth="2px" borderRadius="lg" borderColor={colors[index % colors.length]}>
                <Flex justify="space-between" align="center" mb="2">
                  <Heading size="md" color="purple.800">{report.patient}</Heading>
                </Flex>
                <Text m={1} fontSize="sm">Doctor Name: {report.radiologist}</Text>
                <Text m={1} fontSize="sm">Due Date: {formatDate(report.date)}</Text>
                <Text m={1} fontSize="sm">Examination: {report.examination}</Text>
                <Text m={1} fontSize="sm">Description: {report.description}</Text>
                <Text m={1} fontSize="sm">Note: {report.note}</Text>
                <Button colorScheme='purple' size={"sm"} alignSelf={'center'} onClick={() => openModal(report)}>Write Prescription</Button>
              </Stack>
            ))}
          </SimpleGrid>
        </Box>
        <Box bg="white">
          <VStack spacing="4">
            <Text fontSize="lg" fontWeight="bold">{selectedDate.toDateString()}</Text>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              calendarClassName="custom-datepicker"
            />
          </VStack>
        </Box>
      </Grid>
      <Flex justify="center" align="center" mt={7}>
        <Button
          size="sm"
          mr={2}
          onClick={() => handlePageClick(currentPage - 1)}
          isDisabled={currentPage === 0}
          colorScheme="purple"
        >
          Previous
        </Button>
        {Array.from({ length: pageCount }, (_, index) => (
          <Button
            key={index}
            size="sm"
            mr={2}
            onClick={() => handlePageClick(index)}
            isActive={currentPage === index}
            colorScheme="gray"
          >
            {index + 1}
          </Button>
        ))}
        <Button
          size="sm"
          onClick={() => handlePageClick(currentPage + 1)}
          isDisabled={currentPage === pageCount - 1}
          colorScheme="purple"
        >
          Next
        </Button>
      </Flex>
      {selectedReport && (
        <PrescriptionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          patientId={patientId}
          reportId={selectedReport.id}
        />
      )}
    </Box>
  );
}

export default DoctorPatientReports;
