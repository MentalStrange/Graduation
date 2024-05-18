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
} from "@chakra-ui/react";
import image8 from "../Images/image8.png";
import "../styles/App.css";

function Login() {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Tabs variant="soft-rounded" colorScheme="purple" width="100%">
        <Flex justifyContent={"center"} alignItems={"center"} width="100%">
          <Stack align={"center"} flex={0.5}>
            <Heading className="display-6">Login & SignUp </Heading>
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
                <form>
                  <div className="d-flex flex-column align-items-center">
                    <Input
                      type="email"
                      className="form-control form-control-sm m-2 p-2"
                      placeholder="Email Address"
                    ></Input>
                    <Input
                      type="password"
                      className="form-control form-control-sm m-2 p-2"
                      placeholder="Password"
                    ></Input>
                    <Button
                      type="submit"
                      w={"100%"}
                      backgroundColor={"#9747FF"}
                      color={"white"}
                      _hover={{ backgroundColor: "#AC6BFF" }}
                      mt={4}
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
                <form>
                  <div className="d-flex flex-column align-items-center">
                    <Input
                      type="text"
                      className="form-control form-control-sm m-2 p-2"
                      placeholder="Full Name"
                    ></Input>
                    <Input
                      type="email"
                      className="form-control form-control-sm m-2 p-2"
                      placeholder="Email Address"
                    ></Input>
                    <Input
                      type="password"
                      className="form-control form-control-sm m-2 p-2"
                      placeholder="Password"
                    ></Input>
                    <Button
                      type="submit"
                      w={"100%"}
                      backgroundColor={"#9747FF"}
                      color={"white"}
                      _hover={{ backgroundColor: "#AC6BFF" }}
                      mt={4}
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

export default Login;
