import PropTypes from 'prop-types';
import { Box, Stack } from '@chakra-ui/react';
import ChatMessageBody from './ChatMessageBody';

const ChatMessageList = ({ contacts, onContactClick }) => {
  return (
    <Box overflowY="auto" maxHeight="calc(100vh - 150px)" pr={2}>
      <Stack spacing={2}>
        {contacts?.data?.map((contact) => (
          <ChatMessageBody key={contact.id} contact={contact} onClick={() => onContactClick(contact)} />
        ))}
      </Stack>
    </Box>
  );
};

ChatMessageList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onContactClick: PropTypes.func.isRequired,
};

export default ChatMessageList;
