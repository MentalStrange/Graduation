import { Box, Stack } from "@chakra-ui/react";
import ChatMessageBody from "./ChatMessageBody";

function ChatMessageList() {
  return (
      <Box className="message-working-area" flex={1} p={1} overflowY="auto" maxHeight="70vh" mt={2}>
        <Stack spacing={3}>
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
          <ChatMessageBody />
        </Stack>
      </Box>
  );
}

export default ChatMessageList;
