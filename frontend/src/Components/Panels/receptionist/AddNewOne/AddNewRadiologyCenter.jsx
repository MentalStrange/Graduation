import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Checkbox,
  Text,
  Link,
} from "@chakra-ui/react";
import image8 from "../../../../Images/image8.png";
// import "../styles/App.css";
import { useState } from "react";
import axios from "axios";
import logo from "./../../../../assets/Images/purpleLogo.png";
import { Link as RouterLink } from "react-router-dom";

function AddNewRadiologyCenter() {
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const changeSignupHandler = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/patient/signup",
        signupData
      );
      setLoading(false);
      console.log("Signup successful:", response.data);
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Flex
      >
        <Stack  flex={1} justify="center" align="center">
          <Image src={logo} alt="logo" width={"150px"} mt={"50px"} alignSelf={"center"} />
          <Heading className="display-6">Add New Doctor</Heading>
          <Image src={image8} alt="image" />
        </Stack>
        <Stack flex={1} p={8} spacing={4} justify={"center"} >
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
                isRequired
              />
              <Input
              className="form-control form-control-sm p-2"
                type="email"
                placeholder="Email Address"
                name="email"
                onChange={changeSignupHandler}
                value={signupData.email}
                isRequired
              />
              <Input
              className="form-control form-control-sm p-2"
                type="password"
                placeholder="Password"
                name="password"
                onChange={changeSignupHandler}
                value={signupData.password}
                isRequired
              />
              <Checkbox isRequired>
                I agree to the terms and conditions
              </Checkbox>
              <Button
                      type="submit"
                      w={"100%"}
                      backgroundColor={"#9747FF"}
                      color={"white"}
                      _hover={{ backgroundColor: "#AC6BFF" }}
                      mt={4}
                      isLoading={loading}
                    >
                      Sign Up
                    </Button>
              <Text textAlign="center">
            Already have an account?{" "}
            <Link as={RouterLink} to="/auth" color="purple.500">
              Sign In
            </Link>
          </Text>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default AddNewRadiologyCenter;