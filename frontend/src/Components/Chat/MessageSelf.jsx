import { Flex, Stack, Text } from '@chakra-ui/react'
import DoneAllIcon from '@mui/icons-material/DoneAll';

function MessageSelf() {
  return (
    <Stack bg={"#FAF5FF"} width={"fit-content"} px={6} py={1} mb={2} borderRadius={4}>
      <Text m={0}>
        Hello I`m Mohamed;
      </Text>
      <Flex justify={"space-between"}>
      <Text m={0}>
        1.1.2001.1pm
      </Text>
      <DoneAllIcon sx={{color:"green"}}/>
      </Flex>
    </Stack>
    
  )
}

export default MessageSelf