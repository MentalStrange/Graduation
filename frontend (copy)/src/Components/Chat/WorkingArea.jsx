import PropTypes from 'prop-types';
import { Box, Stack } from "@chakra-ui/react";
import NavbarWorkingArea from "./NavbarWorkingArea";
import FooterWorkingArea from "./FooterWorkingArea";
import MessageOther from "./MessageOther";
import MessageSelf from "./MessageSelf";

function WorkingArea({ contact }) {
  // Placeholder for messages, you can replace this with actual messages
  const messages = [
    { id: 1, type: 'other', content: 'Hello', timestamp: '1 pm' },
    { id: 2, type: 'self', content: 'Hi there!', timestamp: '1:01 pm' },
  ];

  return (
    <Stack className="working-area-container" spacing={4}>
      <Box className="navbar-working-area">
        <NavbarWorkingArea contact={contact} />
      </Box>
      <Box
        className="message-working-area"
        flex={1}
        p={4}
        overflowY="auto"
        maxHeight="80vh"
      >
        <Stack spacing={3}>
          {messages.map(message => (
            <Box key={message.id} alignSelf={message.type === 'self' ? 'flex-end' : 'flex-start'}>
              {message.type === 'self' ? (
                <MessageSelf content={message.content} timestamp={message.timestamp} />
              ) : (
                <MessageOther content={message.content} timestamp={message.timestamp} />
              )}
            </Box>
          ))}
        </Stack>
      </Box>
      <Box className="footer-working-area">
        <FooterWorkingArea />
      </Box>
    </Stack>
  );
}

WorkingArea.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default WorkingArea;
