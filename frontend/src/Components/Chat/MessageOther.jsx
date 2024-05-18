import {  Avatar, Flex, Stack, Text } from '@chakra-ui/react'
import DoneAllIcon from '@mui/icons-material/DoneAll';

function MessageOther() {
  return (
    <Flex align={"center"}>
      <Avatar mr={2}/>
    <Stack bg={"#38A169"} width={"fit-content"} px={6} py={1} mb={2} borderRadius={7}>
      <Text m={0} color={"white"}>
        Hello I`m Mohamed;
      </Text>
      <Flex justify={"flex-end"}>
      <Text m={0} color={"white"}>
        1 pm
      </Text>
      <DoneAllIcon sx={[{color:"white"},{ml:1}]}/>
      </Flex>
    </Stack>
    </Flex>
    
  )
}

export default MessageOther