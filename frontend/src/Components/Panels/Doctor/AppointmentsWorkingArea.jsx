/* eslint-disable react/prop-types */
import { Flex, Icon, Stack, Text, Box } from "@chakra-ui/react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function AppointmentsWorkingArea({ data }) {
  return (
    <Box p={4} bg={data.bgColor} borderRadius="md" boxShadow="md">
      <Stack>
        <Text fontWeight="bold" m={0} textAlign={"center"}>{data.name}</Text>
        <hr style={{"padding":2,"margin":2}}/>
        <Flex align={"center"}>
          <Icon mr={1} as={CalendarMonthIcon} />
          <Text m={0}>{data.title}</Text>
        </Flex>
        <Flex align={"center"}>
          <Icon mr={1} as={AccessAlarmIcon} />
          <Text m={0}>{data.time}</Text>
        </Flex>
        <Flex align={"center"}>
          <Icon mr={1} as={LocationOnIcon} />
          <Text m={0}><a href={data.address} target="_blank" rel="noopener noreferrer">Location</a></Text>
        </Flex>
      </Stack>
    </Box>
  );
}

export default AppointmentsWorkingArea;
