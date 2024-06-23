// src/components/Testimonials.jsx
import { Box, Heading, Text, Container, Avatar } from '@chakra-ui/react';
import avatar from './../../assets/Images/avatar.jpg';
import Slider from "react-slick";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const testimonials = [
    {
      id: 1,
      name: "Mathilde Langevin",
      position: "CEO at Apple",
      avatar: avatar,
      text: "Need a consultation regarding your treatment or diagnosis? I'm always ready to provide you with professional healthcare consulting that is offered at an affordable price. At MedoX, you can expect nothing less than the ultimate level of care.",
    },
    {
      id: 2,
      name: "John Doe",
      position: "Patient",
      avatar: avatar,
      text: "The service I received was outstanding. The AI-driven diagnosis was quick and accurate, allowing for timely treatment. Highly recommend!",
    },
    {
      id: 3,
      name: "Jane Smith",
      position: "Radiologist",
      avatar: avatar,
      text: "As a radiologist, the integration of AI into our workflow has significantly improved our efficiency and diagnostic accuracy. It's a game-changer!",
    },
  ];

  return (
    <Box p={8} bg="white" id="testimonial">
      <Container maxW="container.xl" textAlign="center">
        <Text color="purple.600" fontWeight="bold" fontSize="lg">Testimonial</Text>
        <Heading mb={4}>What My Patients Say</Heading>
        <Text mb={8}>
          This is a great site for everything around the home, and it also has a useful section. You can see the best products.
        </Text>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <Box key={testimonial.id} p={8}>
              <Avatar src={testimonial.avatar} name={testimonial.name} size="xl" mb={4} />
              <Text mb={4} fontStyle="italic">{testimonial.text}</Text>
              <Text fontWeight="bold">{testimonial.name}</Text>
              <Text color="gray.500">{testimonial.position}</Text>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Testimonials;
