import { Avatar, Box, Flex, IconButton, Input } from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";

function RadiologistNavbar() {
  return (
    <>
      <Flex justify={"space-between"}>
        <Flex>
          <IconButton icon={<SearchIcon />} mr={2} colorScheme="purple" />
          <Input type="search" w={'fit-content'} />
        </Flex>
        <Box>
          <Flex align={"center"} flexDirection={"row-reverse"}>
            <Avatar mr={4} />
            <IconButton
              mr={4}
              icon={<ChatIcon />}
              bg={"transparent"}
              _hover={"transparent"}
            />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default RadiologistNavbar;
