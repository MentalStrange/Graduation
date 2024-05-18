import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ChatMessageBody = (messageData) => {
  return (
    <>
    <Link to="#">
      <Flex _hover={{ bg: "gray.100" }} borderRadius="lg" pl={2} pt={2} >
        <Avatar src="https://bit.ly/sage-adebayo" />
        <Box ml="3">
          <Text fontWeight="bold" mb={0}>
            Mohamed Ramadan{messageData.messageData}
            <Badge ml="1" colorScheme="green">
              New
            </Badge>
          </Text>
          <Text fontSize="sm">UI Engineer</Text>
        </Box>
      </Flex>
    </Link>
    </>
  );
};

export default ChatMessageBody;
