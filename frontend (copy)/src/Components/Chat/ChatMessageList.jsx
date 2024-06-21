import PropTypes from 'prop-types';
import { Box, Stack } from "@chakra-ui/react";
import ChatMessageBody from "./ChatMessageBody";

function ChatMessageList({ contacts, onContactClick }) {
  return (
    <Box className="message-working-area" flex={1} p={1} overflowY="auto" maxHeight="70vh" mt={2}>
      <Stack spacing={3}>
        {contacts.map((contact, index) => (
          <ChatMessageBody key={index} contact={contact} onClick={onContactClick} />
        ))}
      </Stack>
    </Box>
  );
}

ChatMessageList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
  onContactClick: PropTypes.func.isRequired,
};

export default ChatMessageList;
