import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
function AddNewDoctor() {
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
    <Flex justifyContent={"center"} height={"100vh"}>
        <Stack flex={1} p={8} spacing={4}  >
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

export default AddNewDoctor;