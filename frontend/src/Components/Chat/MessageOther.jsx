/* eslint-disable react/prop-types */
import { Avatar, Flex, Stack, Text, Image } from '@chakra-ui/react';
import { formatDate } from '../../../Utils/formatDate';

function MessageOther({ content, timestamp, type, onLoad, avatarImage }) {
  return (
    <Flex align={"flex-start"} mb={4}>
      <Avatar size="md" src={avatarImage} mr={2}/>
      <Stack spacing={1} bg={type === "image" ? "transparent" : "#38A169"} width={"auto"} px={4} py={3} borderRadius={"lg"} minWidth={'170px'} maxWidth={'300px'}>
        {type === "image" ? (
          <Image src={content} alt="Received image" borderRadius="md" maxWidth="200px" onLoad={onLoad} />
        ) : (
          <Text color={"white"} fontSize={"md"} m={0}>
            {content}
          </Text>
        )}
        <Flex justify={"space-between"} align="center">
          <Text color={"white"} fontSize={"xs"} m={0} opacity={0.7}>
            {formatDate(timestamp)}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default MessageOther;
