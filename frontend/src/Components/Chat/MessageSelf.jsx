/* eslint-disable react/prop-types */
import { Flex, Stack, Text, Image } from '@chakra-ui/react';
import { formatDate } from '../../../Utils/formatDate';

function MessageSelf({ content, timestamp, type, onLoad }) {
  return (
    <Stack align={"flex-start"}>
      <Stack bg={type === "image" ? "transparent" : "#2E3B5B"} width={"auto"} px={4} py={3} borderRadius={"lg"} minWidth={'190px'} maxWidth={'300px'}>
        {type === "image" ? (
          <Image src={content} alt="Sent image" borderRadius="md" maxWidth="200px" onLoad={onLoad} />
        ) : (
          <Text color={"white"} fontSize={"md"} m={0}>
            {content}
          </Text>
        )}
      </Stack>
        <Flex ml={3}>
          <Text color={"black"} fontSize={"xs"} pb={2} m={0} opacity={0.7}>
            {formatDate(timestamp)}
          </Text>
        </Flex>
    </Stack>
  );
}

export default MessageSelf;
