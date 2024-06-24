/* eslint-disable react/prop-types */
import { Text, Flex, Box, Avatar } from "@chakra-ui/react";

function ChatMessageBody({ contact, onClick }) {
  return (
    <Flex 
      onClick={onClick} 
      cursor="pointer" 
      p={1} 
      borderBottom={"1px solid rgba(0, 0, 0, 0.2)"} 
      alignItems="center" 
      _hover={{ bg: "gray.100" }}
      transition="background-color 0.3s"
      // my={1}
      ml={2}
    >
      <Avatar src={contact.image} alt={contact.name} boxSize="50px" borderRadius="full" />
      <Box ml={3}>
        <Flex justify={'space-between'} align={'center'}>
          <Text fontWeight="bold" m={0} fontSize={'sm'} mr={4}>{contact.name}</Text>
          <Text fontSize="12px" color="gray.600" m={0}>{contact.specialization}</Text>
        </Flex>
        <Text fontSize="12px" color="gray.500" mt={1} noOfLines={1} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" m={0}>
          {contact.lastMessage ? contact.lastMessage.content : "No messages yet"}
        </Text>
      </Box>
    </Flex>
  );
}

export default ChatMessageBody;
