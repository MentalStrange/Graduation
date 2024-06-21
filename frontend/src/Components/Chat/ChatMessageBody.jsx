/* eslint-disable react/prop-types */
import { Text, Flex, Box, Avatar } from "@chakra-ui/react";

function ChatMessageBody({ contact, onClick }) {
  return (
    <Flex 
      onClick={onClick} 
      cursor="pointer" 
      p={1} 
      borderWidth={1} 
      borderRadius="md" 
      alignItems="center" 
      _hover={{ bg: "gray.100" }}
      transition="background-color 0.3s"
      my={1}
      ml={2}
    >
      <Avatar src={contact.image} alt={contact.name} boxSize="55px" borderRadius="full" />
      <Box ml={3}>
        <Text fontWeight="bold" m={0}>{contact.name}</Text>
        <Text fontSize="sm" color="gray.600" m={0}>{contact.specialization}</Text>
        <Text fontSize="sm" color="gray.500" mt={1} noOfLines={1} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" m={0}>
          {contact.lastMessage ? contact.lastMessage.content : "No messages yet"}
        </Text>
      </Box>
    </Flex>
  );
}

export default ChatMessageBody;
