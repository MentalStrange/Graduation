/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Flex,
  Image,
  Heading,
  useToast,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { decodeToken } from "../../../../../Utils/JWT_Decode";

function MakeScan() {
  const [scan, setScan] = useState(null);
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportDetails, setReportDetails] = useState({
    description: "",
    examination: "",
    note: "",
    patientId: "",
    radiologistId: "",
  });
  const toast = useToast();
  const { patientId } = useParams();
  const location = useLocation();
  const scanId = location.state?.scanId;  // Retrieved scanId from state

  useEffect(() => {
    if (patientId) {
      setReportDetails(prevDetails => ({
        ...prevDetails,
        patientId,
      }));
    }
  }, [patientId]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const radiologistId = decodeToken(token)?.id; // Use optional chaining to avoid errors
      if (radiologistId) {
        setReportDetails(prevDetails => ({
          ...prevDetails,
          radiologistId,
        }));
      }
    }
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScan(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const handleSubmitReport = async () => {
    if (!reportDetails.description || !reportDetails.examination) {
      toast({
        title: "Missing Information",
        description: "Please provide all required report details.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/report",
        reportDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response2 = await axios.patch(`http://localhost:5001/api/v1/scan/${scanId}`,{
        reportId:response.data.data._id
      })
      console.log(response2);
      if (response.data.status === "success") {
        toast({
          title: "Report Submitted",
          description: "The report has been successfully submitted.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        closeModal(); // Close modal on success
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: `Failed to submit report: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(response.data.data.prediction);
      toast({
        title: "Success",
        description: "File uploaded successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.error("Error uploading file:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="85vh"
      overflow="auto"
    >
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Make a Scan
      </Heading>
      <Input
        type="file"
        onChange={handleFileChange}
        display="none"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button as="span" mt={2}>
          Browse
        </Button>
      </label>
      {scan && (
        <>
          <Image
            src={scan}
            alt="Selected Scan"
            boxSize="400px"
            objectFit="cover"
            mt={4}
          />
          <Button mt={2} onClick={handleUpload}>
            Upload Scan
          </Button>
          {prediction === 1 && (
            <Flex direction="column" align="center" mt={4} mb={20}>
              <Text color="red.500" fontSize="xl" fontWeight="bold">
                Warning: Potential Stroke Detected!
              </Text>
              <Button colorScheme="red" mt={2} onClick={openModal}>
                Report Issue
              </Button>
            </Flex>
          )}
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                placeholder="Enter description here..."
                value={reportDetails.description}
                onChange={(e) =>
                  setReportDetails({
                    ...reportDetails,
                    description: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="examination">Examination</FormLabel>
              <Textarea
                id="examination"
                placeholder="Enter examination details here..."
                value={reportDetails.examination}
                onChange={(e) =>
                  setReportDetails({
                    ...reportDetails,
                    examination: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="note">Note</FormLabel>
              <Textarea
                id="note"
                placeholder="Enter additional notes here..."
                value={reportDetails.note}
                onChange={(e) =>
                  setReportDetails({ ...reportDetails, note: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button colorScheme="purple" onClick={handleSubmitReport}>
              Submit Report
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default MakeScan;
