import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import image8 from "./../assets/Images/image8.png";
import "../styles/App.css";
import { useState } from "react";
import axios from "axios";
import logo from "./../assets/Images/purpleLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Auth() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", nationalId: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Change handlers
  const changeLoginHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const changeSignupHandler = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Handler functions for login
  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5001/api/v1/auth/login",
        loginData,
        config
      );
      setLoading(false);
      localStorage.setItem('userToken', response.data.token);
      const decodedToken = jwtDecode(response.data.token);
      const userRole = decodedToken.role;
  
      toast({
        title: "Login successful.",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      // Redirect based on role
      switch (userRole) {
        case "doctor":
          navigate("/panel/doctor");
          break;
        case "patient":
          navigate("/panel/patient");
          break;
        case "receptionist":
          navigate("/panel/receptionist");
          break;
        case "radiologist":
          navigate("/panel/radiologist");
          break;
        case "radiologyCenter":
          navigate("/panel/radiologyCenter");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Login error.",
        description: error.response && error.response.data ? error.response.data.message : error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5001/api/v1/auth/patient/signup",
        signupData
      );
      setLoading(false);
      navigate("/auth");
      toast({
        title: "Signup successful.",
        description: "You have successfully signed up.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Signup error.",
        description: error.response && error.response.data ? error.response.data.message : error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Tabs variant="soft-rounded" colorScheme="purple" width="100%">
        <Flex justifyContent={"center"} alignItems={"center"} width="100%">
          <Stack align={"center"} flex={0.5}>
            <Link to="/">
              <Image src={logo} alt="logo" width={"150px"} mt={"50px"}/>
            </Link>
            <Heading className="display-6">Login & Sign Up</Heading>
            <TabList alignSelf={"center"} justifyContent={"center"}>
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Image src={image8} alt="image" />
              </TabPanel>
              <TabPanel>
                <Image src={image8} alt="image" />
              </TabPanel>
            </TabPanels>
          </Stack>
          <Stack flex={0.5} mr={10} width={"100%"} justify={"center"}>
            <TabPanels>
              <TabPanel>
                <Heading as={"h3"} textAlign={"center"} fontWeight={"bold"}>
                  Log In
                </Heading>
                <form onSubmit={loginHandler}>
                  <div className="d-flex flex-column align-items-center">
                    <Input
                      type="email"
                      className="form-control form-control-sm m-2 p-2"
                      placeholder="Email Address"
                      onChange={changeLoginHandler}
                      name="email"
                      value={loginData.email}
                    ></Input>
                    <Input
                      type="password"
                      className="form-control form-control-sm m-2 p-2"
                      placeholder="Password"
                      onChange={changeLoginHandler}
                      name="password"
                      value={loginData.password}
                    ></Input>
                    <Button
                      type="submit"
                      w={"100%"}
                      backgroundColor={"#9747FF"}
                      color={"white"}
                      _hover={{ backgroundColor: "#AC6BFF" }}
                      mt={4}
                      isLoading={loading}
                    >
                      Log in
                    </Button>
                  </div>
                </form>
              </TabPanel>
              <TabPanel>
                <Heading as={"h3"} textAlign={"center"} fontWeight={"bold"}>
                  Sign Up
                </Heading>
                <form onSubmit={signupHandler}>
                  <div className="d-flex flex-column align-items-center">
                    <Input
                      type="text"
                      className="form-control form-control-sm m-2 p-2"
                      placeholder="Full Name"
                      name="name"
                      onChange={changeSignupHandler}
                      value={signupData.name}
                    ></Input>
                    <Input
                      type="email"
                      className="form-control form-control-sm m-2 p-2"
                      placeholder="Email Address"
                      name="email"
                      onChange={changeSignupHandler}
                      value={signupData.email}
                      ></Input>
                      <Input
                        type="password"
                        className="form-control form-control-sm m-2 p-2"
                        placeholder="Password"
                        name="password"
                        onChange={changeSignupHandler}
                        value={signupData.password}
                      ></Input>
                      <Input
                        type="text"
                        className="form-control form-control-sm m-2 p-2"
                        placeholder="National ID"
                        name="nationalId"
                        onChange={changeSignupHandler}
                        value={signupData.nationalId}
                      ></Input>
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
                    </div>
                  </form>
                </TabPanel>
              </TabPanels>
            </Stack>
          </Flex>
        </Tabs>
      </Flex>
    );
  }
  
  export default Auth;