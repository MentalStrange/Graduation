import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNewRadiologist() {
  const [signupData, setSignupData] = useState({ 
    name: "", 
    email: "", 
    nationalId: "", 
    password: "", 
    address: "", 
    phone: "", 
    gender: "", 
    age: "", 
    specialization: "", 
    experience: "", 
    bio: "", 
    about: "", 
    qualification: "", 
    timeSlots: "", 
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const changeSignupHandler = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/auth/radiologist/signup",
        signupData
      );
      console.log("Signup successful:", response.data);
      setLoading(false);
      toast({
        title: "Radiologist added successfully.",
        description: "Radiologist successfully added to the database.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("panel/receptionist/radiologists");
    } catch (error) {
      setLoading(false);
      toast({
        title: "An error occurred.",
        description: error.response && error.response.data ? error.response.data.message : error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent={"center"} h={"100%"} overflow={"auto"}>
      <Stack flex={1} p={8} spacing={4}>
        <form onSubmit={signupHandler}>
          <Heading as="h2" size="lg" textAlign="center">
            Add New Doctor
          </Heading>
          <Stack spacing={4}>
            <Input
              className="form-control form-control-sm p-2"
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={changeSignupHandler}
              value={signupData.name}
              required
            />
            <Input
              className="form-control form-control-sm p-2"
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={changeSignupHandler}
              value={signupData.email}
              required
            />
            <Input
              className="form-control form-control-sm p-2"
              type="number"
              placeholder="National ID"
              name="nationalId"
              onChange={changeSignupHandler}
              value={signupData.nationalId}
              required
            />
            <Input
              className="form-control form-control-sm p-2"
              type="password"
              placeholder="Password"
              name="password"
              onChange={changeSignupHandler}
              value={signupData.password}
              required
            />
            <Input
              className="form-control form-control-sm p-2"
              type="text"
              placeholder="Address"
              name="address"
              onChange={changeSignupHandler}
              value={signupData.address}
            />
            <Input
              className="form-control form-control-sm p-2"
              type="text"
              placeholder="Phone Number"
              name="phone"
              onChange={changeSignupHandler}
              value={signupData.phone}
            />
            <Input
              className="form-control form-control-sm p-2"
              type="text"
              placeholder="Gender"
              name="gender"
              onChange={changeSignupHandler}
              value={signupData.gender}
            />
            <Input
              className="form-control form-control-sm p-2"
              type="number"
              placeholder="Age"
              name="age"
              onChange={changeSignupHandler}
              value={signupData.age}
            />
            <Input
              className="form-control form-control-sm p-2"
              type="text"
              placeholder="Specialization"
              name="specialization"
              onChange={changeSignupHandler}
              value={signupData.specialization}
            />
            <Input
              className="form-control form-control-sm p-2"
              type="text"
              placeholder="Experience"
              name="experience"
              onChange={changeSignupHandler}
              value={signupData.experience}
            />
            <Input
              className="form-control form-control-sm p-2"
              type="text"
              placeholder="About"
              name="about"
              onChange={changeSignupHandler}
              value={signupData.about}
            />
            <Input
              className="form-control form-control-sm p-2"
              type="text"
              placeholder="Qualification"
              name="qualification"
              onChange={changeSignupHandler}
              value={signupData.qualification}
            />
            <Input
              className="form-control form-control-sm p-2"
              type="text"
              placeholder="Image URL"
              name="image"
              onChange={changeSignupHandler}
              value={signupData.image}
            />
            <Button
              type="submit"
              w={"100%"}
              backgroundColor={"#9747FF"}
              color={"white"}
              _hover={{ backgroundColor: "#AC6BFF" }}
              mt={4}
              isLoading={loading}
            >
              Add
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}

export default AddNewRadiologist;
