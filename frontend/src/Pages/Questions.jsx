import { useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  HStack,
  IconButton,
  Spinner,
  Text,
  useToast,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import MRIBackground from "./../assets/Images/MRIBackground.jpg";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../Components/Home/Navbar";

function Questions() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(17).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const toast = useToast();
  const formRef = useRef(null);

  const questions = [
    "What is your gender? (Enter 1 for male, 0 for female)",
    "What is your age?",
    "Do you have hypertension? (Enter 1 for yes, 0 for no)",
    "Do you have heart disease? (Enter 1 for yes, 0 for no)",
    "Have you ever been married? (Enter 1 for yes, 0 for no)",
    "What is your residence type? (Enter 1 for urban, 0 for rural)",
    "What is your average Glucose Level?",
    "What is your BMI?",
    "Do you work at Government job? (Enter 1 for yes, 0 for no)",
    "Have you never worked before? (Enter 1 for yes, 0 for no)",
    "Are you working at a Private job? (Enter 1 for yes, 0 for no)",
    "Are you Self-employed? (Enter 1 for yes, 0 for no)",
    "Do you have children? (Enter 1 for yes, 0 for no)",
    "What is your smoking status? (Enter 1 if you prefer not to say, 0 for others)",
    "Are you a former smoker? (Enter 1 for yes, 0 for no)",
    "Have you never smoked before? (Enter 1 for yes, 0 for no)",
    "Are you smoking now? (Enter 1 for yes, 0 for no)",
  ];

  const handleNextQuestion = (event) => {
    event.preventDefault();
    const form = formRef.current;
    const input = form.elements["answer"];
    const value = input.value;

    // Validation
    if (questionIndex === 1 && (value < 1 || value > 100)) {
      toast({
        title: "Invalid Input",
        description: "Age must be between 1 and 100.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (questionIndex === 6 && (value < 50 || value > 250)) {
      toast({
        title: "Invalid Input",
        description: "Glucose Level must be between 50 and 200.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (questionIndex === 7 && (value < 10 || value > 40)) {
      toast({
        title: "Invalid Input",
        description: "BMI must be between 10 and 30.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (
      questionIndex !== 1 &&
      questionIndex !== 6 &&
      questionIndex !== 7 &&
      value !== "0" &&
      value !== "1"
    ) {
      toast({
        title: "Invalid Input",
        description: "Answer must be either 0 or 1.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newAnswers = [...answers];
    newAnswers[questionIndex] = parseFloat(value);
    setAnswers(newAnswers);
    input.value = "";

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setIsLoading(true);
      sendAnswers(newAnswers);
    }
  };

  const handleBackQuestion = () => {
    setQuestionIndex(questionIndex - 1);
  };

  const sendAnswers = async (finalAnswers) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay for processing

      const response = await axios.post("http://localhost:5000/model", {
        data: finalAnswers,
      });
      const result = response?.data?.data?.prediction;
      setIsLoading(false);
      setResult(result);

      toast({
        title: "Model Result",
        description: result === 1 
          ? "You Need To Book an Appointment. This is dangerous."
          : "You Do Not Need To Book an Appointment. This is safe.",
        status: result === 1 ? "error" : "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to process the data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Box
          height="85vh"
          backgroundImage={`url(${MRIBackground})`}
          backgroundSize="cover"
          backgroundPosition="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
          zIndex="0" // Ensure the Box is below the menu
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(0, 0, 0, 0.6)"
            zIndex="1"
          />
          <Box textAlign="center" zIndex="2" position="relative">
            <Spinner size="xl" color="white" />
            <Text fontSize="lg" color="white" mt={4}>
              Processing the Data By ML Model
            </Text>
          </Box>
        </Box>
      </>
    );
  }

  if (result !== null) {
    const resultMessage = result === 1 
      ? "You Need To Book an Appointment"
      : "You Do Not Need To Book an Appointment";

    const buttonText = result === 1 
      ? "Book your appointment"
      : "Explore More";

    const linkTo = result === 1 
      ? "/auth"
      : "/";

    const resultColor = result === 1 ? "red.500" : "green.500";

    return (
      <>
        <Navbar />
        <Box
          height="100vh"
          backgroundImage={`url(${MRIBackground})`}
          backgroundSize="cover"
          backgroundPosition="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex="1"
          />
          <Box
            textAlign="center"
            width="100%"
            maxWidth="600px"
            p={8}
            zIndex="2"
            position="relative"
            backgroundColor="rgba(255, 255, 255, 0.9)"
            borderRadius="lg"
            boxShadow="lg"
          >
            <Heading as="h2" size="xl" mb={6} color={resultColor}>{resultMessage}</Heading>
            <VStack spacing={4}>
              <Button
                as={RouterLink}
                to={linkTo}
                colorScheme="purple"
                size="lg"
                rightIcon={<ArrowForwardIcon />}
              >
                {buttonText}
              </Button>
            </VStack>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        height="100vh"
        backgroundImage={`url(${MRIBackground})`}
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
        zIndex="0" // Ensure the Box is below the menu
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundColor="rgba(0, 0, 0, 0.6)"
          zIndex="1"
        />
        <Box
          textAlign="center"
          width="100%"
          maxWidth="500px"
          zIndex="2"
          position="relative"
        >
          <Heading as="h2" size="lg" mb={6} color="white">
            Answer Questions
          </Heading>
          <form ref={formRef} onSubmit={handleNextQuestion}>
            <VStack spacing={4}>
              <FormControl id="answer">
                <FormLabel fontWeight="bold" fontSize="lg" color="white" mb={4}>
                  {questions[questionIndex]}
                </FormLabel>
                <Input
                  type="number"
                  name="answer"
                  placeholder="Enter a number"
                  required
                  bg="white"
                  defaultValue={answers[questionIndex]}
                  zIndex="3" // Ensure the input is above the background
                />
              </FormControl>
              <HStack justify="space-between" width="100%">
                {questionIndex > 0 && (
                  <IconButton
                    colorScheme="purple"
                    icon={<ArrowBackIcon />}
                    onClick={handleBackQuestion}
                    aria-label="Back"
                    isRound
                  />
                )}
                <IconButton
                  colorScheme="purple"
                  icon={<ArrowForwardIcon />}
                  type="submit"
                  aria-label="Next"
                  isRound
                />
              </HStack>
            </VStack>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default Questions;
