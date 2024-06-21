/* eslint-disable react/prop-types */
import { Flex, Stack, Text, Image } from '@chakra-ui/react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { formatDate } from '../../../Utils/formatDate';

function MessageSelf({ content, timestamp, type, onLoad }) {
  return (
    <Flex justify="flex-end" mb={4}>
      <Stack spacing={1} bg={type === "image" ? "transparent" : "#FAF5FF"} width={"auto"} px={4} py={3} borderRadius={"lg"}>
        {type === "image" ? (
          <Image src={content} alt="Sent image" borderRadius="md" maxWidth="200px" onLoad={onLoad} />
        ) : (
          <Text fontSize={"md"} m={0}>
            {content}
          </Text>
        )}
        <Flex justify={"space-between"} align="center">
          <Text fontSize={"xs"} m={0} color={'#666'}>
            {formatDate(timestamp)}
          </Text>
          <DoneAllIcon sx={{ color: "green", ml: 1, fontSize: "16px" }} />
        </Flex>
      </Stack>
    </Flex>
  );
}

export default MessageSelf;
