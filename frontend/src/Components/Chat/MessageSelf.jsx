import PropTypes from 'prop-types';
import { Flex, Stack, Text } from '@chakra-ui/react';
import DoneAllIcon from '@mui/icons-material/DoneAll';

function MessageSelf({ content, timestamp }) {
  return (
    <Stack bg={"#FAF5FF"} width={"fit-content"} px={6} py={1} mb={2} borderRadius={4}>
      <Text m={0}>
        {content}
      </Text>
      <Flex justify={"space-between"}>
        <Text m={0}>
          {timestamp}
        </Text>
        <DoneAllIcon sx={{ color: "green" }} />
      </Flex>
    </Stack>
  );
}

MessageSelf.propTypes = {
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default MessageSelf;
