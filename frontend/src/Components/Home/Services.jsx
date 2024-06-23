import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Container,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Global } from '@emotion/react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Develop a comprehensive medical appointment booking system",
      description: "Tailored to the needs of brain stroke patients in Egypt.",
      subPoints: [
        "Online booking system",
        "Appointment reminders",
        "Patient management",
      ],
    },
    {
      id: 2,
      title: "Integrate advanced deep learning algorithms",
      description: "Enable accurate detection and segmentation of brain strokes from medical scans.",
      subPoints: [
        "Deep learning model training",
        "Image segmentation",
        "Accuracy validation",
      ],
    },
    {
      id: 3,
      title: "Enhance collaboration and workflow management",
      description: "Among healthcare stakeholders, including patients, doctors, radiologists, and receptionists.",
      subPoints: [
        "Collaborative platform",
        "Workflow automation",
        "Stakeholder management",
      ],
    },
    {
      id: 4,
      title: "Optimize appointment scheduling and prioritize urgent cases",
      description: "Using AI-driven decision support systems.",
      subPoints: [
        "AI-based scheduling",
        "Priority handling",
        "Decision support",
      ],
    },
    {
      id: 5,
      title: "Improve the efficiency and effectiveness of diagnostic imaging services",
      description: "For brain stroke patients through automated solutions.",
      subPoints: [
        "Automated imaging",
        "Efficiency improvements",
        "Service effectiveness",
      ],
    },
    {
      id: 6,
      title: "Expedite diagnosis, facilitate treatment planning, and enhance patient outcomes",
      description: "Through timely and reliable stroke identification and segmentation.",
      subPoints: [
        "Rapid diagnosis",
        "Treatment planning",
        "Outcome enhancement",
      ],
    },
    {
      id: 7,
      title: "Address the shortage of radiologists in Egypt",
      description: "By leveraging technology to augment diagnostic processes and improve healthcare services for brain stroke patients.",
      subPoints: [
        "Technology integration",
        "Diagnostic augmentation",
        "Healthcare improvement",
      ],
    },
    {
      id: 8,
      title: "Provide a unified platform for patient management and care coordination",
      description: "Revolutionizing healthcare delivery and raising the standard of patient care in Egypt.",
      subPoints: [
        "Unified platform",
        "Care coordination",
        "Healthcare delivery improvement",
      ],
    },
  ];

  return (
    <>
      <Global
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
          .services-section {
            font-family: 'Inter', sans-serif;
          }
        `}
      />
      <Box p={8} className="services-section">
        <Container maxW="container.xl" id="services">
          <Text color="purple.600" fontWeight="bold" fontSize="lg">Services</Text>
          <Heading mb={4}>I Offer A Whole Range Of Medical Services</Heading>
          <Text mb={8}>
            This is a great site for everything around the home, and it also has a useful section. You can see the best products.
          </Text>
          <Accordion allowToggle>
            {services.map((service, index) => (
              <AccordionItem key={service.id}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="bold" fontSize="xl">
                      {String(index + 1).padStart(2, '0')}. {service.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text mb={4}>{service.description}</Text>
                  <List spacing={3}>
                    {service.subPoints.map((subPoint, subIndex) => (
                      <ListItem key={subIndex}>
                        <ListIcon as={CheckCircleIcon} color="purple.600" />
                        {subPoint}
                      </ListItem>
                    ))}
                  </List>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Box>
    </>
  );
};

export default Services;
