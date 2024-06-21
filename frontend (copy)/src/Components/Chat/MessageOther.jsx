import PropTypes from 'prop-types';
import { Avatar, Flex, Stack, Text } from '@chakra-ui/react';
import DoneAllIcon from '@mui/icons-material/DoneAll';

function MessageOther({ content, timestamp }) {
  return (
    <Flex align={"center"}>
      <Avatar mr={2} />
      <Stack bg={"#38A169"} width={"fit-content"} px={6} py={1} mb={2} borderRadius={7}>
        <Text m={0} color={"white"}>
          {content}
        </Text>
        <Flex justify={"flex-end"}>
          <Text m={0} color={"white"}>
            {timestamp}
          </Text>
          <DoneAllIcon sx={{ color: "white", ml: 1 }} />
        </Flex>
      </Stack>
    </Flex>
  );
}

MessageOther.propTypes = {
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default MessageOther;
